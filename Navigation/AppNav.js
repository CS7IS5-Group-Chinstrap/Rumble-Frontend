import { View, Text, ActivityIndicatior } from "react-native";
import React, { useContext } from "react";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./../context/AuthContext";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicatior size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {/* USE THE BELOW ONE FOR CORRECT IMPLEMENTATION: */}
      {/* {userToken !== null? <AppStack /> : <AuthStack />} */}
      {/* The below is for testing ONLY! */}
      {/* {userToken !== null? <AuthStack /> : <AppStack />} */}
      {/* <AuthStack /> */}
      <AppStack />
    </NavigationContainer>
  );
};

export default AppNav;
