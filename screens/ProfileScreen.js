// For making an app like instagram where stories are horizontally scrolled and posts are vertically scrolled, render a FlatList for the posts with the prop: listHeaderComponent. listHeaderComponent is actually another FlatList which has only the stories.
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import users from "../assets/data/users";
import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "./../config";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import axios from "axios";
import Geocoder from "react-native-geocoding";

const ProfileScreen = () => {
  Geocoder.init("AIzaSyD8zGBxeJtEukuEdGfPB3ucmES3N7N0EP8");

  const { userID, userInfo } = useContext(AuthContext);
  const userData =
    userInfo === null
      ? {
          firstname: "Name",
          essay0: "Bio",
          age: "",
          sex: "",
          diet: "",
          drinks: "",
          location: "Location",
          orientation: "",
        }
      : userInfo;
  const [user, setUser] = useState(userData);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [diet, setDiet] = useState("");
  const [drinks, setDrinks] = useState("");
  const [currentLocation, setCurrentLocation] = useState();
  const [location, setLocation] = useState();
  const [orientation, setOrientation] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dob, setDob] = useState("");

  // Getting current location of user and reverse geocoding it
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("We need permission to access your location");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setCurrentLocation(currentLocation);
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
      });
      const city = reverseGeocodedAddress[0].city;
      const region = reverseGeocodedAddress[0].region;
      const loc = city + ", " + region;
      setLocation(loc);
    };
    getPermissions();
  }, []);
  // For toggling the date picker for date of birth
  const toggleDatePicker = () => {
    setOpen(!open);
  };
  // For setting the date for date of birth
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setDob(currentDate.toDateString());
      }
      setAge(getAge(currentDate));
    } else {
      toggleDatePicker();
    }
  };
  // For setting the date of birth on ios
  const confirmIOSDate = () => {
    setDob(date.toDateString());
    toggleDatePicker();
  };
  // Getting the age
  const getAge = (birthdate = new Date()) => {
    const today = new Date();
    const birth = new Date(birthdate);
    const realAge =
      today.getFullYear() -
      birth.getFullYear() -
      (today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() &&
          today.getDate() < birth.getDate()));
    return realAge;
  };
  // checking whether input values are correct
  const isValid = () => {
    let message = "";
    if (name === null) {
      message = "Please enter name";
    } else if (bio === null) {
      message = "Please enter Bio";
    } else if (gender === null) {
      message = "Please enter Gender";
    } else if (orientation === null) {
      message = "Please enter orientation";
    }
    return message;
    // return name && bio && gender && lookingFor;
  };
  const saveProfile = async () => {
    const m = isValid();
    if (m !== "") {
      console.log(m);
      return;
    }
    const ages = getAge(dob);
    // updated user details
    const updatedUserDetails = {
      name: name === "" ? userData.firstname : name,
      bio: bio === "" ? userData.essay0 : bio,
      age: ages === "" ? age : ages,
      location: location === "" ? userData.location : location,
      orientation: orientation === "" ? userData.orientation : orientation,
      gender: gender === "" ? userData.gender : gender,
      diet: diet === "" ? userData.diet : diet,
      drinks: drinks === "" ? userData.drinks : drinks,
    };
    console.log(updatedUserDetails);
    try {
      const response = await axios.put(
        `${BASE_URL}/update-user?userID=${userID}`,
        updatedUserDetails
      );
      console.log(`User ID: ${userID}`);
      if (response.status === 200) {
        console.log(`User ${userID} saved successfully`);
        Alert.alert("User saved successfully");
      } else {
        console.warn("Error saving user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{ flex: 1, alignItems: "center" }}
        >
          <Text style={{fontSize:22, fontWeight:'bold'}}>{userData.firstname}'s Details</Text>
        </View>
        {/* Name */}
        <Text>Name: </Text>
        <TextInput
          style={styles.input}
          placeholder={userData.firstname}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        {/* Bio */}
        <Text>Bio: </Text>
        <TextInput
          style={styles.input}
          placeholder={userData.essay0}
          multiline
          numberOfLines={3}
          value={bio}
          onChangeText={(text) => setBio(text)}
        />
        {/* Gender */}
        <Text>Gender: </Text>
        <Picker
          selectedValue={userData.sex}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Male" value="m" />
          <Picker.Item label="Female" value="f" />
          <Picker.Item label="Other" value="other" />
        </Picker>
        {/* Orientation */}
        <Text>Orientation: </Text>
        <Picker
          selectedValue={userData.orientation}
          onValueChange={(itemValue) => setOrientation(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Straight" value="straight" />
          <Picker.Item label="Bisexual" value="bisexual" />
          <Picker.Item label="Gay" value="gay" />
        </Picker>
        {/* Diet */}
        <Text>Diet:</Text>
        <Picker
          selectedValue={userData.diet}
          onValueChange={(itemValue) => setDiet(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Vegetarian" value="vegetarian" />
          <Picker.Item label="Mostly Vegetarian" value="mostly vegetarian" />
          <Picker.Item
            label="Strictly Vegetarian"
            value="strictly vegetarian"
          />
          <Picker.Item label="Mostly Kosher" value="mostly kosher" />
          <Picker.Item label="Strictly Kosher" value="strictly kosher" />
          <Picker.Item label="Halal" value="halal" />
          <Picker.Item label="Mostly Halal" value="mostly halal" />
          <Picker.Item label="Strictly Halal" value="strictly halal" />
          <Picker.Item label="Vegan" value="vegan" />
          <Picker.Item label="Mostly Vegan" value="mostly vegan" />
          <Picker.Item label="Strictly Vegan" value="strictly vegan" />
          <Picker.Item label="Other" value="other" />
          <Picker.Item label="Mostly Other" value="mostly other" />
          <Picker.Item label="Strictly Other" value="strictly other" />
          <Picker.Item label="Anything" value="anything" />
          <Picker.Item label="Mostly Anything" value="mostly anything" />
          <Picker.Item label="Strictly Anything" value="strictly anything" />
        </Picker>
        {/* Drinks */}
        <Text>Drinks:</Text>
        <Picker
          selectedValue={userData.drinks}
          onValueChange={(itemValue) => setDrinks(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Not At All" value="not at all" />
          <Picker.Item label="Rarely" value="rarely" />
          <Picker.Item label="Socially" value="socially" />
          <Picker.Item label="Often" value="often" />
          <Picker.Item label="Desperately" value="desperately" />
        </Picker>
        {/* Date of Birth */}
        <Text>Date of Birth: </Text>
        <View>
          {/* <Text>Date of Birth: </Text> */}
          {open && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}

          {open && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity style={[]} onPress={toggleDatePicker}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[]} onPress={confirmIOSDate}>
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}

          {!open && (
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                placeholder="Date of Birth"
                value={dob}
                onChangeText={setDob}
                editable={false}
                onPressIn={toggleDatePicker}
                style={styles.input}
              />
            </Pressable>
          )}
        </View>
        {/* Location */}
        <Text>Location: </Text>
        <TextInput
          style={styles.input}
          placeholder={userData.location}
          value={location}
          // onChangeText={(text) => setName(text)}
          editable={false}
        />
        {/* Save Button */}
        <Pressable onPress={saveProfile} style={styles.button}>
          <Text>Save</Text>
        </Pressable>
        {/* Logout Button */}
        <Pressable
          onPress={() => {
            logout();
          }}
          style={styles.button}
        >
          <Text>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    width: "100%",
    padding: 10,
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    padding: 10,
  },
  input: {
    margin: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "#f63a6e",
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 10,
  },
});
export default ProfileScreen;
