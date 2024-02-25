import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import InputBox from "../../components/InputBox";
import PaginationComponent from "../../components/PaginationComponent";
import CouncilItem from "../CouncilsPage/CouncilItem";

const CouncilItems = ({ onClickItem, councils, loadCouncils }) => {
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    loadCouncils(currentPage, searchValue).then((value) =>
      setTotalPages(value)
    );
  }, [searchValue, currentPage]);

  return (
    <>
      <InputBox
        label="Tìm kiếm"
        icon={<FontAwesomeIcon icon={faXmarkCircle} />}
        value={searchValue}
        onChange={handleSearch}
        removeIcon={true}
        style={{
          inputBox: {
            width: "100%",
            marginBottom: 20,
          },
          input: {},
        }}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 8,
            paddingVertical: 14,
            backgroundColor: "#0c56d0",
          }}
        >
          <Text style={{ flex: 1 }}>ID</Text>
          <Text style={{ flex: 4 }}>Tên hội đồng</Text>
          <Text style={{ flex: 3 }}>Ngày tạo</Text>
          <Text style={{ flex: 3 }}>Trạng thái</Text>
        </View>
        <View style={{ height: 446 }}>
          {councils.map((council) => (
            <CouncilItem
              council={council}
              key={council.id}
              style={{ container: { borderColor: "#0c56d0" } }}
              onPress={() => onClickItem(council)}
            />
          ))}
        </View>
        <PaginationComponent
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </View>
    </>
  );
};

export default CouncilItems;
