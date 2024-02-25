import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function PaginationComponent({ totalPages, setCurrentPage, currentPage = 1 }) {
  const pages = [];

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleBackPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleClickPage = (value) => {
    setCurrentPage(value);
  };

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
        justifyContent: "flex-end",
        marginTop: 20,
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
}

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

export default PaginationComponent;
