import { async } from "@firebase/util";
import { faPaperPlane, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import images from "../../assets/images";
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import { firestore } from "../../firebase/config";
import { addDocument, removeDoc } from "../../firebase/services";
import { useFirestore } from "../../hooks/useFirestore";
import DetailLayout from "../../layouts/DetailLayout";
import { normalizeTime } from "../../utils/normalizeTime";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SCREEN_HEIGHT =
  Platform.OS === "ios"
    ? Dimensions.get("screen").height
    : Dimensions.get("window").height;

function InboxPage({ navigation, route }) {
  const token = useMemo(() => route.params?.token, [token]);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { roomId, partner } = route.params;
  const [messageContent, setMessageContent] = useState("");
  const [typingModalVisible, setTypingModalVisible] = useState(false);
  const scrollViewRef = useRef(null);

  const condition = useMemo(
    () => ({
      fieldName: "room",
      operator: "==",
      compareValue: roomId,
    }),
    [roomId]
  );

  const messages = useFirestore("messages", condition);

  const sortedMessages = useMemo(
    () => messages.sort((a, b) => a.createdAt - b.createdAt),
    [messages]
  );

  const sendMessage = async () => {
    const messageId = await addDocument("messages", {
      author: userInfo.id,
      room: roomId,
      content: messageContent,
    });
    setMessageContent("");
    setTypingModalVisible(false);

    const roomRef = doc(firestore, "rooms", roomId);
    const messageRef = doc(firestore, "messages", messageId);
    await updateDoc(roomRef, {
      lastMessage: messageRef,
    });
  };

  const scrollToPosition = (position) => {
    scrollViewRef.current.scrollTo({ x: 0, y: position, animated: true });
  };

  const toParentPage = async () => {
    try {
      if (!messages.length) {
        await removeDoc("rooms", roomId);
      }
    } catch (error) {
      console.error("Error while removing room:", error);
    } finally {
      navigation.navigate("MessagesPage");
    }
  };

  return (
    <DetailLayout title={partner.name} toParentPage={toParentPage}>
      <View
        style={{
          height: SCREEN_HEIGHT - 114,
          width: "100%",
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          style={{
            paddingHorizontal: 10,
          }}
          contentContainerStyle={{
            minHeight: SCREEN_HEIGHT - 184,
            justifyContent: "flex-end",
          }}
        >
          {sortedMessages.map((message) => (
            <MessageItem
              message={message}
              partner={partner}
              key={message.id}
              isLastMessage={
                sortedMessages[sortedMessages.length - 1] === message
              }
            />
          ))}
        </ScrollView>
        <View
          style={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#000",
              width: 280,
              borderRadius: 4,
              paddingHorizontal: 10,
              paddingVertical: 8,
              fontSize: 16,
              height: 46,
            }}
            placeholder="Nhập..."
            value={messageContent}
            onChangeText={(value) => setMessageContent(value)}
          />
          <ButtonComponent
            primary
            style={{
              container: { height: 46 },
            }}
            onClick={sendMessage}
          >
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#fff" }} />
          </ButtonComponent>
        </View>
      </View>
    </DetailLayout>
  );
}

const MessageItem = ({ message, partner, isLastMessage }) => {
  const isPartnerMessage = partner.id === message.author;

  return (
    <View style={{ width: "100%", marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: isPartnerMessage ? "flex-start" : "flex-end",
        }}
      >
        {isPartnerMessage && (
          <Image
            source={{
              uri:
                partner.avatar !== null
                  ? `https://res.cloudinary.com/dzjhqjxqj/${partner.avatar}`
                  : images.default_avatar,
            }}
            style={{ width: 42, height: 42, borderRadius: 9999 }}
          />
        )}
        <Text
          style={{
            padding: 10,
            backgroundColor: isPartnerMessage ? "#3e78d6" : "#ccc",
            borderRadius: 14,
            width: 280,
          }}
        >
          {message.content}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Text style={{ fontSize: 14, opacity: 0.6 }}>
          {normalizeTime(message.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default InboxPage;
