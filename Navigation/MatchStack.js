import { View, Text, Button } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MatchesScreen from "./../screens/MatchesScreen";
import ChatScreen from "./../screens/ChatScreen";
import UserMatchScreen from "./../screens/UserMatchScreen";

const Stack = createNativeStackNavigator();

const MatchStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MatchScreen"
        component={MatchesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.user.name,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="UserMatchScreen"
        component={UserMatchScreen}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  );
};

export default MatchStack;
