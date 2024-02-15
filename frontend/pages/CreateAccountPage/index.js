import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text, Image, Alert } from "react-native";
import images from "../../assets/images";
import ButtonComponent from "../../components/ButtonComponent";
import DropdownComponent from "../../components/Dropdown";
import InputBox from "../../components/InputBox";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import DetailLayout from "../../layouts/DetailLayout";

const ROLES = [
  { label: "Sinh viên", value: "STUDENT" },
  { label: "Giảng viên", value: "LECTURER" },
  { label: "Giáo vụ", value: "PROVOST" },
];

function CreateAccountPage({ navigation, route }) {
  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    password: null,
    role: null,
  });

  const { token } = route.params;

  const handleSubmit = async () => {
    try {
      if (user.password && user.username) {
        await authAPIWithoutParams(token).post(endpoints.users, {
          first_name: user.firstName,
          last_name: user.lastName,
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
        });
        reset();
        navigation.navigate("AdministratorPage", { token: token });
      } else {
        Alert.alert(
          "",
          "Điền tên tài khoản và mật khẩu!!",
          [{ text: "OK", onPress: () => {} }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error("Error during API request:", error);
      Alert.alert(
        "Lỗi",
        "Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.",
        [{ text: "OK", onPress: () => {} }],
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

  const childrenActions = () => {
    return (
      <>
        <ButtonComponent
          primary
          rounded
          style={{
            container: { width: 220 },
            textColor: { fontWeight: "bold", fontSize: 16 },
          }}
          onClick={handleSubmit}
        >
          Tạo
        </ButtonComponent>
      </>
    );
  };

  const reset = () => {
    setUser({
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      password: null,
      role: null,
    });
  };

  return (
    <DetailLayout
      navigation={navigation}
      title="Tạo Tài Khoản"
      childrenActions={childrenActions()}
      toParentPage={() => {
        reset();
        navigation.navigate("AdministratorPage", { token: token });
      }}
      style={{
        actions: {
          flex: 3,
          justifyContent: "center",
        },
      }}
    >
      <>
        <View>
          <InputBox
            label="Họ"
            value={user.firstName}
            onChange={(value) => hanldeChangeDetail("firstName", value)}
            style={{
              input: {},
              inputBox: {},
            }}
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
          <InputBox
            label="Tên tài khoản"
            value={user.username}
            onChange={(value) => hanldeChangeDetail("username", value)}
          />
          <InputBox
            label="Mật khẩu"
            value={user.password}
            onChange={(value) => hanldeChangeDetail("password", value)}
            password
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontSize: 20, marginHorizontal: 16 }}>Vai trò:</Text>
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
      </>
    </DetailLayout>
  );
}

const styles = StyleSheet.create({});

export default CreateAccountPage;
