import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import API, { authAPIWithoutParams, endpoints } from "../../configs/API";
import { logout } from "../../redux/actions/userActions";
import BaseComponent from "./BaseComponent";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

function MyProfile({ route, navigation }) {
  const [user, setUser] = useState(null);
  const { token } = route.params;
  const dispatch = useDispatch();

  const changeAvt = async (avt) => {
    try {
      const formData = new FormData();
      formData.append("avatar", {
        uri: avt.uri,
        type: mime.getType(avt.uri),
        name: avt.uri.split("/").pop(),
      });

      await authAPIWithoutParams(token).patch(
        endpoints.user(user.id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (ex) {
      console.error(ex);
    } finally {
      loadCurrentUser();
    }
  };

  const handleChangeAvt = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Không có quyền truy cập!");
    } else {
      let res = await ImagePicker.launchImageLibraryAsync();

      if (!res.canceled) {
        changeAvt(res.assets[0]);
      }
    }
  };

  const handleLogout = async () => {
    dispatch(logout());
    navigation.navigate("LoginPage");
  };

  const loadCurrentUser = async () => {
    let response = await authAPIWithoutParams(token).get(endpoints.currentUser);
    setUser(response.data);
  };

  const handleChangePassword = () => {};

  useEffect(() => {
    loadCurrentUser();
  }, [token]);

  return (
    <BaseComponent
      userInfo={user}
      token={token}
      handleLogout={handleLogout}
      handleChangeAvt={handleChangeAvt}
      handleChangePassword={handleChangePassword}
    />
  );
}

export default MyProfile;
