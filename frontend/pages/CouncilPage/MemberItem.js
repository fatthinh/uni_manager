import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import DropdownComponent from "../../components/Dropdown";

function MemberItem({ info, roles, onChangeRole }) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 8,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#0c56d0",
      }}
    >
      <Text style={{ flex: 1, fontSize: 14 }}>{info.user}</Text>
      <Text style={{ flex: 4, fontSize: 14 }}>
        {`${info.first_name} ${info.last_name}`}
      </Text>
      <View style={{ flex: 5 }}>
        <DropdownComponent
          style={{ dropdownContainer: { width: "100%", borderWidth: 0 } }}
          value={info.council_role}
          onChange={onChangeRole}
          data={roles}
        />
      </View>
    </View>
  );
}

export default MemberItem;
