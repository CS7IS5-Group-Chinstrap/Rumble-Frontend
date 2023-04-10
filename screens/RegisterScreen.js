import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
// import { Input, Button } from "@rneui/themed";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthContext } from './../context/AuthContext';
// import {Image} from "expo-image"
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputField from "./../components/InputField";
import { BASE_URL } from "./../config";
import axios from 'axios';
// import DateTimePicker from "@react-native-community/datetimepicker";

// import DatePicker from "react-native-date-picker";
const RegisterScreen = ({ navigation }) => {
  const {registerUser}= useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const signInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((re) => {
        console.log(re);
        setSignedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const SignOut = () => {
    signOut(auth)
      .then((re) => {
        setSignedIn(false);
      })
      .catch((err) => console.log(err));
  };
  

  // const registerUser = async (email, name, password) => {
  //   try {
  //     console.log("Starting Registration")
  //     const response = await axios.post(`${BASE_URL}/register`, {
  //       email: email,
  //       name: name,
  //       password: password,
  //     });
  //     console.log(response.data); // do something with the response data
  //     console.log("Completed Registration")
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  console.log(show)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/hello.png")}
            style={{
              height: 300,
              width: 300,
            }}
          
          />
        </View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Register
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Email"
            style={{ flex: 1, paddingVertical: 0 }}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <MaterialIcons
            name="person-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Full Name"
            style={{ flex: 1, paddingVertical: 0 }}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Password"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Confirm Password"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        {/* Date Of Birth */}
        {/* <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TouchableOpacity onPress={() => setShow(true)}>
            <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
              Date of Birth
            </Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={show}
          date={date}
          mode={"date"}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => setOpen(false)}
        /> */}
        <TouchableOpacity
          onPress={() => registerUser(email, name, password)}
          style={{
            backgroundColor: "#DE3163",
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 18,
              color: "#fff",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Text>Already Registered?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ color: "#DE3163", fontWeight: "700" }}> Login</Text>
        </TouchableOpacity>
      </View>
      {/* <Input
        placeholder="Enter email"
        label="Email"
        leftIcon={{ type: "material", name: "email" }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Enter password"
        label="Password"
        leftIcon={{ type: "material", name: "lock" }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="sign in" style={styles.button} onPress={signInUser} />
      <Button title="register" style={styles.button} /> */}
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
});
