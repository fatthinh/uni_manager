import {
  faAngleDown,
  faAngleUp,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ButtonComponent from "../../components/ButtonComponent";

const SCREEN_HEIGHT = Dimensions.get("window").height;

function DetailLayout({
  children,
  title = "Chi Tiết",
  childrenActions,
  toParentPage,
  style: customStyles,
}) {
  const [actionsShow, setActionShow] = useState(false);

  return (
    <View style={[styles.container, customStyles && customStyles.container]}>
      <View style={[styles.header, customStyles && customStyles.header]}>
        <ButtonComponent
          leftIcon={faChevronLeft}
          style={{
            container: {
              position: "absolute",
              left: -18,
              top: 28,
            },
            children: {
              marginHorizontal: 0,
            },
            textColor: {
              color: "#fff",
            },
          }}
          onClick={toParentPage}
        >
          Trở về
        </ButtonComponent>
        <Text style={[styles.title, styles.textColor]}>{title}</Text>
      </View>
      <View
        style={[
          customStyles && customStyles.children,
          actionsShow
            ? { height: SCREEN_HEIGHT - 150 }
            : { height: SCREEN_HEIGHT - 110 },
          !childrenActions && { height: SCREEN_HEIGHT - 80 },
        ]}
      >
        {/* <ScrollView style={{ flex: 1, paddingHorizontal: 12, width: "100%" }}> */}
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={80}>
          {children}
        </KeyboardAvoidingView>
        {/* </ScrollView> */}
      </View>
      {childrenActions && (
        <>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <ButtonComponent
              style={{
                container: {
                  paddingVertical: 0,
                  width: 80,
                },
              }}
              onClick={() => setActionShow((prev) => !prev)}
            >
              <FontAwesomeIcon icon={actionsShow ? faAngleDown : faAngleUp} />
            </ButtonComponent>
          </View>
          {actionsShow && (
            <View
              style={[styles.actions, customStyles && customStyles.actions]}
            >
              {childrenActions}
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    backgroundColor: "#fff"
  },
  header: {
    height: 80,
    backgroundColor: "#0c56d0",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100000,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 50,
  },
  textColor: {
    color: "#fff",
  },
});

export default DetailLayout;
