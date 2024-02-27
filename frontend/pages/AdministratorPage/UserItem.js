import { Image, Text, TouchableOpacity, View } from "react-native";
import images from "../../assets/images";

function UserItem({ onPressUserItem, item }) {
  return (
    <TouchableOpacity onPress={onPressUserItem}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          backgroundColor: "#e3e3e3",
          borderRadius: 24,
          marginBottom: 4,
        }}
      >
        <Image
          source={{
            uri:
              item.avatar !== null
                ? `https://res.cloudinary.com/dzjhqjxqj/${item.avatar}`
                : images.default_avatar,
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            marginRight: 20,
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: 500 }}>
          {item.get_full_name
            ? item.get_full_name
            : `${item.first_name} ${item.last_name}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default UserItem;
