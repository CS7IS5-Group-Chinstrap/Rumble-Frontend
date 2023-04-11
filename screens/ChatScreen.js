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
  LogBox,
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
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "./../config";
import uuid from "react-native-uuid";
const IGNORED_LOGS = [
  'Non-serializable values were found in the navigation state',
];

LogBox.ignoreLogs(IGNORED_LOGS);
export default function ChatScreen({ navigation, route }) {
  console.log(route.params.user?.name);
  console.log(route.params.user?.id);
  const { userInfo } = useContext(AuthContext);
  const dummyMessage = [
    {
      _id: "System",
      text: "Start Chatting right away!!",
      user: {
        _id: "System",
      },
      createdAt: new Date(),
    },
  ];
  const [messages, setMessages] = useState(dummyMessage);
  const [suggestion, setSuggestion] = useState("");

  const docId =
    route.params.user?.id > userInfo.id
      ? route.params.user?.id + "-" + userInfo.id
      : userInfo.id +
        "-" +
        userInfo.firstname +
        "-" +
        route.params.user?.id +
        "-" +
        route.params.user?.firstname;
  console.log(docId);
  const chatsRef = doc(db, "chats", docId);
  const [icebreaker, setIcebreaker] = useState([]);
  // Fetching icebreakers
  useEffect(() => {
    const getIceBreaker = async () => {
      console.log(`Route ID: ${route.params.user?.id}`);
      try {
        console.log("Fetching Similar Users");
        const response = await axios.get(
          `${BASE_URL}/get-ice-breakers/${route.params.user?.id}`
        );
        const outputArray = response.data
          ? response.data.map((text, index) => ({
              id: index + 1,
              name: text,
            }))
          : [];
        console.log(`response: ${JSON.stringify(outputArray)}`);
        setIcebreaker(outputArray);
        console.log(`Route Name: ${route.params.user?.firstname}`);
      } catch {
        (function (error) {
          console.log(error);
        });
      }
    };
    getIceBreaker();
  }, []);
  // fetching messages from firebase
  useEffect(() => {
    onSnapshot(chatsRef, async (snapshot) => {
      await setMessages(
        snapshot.data().messages.map((message) => ({
          ...message,
          createdAt: message.createdAt.toDate(),
        }))
      );
    });
  }, [docId]);

  useEffect(() => {
    const suggestionMessage = {
      _id: uuid.v4(),
      text: suggestion,
      createdAt: new Date(),
      user: {
        _id: userInfo.id,
        name: route.params.user?.name,
      },
    };
    const sendSuggestion = async () => {
      console.log(suggestionMessage);
      await setDoc(
        chatsRef,
        {
          messages: GiftedChat.append(messages, suggestionMessage),
        },
        { merge: true }
      );
    };
    sendSuggestion();
  }, [suggestion]);
  
  const renderAccessory = () => (
    <ScrollView
      style={styles.container}
      horizontal={true}
      contentContainerStyle={{ alignItems: "center" }}
      showsHorizontalScrollIndicator={false}
    >
      {icebreaker.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={styles.suggestion}
          onPress={
            () => setSuggestion(item.name)
            //   {
            //   setMessages((previousMessages) =>
            //     GiftedChat.append(previousMessages, {
            //       _id: uuid.v4(),
            //       text: item.name,
            //       createdAt: new Date(),
            //       user: {
            //         // _id: route.params.user?.id,
            //         _id: userInfo.id,
            //         // _id: 1,
            //         name: route.params.user?.name,
            //       },
            //     })
            //   );
            //   await setDoc(
            //     chatsRef,
            //     {
            //       messages: GiftedChat.append(messages, {
            //         _id: uuid.v4(),
            //         text: item.name,
            //         createdAt: new Date(),
            //         user: {
            //           // _id: route.params.user?.id,
            //           _id: userInfo.id,
            //           // _id: 1,
            //           name: route.params.user?.name,
            //         },
            //       }),
            //     },
            //     { merge: true }
            //   );
            // }
          }
        >
          <Text style={{ color: "white" }}>{item.name || ""}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
  console.log(`param ${JSON.stringify(route.params.user.firstname)}`);
  console.log(`messages ${JSON.stringify(messages)}`);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserMatchScreen", route.params.user)
          }
          style={{ backgroundColor: "#DE3163", borderRadius: 5 }}
        >
          <Text style={{ color: "white", padding: 10 }}>Profile</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  // const onSend = useCallback(async (messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  // }, []);

  const onSend = useCallback(
    async (m = []) => {
      // setMessages((previousMessages) =>
      //   GiftedChat.append(previousMessages, messages)
      // );
      console.log(`Lol: ${JSON.stringify(m)}`);

      console.log(`Haha: ${JSON.stringify(messages)}`);
      await setDoc(
        chatsRef,
        {
          messages: GiftedChat.append(messages, m),
        },
        { merge: true }
      );
      console.log(JSON.stringify(messages));
    },
    [docId, messages]
  );

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
        // _id: route.params.user?.id,
        _id: userInfo.id,
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
