import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import DetailLayout from "../../layouts/DetailLayout";

function CreateCouncilPage({ navigation }) {
  const [councilName, setCouncilName] = useState(null);

  const handleCreate = async () => {
    try {
      if (councilName) {
        let accessToken = await AsyncStorage.getItem("access-token");
        await authAPIWithoutParams(accessToken).post(endpoints.councils, {
          name: councilName,
        });
        navigation.navigate("CouncilsPage");
      } else {
        Alert.alert(
          "Cảnh báo",
          "Điền tên hội đồng!!",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error("Error during API request:", error);
      Alert.alert(
        "Lỗi",
        "Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  return (
    <DetailLayout
      title="Tạo Hội Đồng"
      toParentPage={() => navigation.navigate("CouncilsPage")}
    >
      <View
        style={{
          width: "100%",
          height: 420,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputBox
          value={councilName}
          onChange={(text) => setCouncilName(text)}
          label="Tên hội đồng"
        />
        <ButtonComponent
          rounded
          style={{ container: { width: 200, marginTop: 20 } }}
          onClick={handleCreate}
        >
          Tạo
        </ButtonComponent>
      </View>
    </DetailLayout>
  );
}

export default CreateCouncilPage;
