import { Text, TouchableOpacity, View } from "react-native";
import moment from "moment";

function ThesisItem({ thesis, onPress, onLongPress, style: customStyles }) {
  return (
    <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
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
        <Text style={{ flex: 1 }}>{thesis.id}</Text>
        <Text style={{ flex: 4 }}>{thesis.title}</Text>
        <Text style={{ flex: 3 }}>{moment(thesis.created_at).fromNow()}</Text>
        <Text style={{ flex: 3 }}>{thesis.is_active ? "Đã duyệt" : "Chờ"}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ThesisItem;
