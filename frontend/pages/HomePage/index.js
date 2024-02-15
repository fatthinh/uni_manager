import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import images from "../../assets/images";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCouncilsName,
  loadLecturersName,
  loadStudentsName,
} from "../../redux/actions/loadPublicActions";

const items = [
  { title: "slide1", src: images.home_slide1, content: "content 1" },
  { title: "slide2", src: images.home_slide2, content: "content 2" },
  { title: "slide3", src: images.home_slide3, content: "content 3" },
  { title: "slide4", src: images.home_slide4, content: "content 4" },
];

function HomePage() {
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageLoaded) {
      const timeoutId = setTimeout(() => setImageLoaded(true), 2000); // Wait for 2 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [imageLoaded]);

  useEffect(() => {
    dispatch(loadStudentsName());
    dispatch(loadLecturersName());
    dispatch(loadCouncilsName());
  }, []);

  const handleClick = (right) => {
    if (right) {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % items.length);
    } else
      setCurrentIndex((currentIndex) =>
        currentIndex === 0 ? 3 : currentIndex - 1
      );
    setImageLoaded(false);
  };

  return (
    <DefaultLayout>
      <View style={styles.title}>
        <Text style={styles.titleText}>THÔNG BÁO/TIN TỨC</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={[styles.button, { left: 8 }]}
            onPress={(right = False) => handleClick(right)}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </TouchableOpacity>
          {imageLoaded ? (
            <Image source={items[currentIndex].src} style={styles.image} />
          ) : (
            <ActivityIndicator />
          )}
          <TouchableOpacity
            style={[styles.button, { right: 8 }]}
            onPress={(right = true) => handleClick(right)}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{items[currentIndex].content}</Text>
        </View>
      </View>
    </DefaultLayout>
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
    height: SCREEN_WIDTH,
  },
  image: {
    width: SCREEN_WIDTH - 24,
    height: SCREEN_WIDTH,
    objectFit: "fill",
    borderRadius: 12,
    zIndex: -1000,
  },
  button: {
    position: "absolute",
    top: (SCREEN_WIDTH - 24) / 2 - 40,
    zIndex: 1000,
    width: 30,
    height: 80,
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
  },
});

export default HomePage;
