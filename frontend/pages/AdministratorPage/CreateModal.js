import { useState } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import ButtonComponent from "../../components/ButtonComponent";
import DropdownComponent from "../../components/Dropdown";
import InputBox from "../../components/InputBox";
import ModalComponent from "../../components/ModalComponent";

const ROLES = [
  { label: "Sinh viên", value: "STUDENT" },
  { label: "Giảng viên", value: "LECTURER" },
  { label: "Giáo vụ", value: "PROVOST" },
];

function CreateModal({ visible, unVisible, token }) {
  const [errorStyle, setErrorStyle] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const handleSubmit = async () => {
    try {
      if (isValidEmail(user.email) && user.role) {
        setLoading(true);
        const reponse = await authAPIWithoutParams(token).post(
          endpoints.users,
          {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            username: user.email.split("@")[0],
            password: `${user.email.split("@")[0]}@ou`,
            role: user.role,
          }
        );
        reset();
        setErrorStyle(false);
        if (reponse) {
          setLoading(false);
          unVisible();
        }
      } else {
        setErrorStyle(true);
      }
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.",
        [{ text: "OK", onPress: () => setErrorStyle(false) }],
        { cancelable: false }
      );
    }
  };

  const hanldeChangeDetail = (key, value) => {
    setUser((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const reset = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    });
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ModalComponent
      content={
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View>
            <InputBox
              label="Họ"
              value={user.firstName}
              onChange={(value) => hanldeChangeDetail("firstName", value)}
            />
            <InputBox
              label="Tên"
              value={user.lastName}
              onChange={(value) => hanldeChangeDetail("lastName", value)}
            />
            <InputBox
              label="Email"
              value={user.email}
              onChange={(value) => hanldeChangeDetail("email", value)}
            />
            <View
              style={{
                flexDirection: "row",
                marginTop: 16,
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontSize: 20, marginHorizontal: 16 }}>
                Vai trò:
              </Text>
              <DropdownComponent
                data={ROLES}
                value={user.role}
                onChange={(value) => hanldeChangeDetail("role", value)}
                style={{
                  dropdownContainer: {
                    height: 48,
                    width: 240,
                    borderColor: "#000",
                  },
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 20, alignItems: "center" }}>
            {errorStyle && <Text style={{ color: "red" }}>Nhập thông tin</Text>}
            <ButtonComponent
              primary
              rounded
              style={{
                container: { height: 46, width: 240 },
                textColor: { fontWeight: "bold", fontSize: 16 },
              }}
              onClick={handleSubmit}
            >
              {loading ? <ActivityIndicator /> : "Tạo"}
            </ButtonComponent>
          </View>
        </View>
      }
      title="Tạo tài khoản"
      unVisible={() => {
        unVisible();
        setErrorStyle(false);
        setLoading(false);
      }}
      visible={visible}
    />
  );
}

export default CreateModal;
