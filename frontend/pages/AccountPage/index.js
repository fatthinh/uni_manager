import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import BaseComponent from "./BaseComponent";

function AccountPage({ navigation, route }) {
  const [user, setUser] = useState(null);
  const { userId, token } = route.params;

  const handleRemoveAccount = async () => {
    Alert.alert(
      "Cảnh báo",
      "Bạn có chắc chắn?",
      [
        {
          text: "Hủy",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Xác nhận",
          onPress: async () => {
            try {
              let removedUser = await authAPIWithoutParams(token).delete(
                endpoints.user(userId)
              );
              navigation.navigate("AdministratorPage", { token: token });
            } catch (error) {
              console.error("Error removing user:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        let response = await authAPIWithoutParams(token).get(
          endpoints.user(userId)
        );
        setUser(response.data);
      } catch (ex) {
        setUser(null);
        console.error(ex);
      }
    };
    loadUser();
  }, [userId]);

  return (
    <BaseComponent
      userInfo={user}
      token={token}
      handleRemoveAccount={handleRemoveAccount}
    />
  );
}

export default AccountPage;
