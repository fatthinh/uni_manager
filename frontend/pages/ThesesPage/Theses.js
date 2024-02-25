import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import InputBox from "../../components/InputBox";
import PaginationComponent from "../../components/PaginationComponent";
import ThesisItem from "./ThesisItem";

const Theses = ({ onClickItem, theses, loadTheses, active = undefined }) => {
  const [searchValue, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
    loadTheses(1, searchValue).then((value) => setTotalPages(value));
  }, [active]);

  useEffect(() => {
    loadTheses(currentPage, searchValue).then((value) => setTotalPages(value));
  }, [searchValue, currentPage]);

  return (
    <>
      {active !== undefined && (
        <InputBox
          label="Tìm kiếm"
          icon={<FontAwesomeIcon icon={faXmarkCircle} />}
          value={searchValue}
          onChange={handleSearch}
          removeIcon={true}
          style={{
            inputBox: {
              width: "100%",
            },
          }}
        />
      )}
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 8,
            paddingVertical: 14,
            backgroundColor: "#0c56d0",
          }}
        >
          <Text style={{ flex: 1 }}>ID</Text>
          <Text style={{ flex: 4 }}>Đề tài</Text>
          <Text style={{ flex: 3 }}>Ngày tạo</Text>
          <Text style={{ flex: 3 }}>Trạng thái</Text>
        </View>
        <View style={{ height: 420 }}>
          {theses.length ? (
            <>
              {theses.map((thesis) => (
                <ThesisItem
                  thesis={thesis}
                  key={thesis.id}
                  style={{ container: { borderColor: "#0c56d0" } }}
                  onPress={() => onClickItem(thesis)}
                />
              ))}
            </>
          ) : (
            <ActivityIndicator />
          )}
        </View>
        {active !== undefined && (
          <PaginationComponent
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}
      </View>
    </>
  );
};

export default Theses;
