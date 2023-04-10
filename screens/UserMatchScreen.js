import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";

const UserMatchScreen = ({ navigation, route }) => {
  console.log(route.params.name);
  const { essay0,firstname,lastname, bio, age, sex, diet, drinks, location, orientation } =
    route.params;
  // console.log(route.params.id);
  const imagePath =
    route.params.sex === "m"
      ? require("../assets/images/placeholder_male.jpg")
      : require("../assets/images/placeholder_female.jpg");
  // console.log(imagePath);

  const getPlaceholderImage = () => {
    if (sex === "m") {
      return"https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
    } else {
      return "https://images.pexels.com/photos/8141165/pexels-photo-8141165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-around",
      }}
    >
      <ScrollView
        contentContainerStyle={{ justifyContent: "space-around" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Image
            source={{
              uri: getPlaceholderImage(),
            }}
            style={{ height: 300, width: 250, borderRadius: 5 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            marginTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Name:</Text>
          <Text style={{ fontSize: 18  }}> {firstname} {lastname}</Text>
        </View>
        <View
          style={{
            // flexDirection: "row",
            marginLeft: 5,
            marginTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Bio:</Text>
          <Text style={{ fontSize: 18, marginLeft: 15 }}>{essay0}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            marginTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Age:</Text>
          <Text style={{ fontSize: 18, marginLeft: 15 }}>{age}</Text>
        </View>
        <View
          style={{
            // flex:1,
            flexDirection: "row",
            marginLeft: 5,
            marginTop: 10,
            paddingHorizontal: 10,
            // width:'100%',
            // alignItems: "space-evenly",
          }}
        >
          <Text style={{ fontSize: 18 }}>Gender:</Text>
          <Text style={{ fontSize: 18, marginLeft: 15 }}>{sex}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            marginTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Orientation:</Text>
          <Text style={{ fontSize: 18, marginLeft: 15 }}>{orientation}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            marginTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Drinks:</Text>
          <Text style={{ fontSize: 18, marginLeft: 15 }}>{drinks}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            marginTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Diet:</Text>
          <Text style={{ fontSize: 18, marginLeft: 15 }}>{diet}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            marginTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Location:</Text>
          <Text style={{ fontSize: 18, marginLeft: 15 }}>{location}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserMatchScreen;
