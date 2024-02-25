import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import images from "../../assets/images";
import ButtonComponent from "../../components/ButtonComponent";
import SearchModal from "../../components/SearchModal";
import DetailLayout from "../../layouts/DetailLayout";
import { useFirestore } from "../../hooks/useFirestore";
import { onSnapshot } from "firebase/firestore";
import { normalizeTime } from "../../utils/normalizeTime";
import { addDocument, removeDoc } from "../../firebase/services";
import {
  closeSearchModal,
  openSearchModal,
} from "../../redux/actions/openSearchModal";

function MessagesPage({ navigation, route }) {
  const dispatch = useDispatch();
  const token = useMemo(() => route.params?.token, [token]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);

  const condition = useMemo(
    () => ({
      fieldName: "mems",
      operator: "array-contains",
      compareValue: userInfo ? userInfo.id : 50000,
    }),
    [userInfo]
  );

  const rooms = useFirestore("rooms", condition);

  const onClickModalItem = async (partner) => {
    console.log(partner);
    let partnerInfo = {
      id: partner.id,
      name: partner.get_full_name,
      avatar: partner.avatar,
    };

    let createdRoom;
    let created = rooms.find((room) => {
      if (room.mems.includes(partner.id)) {
        createdRoom = room.id;
        return true;
      }
      return false;
    });

    if (created) {
      navigation.navigate("InboxPage", {
        roomId: createdRoom,
        partner: partnerInfo,
      });
    } else {
      let roomId = await addDocument("rooms", {
        lastMessage: null,
        members: [
          {
            id: userInfo.id,
            name: `${userInfo.first_name} ${userInfo.last_name}`,
            avatar: userInfo.avatar,
          },
          partnerInfo,
        ],
        mems: [userInfo.id, partner.id],
      });
      navigation.navigate("InboxPage", {
        roomId: roomId,
        partner: partnerInfo,
      });
    }
    dispatch(closeSearchModal());
  };

  return (
    <>
      <DetailLayout
        title="Tin nhắn"
        toParentPage={() => navigation.navigate("HomePage")}
      >
        <ButtonComponent
          style={{
            container: {
              width: "98%",
              borderColor: "#000",
              borderRadius: 8,
            },
            children: { opacity: 0.6, fontSize: 18 },
          }}
          rounded
          onClick={() => dispatch(openSearchModal("", onClickModalItem))}
        >
          Tìm kiếm
        </ButtonComponent>
        <ScrollView style={{ width: "100%", height: 552 }}>
          {rooms.map((room) => (
            <MessageItem
              key={room.id}
              room={room}
              myId={userInfo ? userInfo.id : 5000000}
              navigation={navigation}
              token={token}
            />
          ))}
        </ScrollView>
      </DetailLayout>
    </>
  );
}

const MessageItem = ({ token, room, myId }) => {
  const navigation = useNavigation();
  const [partner, setPartner] = useState(null);
  const [message, setLastMessage] = useState(null);

  useEffect(() => {
    setPartner(room.members.find((member) => member.id !== myId));
    if (room.lastMessage) {
      const load = () => {
        const unsubscribe = onSnapshot(room.lastMessage, (snapshot) => {
          if (snapshot.exists()) {
            setLastMessage(snapshot.data());
          } else {
            console.log("Document does not exist");
          }
        });
        return unsubscribe;
      };

      load();
    }
  }, [room]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("InboxPage", {
          token: token,
          roomId: room.id,
          partner: partner,
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          borderBottomWidth: 1,
          borderColor: "#ccc",
        }}
      >
        <Image
          source={{
            uri:
              partner && partner.avatar !== null
                ? `https://res.cloudinary.com/dzjhqjxqj/${partner.avatar}`
                : images.default_avatar,
          }}
          style={{
            width: 48,
            height: 48,
            borderRadius: 999,
            marginRight: 20,
          }}
        />
        <View
          style={{
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 500 }}>
            {partner && partner.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 16, width: "52%" }}>
              {message
                ? message.author === myId
                  ? `Tôi: ${message.content}`
                  : message.content
                : "..."}
            </Text>
            <Text style={{ width: "48%" }}>
              {message && normalizeTime(message.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessagesPage;
