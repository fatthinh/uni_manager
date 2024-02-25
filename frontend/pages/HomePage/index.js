import DefaultLayout from "../../layouts/DefaultLayout";
import images from "../../assets/images";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLecturersName } from "../../redux/actions/loadPublicActions";
import Sliding from "../../components/Sliding";
import SearchModal from "../../components/SearchModal";

const items = [
  { title: "slide1", src: images.home_slide1, content: "content 1" },
  { title: "slide2", src: images.home_slide2, content: "content 2" },
  { title: "slide3", src: images.home_slide3, content: "content 3" },
  { title: "slide4", src: images.home_slide4, content: "content 4" },
];

function HomePage() {
  const searchModalVisible = useSelector((state) => state.searchModalVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLecturersName());
  }, []);

  return (
    <DefaultLayout>
      <Sliding images={items} title="Thông báo/Tin tức" />
      <SearchModal
        visible={searchModalVisible.visible}
        filter={searchModalVisible.filter}
        onClickModalItem={searchModalVisible.onClickItem}
      />
    </DefaultLayout>
  );
}

export default HomePage;
