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
    url = "http://52.49.73.0/add-swipe"
    axios
      .post(
        url,
        {
          "user_id": 22,
          "swiped_user_id": 1,
          "swipe_type": "left"
        }
      )
      .then(function (response) { console.log(response.data.match)})
      .catch(function (error) { console.log(error)})
    
    console.log('Swipe Left', user.id);
    console.log('Swipe Left', user.name);
  };

  const onSwipeRight = async user => {
    url = "http://52.49.73.0/add-swipe"
    axios
      .post(
        url,
        {
          "user_id": 22,
          "swiped_user_id": 1,
          "swipe_type": "right"
        }
      )
      .then(function (response) { console.log(response.data.match)})
      .catch(function (error) { console.log(error)})
      

    console.log("Swipe Right: ", user.id);
    console.log("Swipe Right: ", user.name);
  };

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
