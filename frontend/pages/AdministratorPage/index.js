import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import UserItem from "./UserItem";
import { authAPIWithParams, endpoints } from "../../configs/API";
import InputBox from "../../components/InputBox";
import DropdownComponent from "../../components/Dropdown";
import ButtonComponent from "../../components/ButtonComponent";

const ROLES = [
  { label: "Sinh viên", value: "student" },
  { label: "Giảng viên", value: "lecturer" },
  { label: "Giáo vụ", value: "provost" },
  { label: "Tất cả", value: "all" },
];

function AdministratorPage({ route, navigation }) {
  const { token } = route.params;
  const [filterValue, setFilterValue] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(null);
  const [users, setUsers] = useState(null);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleBackPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleClickPage = (value) => {
    setCurrentPage(value);
  };
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

  useEffect(() => {
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
        setUsers(null);
        console.error(ex);
      }
    };

    loadUsers();
  }, [currentPage, searchValue, filterValue]);

  return (
    <DefaultLayout>
      <View style={styles.actions}>
        <ButtonComponent
          outline
          style={{ container: { marginBottom: -8 } }}
          onClick={() =>
            navigation.navigate("CreateAccountPage", { token: token })
          }
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
          <Text style={{ flex: 4 }}>Họ và tên</Text>
          <Text style={{ flex: 2 }}>Vai trò</Text>
        </View>
        {users === null ? (
          <ActivityIndicator />
        ) : (
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
        )}
      </View>
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        handleClickPage={handleClickPage}
        handleBackPage={handleBackPage}
        handleNextPage={handleNextPage}
      />
    </DefaultLayout>
  );
}

const PaginationComponent = ({
  totalPages,
  currentPage = 1,
  handleClickPage,
  handleBackPage,
  handleNextPage,
}) => {
  const pages = [];

  // const items = currentPage + 1 >= totalPages ? totalPages - 1 : currentPage;

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <PageItem
        value={i}
        currentPage={currentPage}
        key={i}
        onClick={() => handleClickPage(i)}
      />
    );
  }

  return totalPages > 1 ? (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "flex-end",
      }}
    >
      {currentPage !== 1 && (
        <PageItem
          icon={<FontAwesomeIcon icon={faArrowLeft} />}
          onClick={handleBackPage}
        />
      )}
      {pages}
      {currentPage !== totalPages && (
        <PageItem
          icon={<FontAwesomeIcon icon={faArrowRight} />}
          onClick={handleNextPage}
        />
      )}
    </View>
  ) : (
    <></>
  );
};

const PageItem = ({ value, icon, currentPage, onClick }) => {
  const isActived = currentPage === value && !icon;

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: "#ccc",
          paddingHorizontal: 8,
          paddingVertical: 4,
          marginHorizontal: 2,
          borderWidth: 1,
          borderColor: isActived ? "#000" : "#ccc",
        },
      ]}
      onPress={onClick}
    >
      <Text>{value || icon}</Text>
    </TouchableOpacity>
  );
};

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  actions: { flexDirection: "row", justifyContent: "flex-end" },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    height: 60,
    marginTop: 20,
  },
  searchContainer: {
    position: "relative",
    flexDirection: "row",
    width: (SCREEN_WIDTH - 24) * 0.7,
    height: 46,
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  searchBox: {
    marginRight: 20,
    width: 200,
    fontSize: 16,
  },
  searchIconContainer: {
    // display: "none",
    position: "absolute",
    right: 0,
    padding: 10,
    opacity: 0.4,
  },
  searchIcon: {},
  label: {
    position: "absolute",
    backgroundColor: "#fff",
    left: 12,
    top: -12,
    zIndex: 999,
    paddingHorizontal: 4,
    fontSize: 14,
  },
  dropdown: {
    dropdownContainer: {
      width: (SCREEN_WIDTH - 24) * 0.35,
      height: 46,
      marginLeft: 8,
    },
  },
  usersHeader: {
    flexDirection: "row",
    marginTop: 12,
    paddingHorizontal: 8,
    paddingVertical: 14,
    backgroundColor: "#0c56d0",
  },
  textStyle: {
    fontSize: 12,
  },
  usersContainer: {
    height: 430,
  },
});

export default AdministratorPage;
