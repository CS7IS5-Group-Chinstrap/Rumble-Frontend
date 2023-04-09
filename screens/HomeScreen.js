import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";

import Card from "../components/Card";
import AnimatedStack from "../components/AnimatedStack";
import userData from "../assets/data/users";

const ROTATION = 60;
const SWIPE_VELOCITY = 400;

const HomeScreen = () => {
  const [users, setUsers] = useState(userData);
  const [currentUser, setCurrentUser] = useState(null);
  const [me, setMe] = useState(null);

  const onSwipeLeft = user => {
    console.log('Swipe Left', user.name);
  };
  const onSwipeRight = user => {
    console.log("Swipe Right: ", user.name);
  };

  useEffect(() => {
    const fetchSimilarUsers = async () => {
      try {
        console.log("Fetching Similar Users")
        const response = await axios.get("http://127.0.0.1:5000/get-similar-users/1");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchSimilarUsers();
  }, []);

  return (
    <View style={styles.pageContainer}>
      <AnimatedStack
        data={users}
        renderItem={({ item }) => <Card user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    backgroundColor: "#ededed",
  },
});
export default HomeScreen;
