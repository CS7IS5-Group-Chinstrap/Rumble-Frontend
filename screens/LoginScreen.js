import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState,useContext } from "react";
// import { Input, Button } from "@rneui/themed";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import {Image} from "expo-image"
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthContext } from './../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const {login}=useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [signedIn, setSignedIn] = useState(false);
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/penguin.jpg")}
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
          Login
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
            onChangeText={text=>setEmail(text)}
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
            onChangeText={text=>setPassword(text)}
          />
        </View>
        <TouchableOpacity
          onPress={() => {login(email,password)}}
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
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Text>New to the app?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "#DE3163", fontWeight: "700" }}> Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
