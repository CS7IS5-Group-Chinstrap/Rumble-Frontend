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
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import users from "../assets/data/users";
import { AuthContext } from "./../context/AuthContext";
import axios from 'axios';
import { BASE_URL } from "./../config";

const ProfileScreen = () => {
  const { logout, userInfo } = useContext(AuthContext);
  const [user, setUser] = useState(userInfo);
  const [name, setName] = useState(userInfo?.name);
  const [bio, setBio] = useState(userInfo?.bio);
  const [gender, setGender] = useState(userInfo?.gender);
  const [lookingFor, setLookingFor] = useState(userInfo?.lookingFor);

  const isValid = () => {
    let message = "";
    if (name === null) {
      message = "Please enter name";
    } else if (bio === null) {
      message = "Please enter Bio";
    } else if (gender === null) {
      message = "Please enter Gender";
    } else if (lookingFor === null) {
      message = "Please enter lookingFor";
    }
    return message;
    // return name && bio && gender && lookingFor;
  };
  const saveProfile = async () => {
    const m = isValid();
    if (m != "") {
      console.warn(m);
      return;
    }
    const payload = {
      "name" : name,
      "bio" : bio,
      "sex" : gender,
      "orientation" :lookingFor,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/update-user?userID=${userInfo}`,
        payload
      );
      console.warn(`User ID: ${userInfo}`);
      if (response.status === 200) {
        console.warn(`User ${userInfo} saved successfully`);
        Alert.alert('User saved successfully');
      } else {
        console.warn('Error saving user data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Bio"
          multiline
          numberOfLines={3}
          value={bio}
          onChangeText={(text) => setBio(text)}
        />
        <Text>Gender: </Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Male" value="m" />
          <Picker.Item label="Female" value="f" />
          <Picker.Item label="Other" value="o" />
        </Picker>
        <Text>Looking For: </Text>
        <Picker
          selectedValue={lookingFor}
          onValueChange={(itemValue) => setLookingFor(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Straight" value="straight" />
          <Picker.Item label="Gay" value="gay" />
          <Picker.Item label="Bisexual" value="bisexual" />
        </Picker>
        <Pressable onPress={saveProfile} style={styles.button}>
          <Text>Save</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            logout();
          }}
          style={styles.button}
        >
          <Text>Sign Out</Text>
        </Pressable>
      </View>
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
