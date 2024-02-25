import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonComponent from "../ButtonComponent";
import { useEffect, useRef, useState } from "react";
import images from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import useDebounce from "../../hooks/useDebounce";
import API, { endpoints } from "../../configs/API";
import { useDispatch } from "react-redux";
import { closeSearchModal } from "../../redux/actions/openSearchModal";

function SearchModal({ visible, onClickModalItem, filter }) {
  const [searchValue, setSearchValue] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const debounceValue = useDebounce(searchValue, 300);
  const dispatch = useDispatch();

  const loadUsers = async () => {
    let params = {
      search: debounceValue,
      filter: filter,
    };
    let response = await API.get(endpoints.publicUsers, { params: params });
    setSearchResult(response.data);
  };

  useEffect(() => {
    loadUsers();
  }, [debounceValue, filter]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ marginTop: 20 }}>
        <View style={{ gap: 16 }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 20,
            }}
          >
            <ButtonComponent
              onClick={() => dispatch(closeSearchModal())}
              style={{
                container: {
                  marginLeft: 0,
                  paddingHorizontal: 8,
                },
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </ButtonComponent>
            <TextInput
              autoFocus
              editable
              //   ref={inputRef}
              style={{
                width: 330,
                height: 40,
                fontSize: 18,
                padding: 6,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#000",
              }}
              placeholder="Tìm kiếm..."
              value={searchValue}
              onChangeText={(value) => setSearchValue(value)}
            />
          </View>
        </View>
        <ScrollView
          style={{
            marginVertical: 10,
            padding: 10,
            borderTopWidth: 2,
            borderColor: "#ccc",
            maxHeight: 654,
          }}
        >
          {searchResult !== null ? (
            searchResult.map((item) => (
              <UserItem
                key={item.id}
                onPressUserItem={() => {
                  dispatch(closeSearchModal());
                  onClickModalItem(item);
                }}
                item={item}
              />
            ))
          ) : (
            <ActivityIndicator />
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const UserItem = ({ onPressUserItem, item }) => {
  return (
    <TouchableOpacity onPress={onPressUserItem}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          backgroundColor: "#e3e3e3",
          borderRadius: 24,
          marginBottom: 4,
        }}
      >
        <Image
          source={{
            uri:
              item.avatar !== null
                ? `https://res.cloudinary.com/dzjhqjxqj/${item.avatar}`
                : images.default_avatar,
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            marginRight: 20,
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: 500 }}>
          {item.get_full_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchModal;
