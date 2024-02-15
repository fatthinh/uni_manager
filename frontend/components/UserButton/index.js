import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { useSelector } from "react-redux";

function UserButton() {
  const navigation = useNavigation();
  const userLogin = useSelector((state) => state.userLogin) || {};
  const [token, setToken] = useState(null);

  const loadToken = async () => {
    let accessToken = await AsyncStorage.getItem("access-token");
    setToken(accessToken);
  };

  useEffect(() => {
    loadToken();
  }, [userLogin]);

  return (
    <View style={{ marginRight: 12 }}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("MyProfile", { token: token })}
      >
        <View style={{ padding: 5 }}>
          <FontAwesomeIcon icon={faUser} style={{ color: "#0c56d0" }} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default UserButton;
