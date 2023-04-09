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
import React, { useState } from "react";
import users from "../assets/data/users";
// import Ionicons from "@expo/vector-icons/Ionicons";

const MatchesScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = useState();
  const handleClick=(user)=>{
    setSelectedId(user.name)
    navigation.navigate("Chat",{user})
  }
  // console.log(selectedId);
  return (
    <SafeAreaView style={styles.root}>
      {/* <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "#F63A6E" }}>
          New Matches
        </Text>
        <View style={styles.users}>
          {users.map((user) => (
            <View style={styles.user} key={user.id}>
              <Image source={{ uri: user.image }} style={styles.image} />
            </View>
          ))}
        </View>
      </View> */}
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => handleClick(item)}
              style={styles.item}
            >
              <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
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
    fontSize: 32,
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
