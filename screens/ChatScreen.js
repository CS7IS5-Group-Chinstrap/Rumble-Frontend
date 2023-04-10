import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";
import { GiftedChat, Composer, Bubble, Send } from "react-native-gifted-chat";
// import Suggestions from "./../components/Suggestions";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  query,
} from "firebase/firestore";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AuthContext } from "./../context/AuthContext";

export default function ChatScreen({ navigation, route }) {
  console.log(route.params.user?.name);
  console.log(route.params.user?.id);
  const { userInfo } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [ib, setIb] = useState("");
  const docId =
    route.params.user?.id > userInfo.user_id
      ? route.params.user?.id + "-" + userInfo.user_id
      : userInfo.user_id + "-" + route.params.user?.id;
  const convStarter = [
    { id: 1, name: "Hello" },
    { id: 2, name: "how are you doing?" },
    { id: 3, name: "what's up?" },
    { id: 4, name: "Lmao" },
    { id: 5, name: "What you upto?" },
  ];
  const renderAccessory = () => (
    <ScrollView
      style={styles.container}
      horizontal={true}
      contentContainerStyle={{ alignItems: "center" }}
      showsHorizontalScrollIndicator={false}
    >
      {convStarter.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={styles.suggestion}
          onPress={() =>
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, {
                _id: route.params.user?.id + item.id,
                text: item.name,
                createdAt: new Date(),
                user: {
                  _id: route.params.user?.id,
                  // _id: 1,
                  name: route.params.user?.name,
                },
              })
            )
          }
        >
          <Text style={{ color: "white" }}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
  console.log(messages);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserMatchScreen", route.params.user)
          }
          style={{ backgroundColor: "#DE3163", borderRadius: 5 }}
        >
          <Text style={{ color: "white", padding: 5 }}>Profile</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: "#2e64e5" },
          left: { backgroundColor: "lightblue" },
        }}
        textStyle={{ right: { color: "white" } }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            size={32}
            color="#2e64e5"
            style={{ marginBottom: 5, marginRight: 5 }}
          />
        </View>
      </Send>
    );
  };

  const scrollBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: route.params.user?.id,
        // _id: 1,
      }}
      infiniteScroll
      renderAccessory={() => renderAccessory()}
      renderQuickReplySend={renderAccessory}
      renderComposer={(props) => <Composer {...props} placeholder="Aa" />}
      renderBubble={renderBubble}
      renderSend={renderSend}
      scrollToBottom
      scrollBottomComponent={scrollBottomComponent}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: "20%",
    // height:'fit-content',
    width: "100%",
    // backgroundColor: "red",
    flexDirection: "row",
    // justifyContent: "space-around",
    // alignItems: "center",
  },
  suggestion: {
    padding: 10,
    backgroundColor: "#DE3163",
    borderRadius: 15,
    height: 35,
    color: "white",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
