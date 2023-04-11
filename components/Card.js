import React from "react";
import { Text, ImageBackground, View, StyleSheet, Image, ScrollView } from "react-native";
import Animated from "react-native-reanimated";

const Card = (props) => {
  const { firstname, image, age, essay0, sex } = props.user;
  const AnimatedImageBackground =
    Animated.createAnimatedComponent(ImageBackground);

  const getPlaceholderImage = () => {
    if (sex === "m") {
      return"https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
    } else {
      return "https://images.pexels.com/photos/8141165/pexels-photo-8141165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{
            uri: image ? image : getPlaceholderImage(),
          }}
          resizeMode="cover"
          style={styles.image}
        >
        </ImageBackground>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.name}>{firstname}, {age}</Text>
        <ScrollView>
        <Text style={styles.bio}>{essay0}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: '75%',
    borderRadius: 10,
    backgroundColor: "#fefefe",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  imageContainer: {
    height: "70%",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bioContainer: {
    height: "30%",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bio: {
    fontSize: 15,
    lineHeight: 20,
  },
});

export default Card;
