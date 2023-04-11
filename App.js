import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  LogBox,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Logo from "./assets/final_logo.png";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import TabNavigator from "./Navigation/TabNavigator";
import AuthStack from "./Navigation/AuthStack";
import AppStack from "./Navigation/AppStack";
import { AuthProvider } from "./context/AuthContext";
import AppNav from './Navigation/AppNav';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
};

export default App;
