import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, Dimensions } from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import UserItem from "./UserItem";
import { authAPIWithParams, endpoints } from "../../configs/API";
import InputBox from "../../components/InputBox";
import DropdownComponent from "../../components/Dropdown";
import ButtonComponent from "../../components/ButtonComponent";
import PaginationComponent from "../../components/PaginationComponent";
import { styles } from "./styles";
import CreateModal from "./CreateModal";

const SCREEN_WIDTH = Dimensions.get("window").width;
const ROLES = [
  { label: "Sinh viên", value: "student" },
  { label: "Giảng viên", value: "lecturer" },
  { label: "Giáo vụ", value: "provost" },
  { label: "Tất cả", value: "all" },
];

function AdministratorPage({ route, navigation }) {
  const { token } = route.params;
  const [filterValue, setFilterValue] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleFilter = (value) => {
    setCurrentPage(1);
    setFilterValue(value);
  };

  const goToDetail = (userId) => {
    navigation.navigate("AccountPage", { token: token, userId: userId });
  };

  const loadUsers = async () => {
    try {
      let params = {
        page: currentPage,
        search: searchValue,
        filter: filterValue,
      };
      let response = await authAPIWithParams(token, params).get(
        endpoints.users
      );
      setUsers(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (ex) {
      setUsers([]);
      console.error(ex);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage, searchValue, filterValue]);

  return (
    <>
      <DefaultLayout>
        <View style={styles.actions}>
          <ButtonComponent
            outline
            style={{ container: { marginBottom: -8 } }}
            onClick={() => setModalVisible(true)}
          >
            Thêm tài khoản
          </ButtonComponent>
        </View>
        <View style={styles.filterContainer}>
          <InputBox
            label="Tìm kiếm"
            icon={
              <FontAwesomeIcon icon={faXmarkCircle} style={styles.searchIcon} />
            }
            value={searchValue}
            onChange={handleSearch}
            removeIcon={true}
            style={{
              inputBox: {
                width: (SCREEN_WIDTH - 24) * 0.6,
                marginTop: 0,
              },
            }}
          />
          <DropdownComponent
            data={ROLES}
            value={filterValue}
            onChange={handleFilter}
            style={styles.dropdown}
          />
        </View>
        <View style={styles.usersContainer}>
          <View style={styles.usersHeader}>
            <View style={{ flex: 1 }}>
              <FontAwesomeIcon icon={faUser} />
            </View>
            <Text style={{ flex: 3 }}>Tên tài khoản</Text>
            <Text style={{ flex: 3.5 }}>Họ và tên</Text>
            <Text style={{ flex: 3 }}>Vai trò</Text>
          </View>
          {users.length ? (
            <>
              {users.map((user, index) => (
                <UserItem
                  user={user}
                  key={index}
                  style={{
                    container: {
                      borderColor: "#0c56d0",
                    },
                  }}
                  onPress={goToDetail}
                />
              ))}
            </>
          ) : (
            <ActivityIndicator />
          )}
        </View>
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </DefaultLayout>
      <CreateModal
        visible={modalVisible}
        unVisible={() => setModalVisible(false)}
        token={token}
      />
    </>
  );
}

export default AdministratorPage;
