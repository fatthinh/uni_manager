import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import { logout } from "../../redux/actions/userActions";
import BaseComponent from "./BaseComponent";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import ModalComponent from "../../components/ModalComponent";
import InputBox from "../../components/InputBox";
import { Alert, View } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";

function MyProfile({ route, navigation }) {
  const [user, setUser] = useState(null);
  const { token } = route.params;
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 4],
        quality: 1,
      });
      if (!result.canceled) {
        changeAvt(result.assets[0]);
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

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        Alert.alert("Thông báo", "Xác nhận lại mật khẩu!", [
          {
            text: "Thoát",
            onPress: () => {},
          },
        ]);
      } else if (newPassword && confirmNewPassword) {
        const response = await authAPIWithoutParams(token).patch(
          endpoints.changePassword,
          {
            password: oldPassword,
            new_password: newPassword,
          }
        );
        Alert.alert("Thông báo", "Đổi mật khẩu thành công!", [
          {
            text: "OK",
            onPress: () => setModalVisible(false),
          },
        ]);
        setConfirmNewPassword("");
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      Alert.alert("Thông báo", "Đổi mật khẩu không thành công!", [
        {
          text: "Thoát",
          onPress: () => {},
        },
      ]);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, [token]);

  return (
    <>
      <BaseComponent
        userInfo={user}
        token={token}
        handleLogout={handleLogout}
        handleChangeAvt={handleChangeAvt}
        handleChangePassword={() => setModalVisible(true)}
      />
      <ModalComponent
        title="Đổi mật khẩu"
        content={
          <View>
            <InputBox
              password
              value={oldPassword}
              onChange={(value) => setOldPassword(value)}
              label="Mật khẩu cũ"
            />
            <InputBox
              password
              value={newPassword}
              onChange={(value) => setNewPassword(value)}
              label="Mật khẩu mới"
            />
            <InputBox
              password
              value={confirmNewPassword}
              onChange={(value) => setConfirmNewPassword(value)}
              label="Xác nhận mật khẩu mới"
            />
            <ButtonComponent
              primary
              style={{ container: { height: 46, marginTop: 20 } }}
              onClick={handleChangePassword}
            >
              Gửi
            </ButtonComponent>
          </View>
        }
        unVisible={() => setModalVisible(false)}
        visible={modalVisible}
      />
    </>
  );
}

export default MyProfile;
