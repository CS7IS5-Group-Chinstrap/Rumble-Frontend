import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";

import Card from "../components/Card";
import AnimatedStack from "../components/AnimatedStack";
import userData from "../assets/data/users";
import { BASE_URL } from "./../config";
import { AuthContext } from "./../context/AuthContext";


const ROTATION = 60;
const SWIPE_VELOCITY = 400;

const HomeScreen = () => {
  const { userInfo, userID } = useContext(AuthContext);
  const [users, setUsers] = useState(userData);
  const [currentUser, setCurrentUser] = useState(null);
  const [me, setMe] = useState(null);
  console.log(`User ID: ${userID}`);
  const onSwipeLeft = async user => {
    setCurrentUser(user.id);
    url = `${BASE_URL}/add-swipe`
    await axios
      .post(
        url,
        {
          "user_id": userID,
          "swiped_user_id": user.id,
          "swipe_type": "left"
        }
      )
      .then(function (response) {
        console.log(response.data.match);
      })
      .catch(function (error) { console.log(error)})
    console.log(`user: ${currentUser}`);
    console.log('Swipe Left', user.id);
    console.log('Swipe Left', user.firstname);
  };
  const onSwipeRight = async user => {
    setCurrentUser(user.id);
    url = `${BASE_URL}/add-swipe`
    await axios
      .post(
        url,
        {
          "user_id": userID,
          "swiped_user_id": user.id,
          "swipe_type": "right"
        }
      )
      .then(function (response) {
        console.log(response.data.match);
      })
      .catch(function (error) { console.log(error)})
    console.log(`next user: ${currentUser}`);
    console.log("Swipe Right: ", user.id);
    console.log("Swipe Right: ", user.firstname);
  };

  useEffect(() => {
    const fetchSimilarUsers = async () => {
      try {
        console.log("Fetching Similar Users")
        const response = await axios.get(`${BASE_URL}/get-similar-users/${userID}`);
        setUsers(response.data);
        setCurrentUser(response.data[0].id);
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
