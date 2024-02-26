import DefaultLayout from "../../layouts/DefaultLayout";
import images from "../../assets/images";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLecturersName } from "../../redux/actions/loadPublicActions";
import Sliding from "../../components/Sliding";
import SearchModal from "../../modals/SearchModal";
import RemoveModal from "../../modals/RemoveModal";

const items = [
  {
    title: "slide1",
    src: images.home_slide1,
    content:
      "Trường Đại học Mở Thành phố Hồ Chí Minh họp mặt Tân niên Xuân Giáp Thìn năm 2024",
  },
  {
    title: "slide2",
    src: images.home_slide2,
    content:
      "Thông báo điều chỉnh và bổ sung lịch thi đại học chính quy học kỳ 1 năm học 2023-2024",
  },
  {
    title: "slide3",
    src: images.home_slide3,
    content:
      "Hội thảo định hướng chương trình thực tập tại Nhật Bản dành cho sinh viên ngành Công Nghệ Thông Tin và Ngoại Ngữ",
  },
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
