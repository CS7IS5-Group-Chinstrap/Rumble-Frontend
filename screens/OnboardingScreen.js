import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import {Image} from "expo-image"

const OnboardingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent:"center", alignItems:"center"}}>
        <Text style={styles.title}>Wingman</Text>
        <Text style={styles.subtitle}>Single Tonight? Not Tomorrow!</Text>
      </View>
      <Image source={require("../assets/logo.jpeg")} style={{width:300,height:300}}/>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#fff" }}>
          Let's Begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  subtitle: {
    fontSize: 18,
    color: "#20315f",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#20315f",
  },
  button: {
    backgroundColor: "#DE3163",
    padding: 20,
    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OnboardingScreen;
