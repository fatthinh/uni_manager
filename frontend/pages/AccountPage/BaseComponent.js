import { useEffect, useState } from "react";
import DetailLayout from "../../layouts/DetailLayout";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Dimensions, Image, Text, View } from "react-native";
import images from "../../assets/images";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { authAPIWithoutParams, endpoints } from "../../configs/API";
import { styles } from "./styles";
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import DropdownComponent from "../../components/Dropdown";

const ROLES = [
  { label: "Sinh viên", value: "STUDENT" },
  { label: "Giảng viên", value: "LECTURER" },
  { label: "Giáo vụ", value: "PROVOST" },
  { label: "Quản trị", value: "MANAGER" },
];

const SCREEN_HEIGHT = Dimensions.get('window').height

function BaseComponent({
  userInfo,
  token,
  handleLogout,
  handleChangeAvt,
  handleChangePassword,
  handleRemoveAccount,
}) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [backupUser, setBackupUser] = useState(null);

  useEffect(() => {
    setUser(userInfo);
    setBackupUser(userInfo);
  }, [userInfo]);

  const onChangeDetail = (key, value) => {
    setUser((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const compareObject = (obj1, obj2) =>
    JSON.stringify(obj1) === JSON.stringify(obj2);

  const handleUpdate = async () => {
    try {
      let response = await authAPIWithoutParams(token).patch(
        endpoints.user(user.id),
        {
          last_name: user.last_name,
          first_name: user.first_name,
          email: user.email,
          username: user.username,
          role: user.role,
        }
      );
      setBackupUser(response.data);
      setUser(response.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const childrenActions = () => {
    return (
      <>
        <View style={{ flexDirection: "row" }}>
          <ButtonComponent
            primary
            rightIcon={faPen}
            disabled={compareObject(user, backupUser)}
            onClick={handleUpdate}
          >
            Cập nhật
          </ButtonComponent>
          {handleChangePassword && (
            <ButtonComponent
              style={{
                container: {
                  backgroundColor: "red",
                },
              }}
              onClick={handleChangePassword}
            >
              Đổi mật khẩu
            </ButtonComponent>
          )}
          {handleRemoveAccount && (
            <ButtonComponent
              style={{
                container: {
                  backgroundColor: "red",
                },
              }}
              rightIcon={faTrash}
              onClick={handleRemoveAccount}
            >
              Xóa
            </ButtonComponent>
          )}
        </View>
      </>
    );
  };

  const toParentPage = () => {
    setUser(backupUser);
    if (handleChangeAvt) navigation.navigate("HomePage");
    else navigation.navigate("AdministratorPage", { token: token });
  };

  return (
    <DetailLayout
      title="Chi Tiết Tài Khoản"
      childrenActions={childrenActions()}
      toParentPage={toParentPage}
      style={{
        actions: {
          flex: 3,
        },
      }}
    >
      {user === null ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{
            margin: 12,
            borderWidth: 8,
            borderColor: "#ccc",
            padding: 20,
            borderRadius: 8,
            height: SCREEN_HEIGHT - 98
          }}
        >
          <View style={styles.header}>
            <ButtonComponent
              style={styles.avatarContainer}
              disabled={!handleChangeAvt}
              onClick={handleChangeAvt}
            >
              <View>
                <Image
                  source={{
                    uri:
                      user.avatar !== null
                        ? `https://res.cloudinary.com/dzjhqjxqj/${user.avatar}`
                        : images.default_avatar,
                  }}
                  style={styles.avatar}
                />
              </View>
            </ButtonComponent>
            {handleLogout && (
              <ButtonComponent
                rounded
                style={styles.logoutBtn}
                onClick={handleLogout}
              >
                Đăng xuất
              </ButtonComponent>
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            <InputBox
              label="Họ"
              value={user.first_name}
              onChange={(value) => onChangeDetail("first_name", value)}
            />
            <InputBox
              label="Tên"
              value={user.last_name}
              onChange={(value) => onChangeDetail("last_name", value)}
            />
            <InputBox
              label="Email"
              value={user.email}
              onChange={(value) => onChangeDetail("email", value)}
            />
            <InputBox
              label="Tên tài khoản"
              value={user.username}
              onChange={(value) => onChangeDetail("username", value)}
              disabled
            />
            <View style={styles.roleView}>
              <Text style={styles.roleLabel}>Vai trò:</Text>
              <DropdownComponent
                data={ROLES}
                value={user.role}
                onChange={(value) => onChangeDetail("role", value)}
                style={styles.dropdown}
                disabled={handleChangePassword}
              />
            </View>
          </View>
        </View>
      )}
    </DetailLayout>
  );
}

export default BaseComponent;
