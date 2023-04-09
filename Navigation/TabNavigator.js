import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import HomeScreen from "./../screens/HomeScreen";
import MatchesScreen from "./../screens/MatchesScreen";
import ProfileScreen from "./../screens/ProfileScreen";
import MatchStack from "./MatchStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";
      console.log(routeName)
    if (routeName === "Chat") {
      return false;
    }
    return true;
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { backgroundColor: "#AD40AF" },
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="tinder" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Match"
        component={MatchStack}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubbles" size={30} color={color} />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
