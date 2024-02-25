import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
} from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import Styles, { Line } from "./Styles";
import { login } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function LoginPage({ navigation }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const handleLogin = () => {
    dispatch(login(username, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigation.navigate("HomePage");
    }
  }, [loading]);

  return (
    <View style={Styles.container}>
      <View style={Styles.title}>
        <Text style={[Styles.textColor, Styles.titleText]}>Đăng Nhập</Text>
      </View>
      <View style={Styles.form}>
        <TextInput
          style={[Styles.input, Styles.textColor]}
          placeholder="Tên đăng nhập"
          placeholderTextColor={"#a6a6a6"}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Line />
        <TextInput
          style={[Styles.input, Styles.textColor]}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          placeholderTextColor={"#a6a6a6"}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Line />

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ButtonComponent
            style={{
              container: {
                backgroundColor: "#d8e2f3",
                opacity: 0.8,
                width: 180,
                borderRadius: 22,
                paddingVertical: 12,
              },
              children: {
                fontSize: 22,
              },
            }}
            onClick={handleLogin}
          >
            {loading ? <ActivityIndicator /> : "Đăng nhập"}
          </ButtonComponent>
        </View>
      </View>
    </View>
  );
}

export default LoginPage;
