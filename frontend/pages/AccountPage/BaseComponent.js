import { useEffect, useState } from "react";
import DetailLayout from "../../layouts/DetailLayout";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import images from "../../assets/images";
import InputBox from "../../components/InputBox";
import DropdownComponent from "../../components/Dropdown";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { authAPIWithoutParams, endpoints } from "../../configs/API";

const ROLES = [
  { label: "Sinh viên", value: "STUDENT" },
  { label: "Giảng viên", value: "LECTURER" },
  { label: "Giáo vụ", value: "PROVOST" },
  { label: "Quản trị", value: "MANAGER" },
];

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
        <>
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
          <View>
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
        </>
      )}
    </DetailLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 120,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  avatarContainer: {
    container: { margin: 0, opacity: 1 },
  },
  avatar: {
    objectFit: "fill",
    width: 100,
    height: 100,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "#0c56d0",
  },
  logoutBtn: { container: { position: "absolute", right: 0 } },
  roleView: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "flex-end",
  },
  roleLabel: { fontSize: 20, marginHorizontal: 16 },
  dropdown: {
    dropdownContainer: {
      height: 48,
      width: 240,
      borderColor: "#000",
    },
  },
});

export default BaseComponent;
