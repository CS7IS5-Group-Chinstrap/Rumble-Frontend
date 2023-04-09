import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MatchesScreen from "./../screens/MatchesScreen";
import ChatScreen from "./../screens/ChatScreen";

const Stack = createNativeStackNavigator();

const MatchStack = () => {
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
    </Stack.Navigator>
  );
};

export default MatchStack;
