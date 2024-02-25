import { Text, TouchableOpacity, View } from "react-native";

function UserItem({ user, onPress, style: customStyles }) {
  return (
    <TouchableOpacity onPress={() => onPress(user.id)}>
      <View
        style={[
          {
            flexDirection: "row",
            padding: 8,
            borderColor: "#ccc",
            borderBottomWidth: 1,
          },
          customStyles && customStyles.container,
        ]}
      >
        <Text style={{ flex: 1 }}>{user.id}</Text>
        <Text style={{ flex: 3 }}>{user.username}</Text>
        <Text style={{ flex: 3.5 }}>
          {user.first_name} {user.last_name}
        </Text>
        <Text style={{ flex: 3 }}>{user.role}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default UserItem;
