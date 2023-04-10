// For making an app like instagram where stories are horizontally scrolled and posts are vertically scrolled, render a FlatList for the posts with the prop: listHeaderComponent. listHeaderComponent is actually another FlatList which has only the stories.
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { BASE_URL } from "./../config";
import React, { useState, useEffect, useContext } from "react";
import users from "../assets/data/users";
// import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { AuthContext } from "./../context/AuthContext";
import ItemDivider from "./../components/ItemDivider";

const MatchesScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [selectedId, setSelectedId] = useState();
  const [userMatches, setUserMatches] = useState([]);
  const handleClick = async (user) => {
    setSelectedId(user.name);
    navigation.navigate("Chat", { user });
  };
  // console.log(selectedId);
  useEffect(() => {
    const getMatches = async () => {
      console.log("fetching matched users");
      // console.log(userInfo.id);
      url = `${BASE_URL}/matches/${userInfo.id}`;
      // console.log(url);
      await axios
        .get(url)
        .then((res) => setUserMatches(res.data))
        .catch((err) => console.log(err));
      console.log("done fetching");
    };
    getMatches();
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <Text style={{ fontSize: 32, fontWeight: "bold" }}>
        {userInfo.firstname}'s Matches
      </Text>
      <FlatList
        data={userMatches}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => handleClick(item)}
              style={styles.item}
            >
              <Text style={styles.title}>{item.firstname}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemDivider}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: "black",
  },
  root: {
    width: "100%",
    padding: 10,
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  container: {
    padding: 10,
  },
  users: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  user: {
    width: 100,
    height: 100,
    margin: 10,

    borderWidth: 3,
    borderRadius: 50,
    padding: 3,
    borderColor: "#f63a6e",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
});
export default MatchesScreen;
