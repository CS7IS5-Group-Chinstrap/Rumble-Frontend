import React from "react";
import { Text, ImageBackground, View, StyleSheet, Image } from "react-native";
import Animated from "react-native-reanimated";

const Card = (props) => {
  const { firstname, image, essay0, sex } = props.user;
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
      <ImageBackground
        source={{
          uri: image ? image : getPlaceholderImage(),
        }}
        resizeMode="cover"
        style={styles.image}
      >
        {image ? (
          <View style={styles.cardInner} collapsable={false}>
            <Text style={styles.name}>{firstname}</Text>
            <Text style={styles.bio}>{essay0}</Text>
          </View>
        ) : (
          <View style={styles.cardInner}>
            <Image source={getPlaceholderImage()} style={styles.placeholderImage} />
            <Text style={styles.name}>{firstname}</Text>
            <Text style={styles.bio}>{essay0}</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: "80%",
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
  image: {
    // ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  cardInner: {
    padding: 10,
    marginTop: 20,
  },
  name: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  maleName: {
    marginBottom: 10,
  },
  femaleName: {
    marginBottom: 5,
  },
  bio: {
    fontSize: 18,
    color: "white",
    lineHeight: 25,
  },
});

export default Card;
