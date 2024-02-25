import DefaultLayout from "../../layouts/DefaultLayout";
import images from "../../assets/images";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLecturersName } from "../../redux/actions/loadPublicActions";
import Sliding from "../../components/Sliding";
import SearchModal from "../../components/SearchModal";
import { Button } from "react-native";
import RemoveModal from "../../components/RemoveModal";
import { openRemoveModal } from "../../redux/actions/removeModal";

const items = [
  { title: "slide1", src: images.home_slide1, content: "content 1" },
  { title: "slide2", src: images.home_slide2, content: "content 2" },
  { title: "slide3", src: images.home_slide3, content: "content 3" },
  { title: "slide4", src: images.home_slide4, content: "content 4" },
];

function HomePage() {
  const searchModal = useSelector((state) => state.searchModal);
  const removeModal = useSelector((state) => state.removeModal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLecturersName());
  }, []);

  return (
    <DefaultLayout>
      <Sliding images={items} title="Thông báo/Tin tức" />
      <SearchModal
        visible={searchModal.visible}
        filter={searchModal.filter}
        onClickModalItem={searchModal.onClickItem}
      />
      <RemoveModal
        onRemove={removeModal.onRemove}
        visible={removeModal.visible}
      />
    </DefaultLayout>
  );
}

export default HomePage;
