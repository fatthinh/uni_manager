import { Text, TouchableOpacity, View } from "react-native";
import moment from "moment";

function CouncilItem({ council, onPress, style: customStyles }) {
  return (
    <TouchableOpacity onPress={onPress}>
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
        <Text style={{ flex: 1 }}>{council.id}</Text>
        <Text style={{ flex: 4 }}>{council.name}</Text>
        <Text style={{ flex: 3 }}>{moment(council.created_at).fromNow()}</Text>
        <Text style={{ flex: 3 }}>
          {council.is_active ? "Chưa khóa" : "Đã khóa"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default CouncilItem;
