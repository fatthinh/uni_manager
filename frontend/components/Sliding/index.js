import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function Sliding({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (right) => {
    if (right) {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);
    } else
      setCurrentIndex((currentIndex) =>
        currentIndex === 0 ? images.length - 1 : currentIndex - 1
      );
  };

  useEffect(() => {
    const intervalId = setInterval((right) => handleClick(right), 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{ height: 520 }}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={[styles.button, { left: 8 }]}
            onPress={() => handleClick()}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </TouchableOpacity>
          <Image source={images[currentIndex].src} style={styles.image} />
          <TouchableOpacity
            style={[styles.button, { right: 8 }]}
            onPress={(right) => handleClick(right)}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{images[currentIndex].content}</Text>
        </View>
      </View>
    </View>
  );
}

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  container: {
    marginTop: 16,
  },
  imageContainer: {
    position: "relative",
    justifyContent: "center",
    paddingVertical: 20,
  },
  image: {
    width: SCREEN_WIDTH - 24,
    height: SCREEN_WIDTH - 50,
    objectFit: "fill",
    borderRadius: 12,
    zIndex: -1000,
  },
  button: {
    position: "absolute",
    top: SCREEN_WIDTH / 2 - 42,
    zIndex: 1000,
    width: 42,
    height: 42,
    padding: 5,
    borderRadius: 40,
    backgroundColor: "#e6e6e6",
    opacity: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default Sliding;
