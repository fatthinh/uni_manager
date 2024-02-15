import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={[styles.container, customStyles && customStyles.container]}>
      <View style={[styles.header, customStyles && customStyles.header]}>
        <ButtonComponent
          leftIcon={faChevronLeft}
          style={{
            container: {
              position: "absolute",
              left: -18,
              top: 18,
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
      <View style={[styles.children, customStyles && customStyles.children]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <View style={{ padding: 12, alignItems: "center" }}>
              {children}
            </View>
            <View
              style={{
                height: keyboardHeight / 2,
              }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <View style={[styles.actions, customStyles && customStyles.actions]}>
        {childrenActions}
      </View>
      <View style={styles.footer}>
        <FontAwesomeIcon icon={faCopyright} style={styles.textColor} />
        <Text style={[{ marginLeft: 2 }, styles.textColor]}>th</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    display: "flex",
    backgroundColor: "#fff",
  },
  header: {
    flex: 2,
    backgroundColor: "#0c56d0",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  children: {
    flex: 10,
  },
  actions: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textColor: {
    color: "#fff",
  },
  footer: {
    flex: 1,
    backgroundColor: "#0c56d0",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default DetailLayout;
