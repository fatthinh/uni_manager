import React, { useState, useEffect } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import Sliding from "../../components/Sliding";
import { Button } from "react-native";
import DropdownComponent from "../../components/Dropdown";
import API, { endpoints } from "../../configs/API";

const YEARS = [
  { label: "2020", value: 2020 },
  { label: "2021", value: 2021 },
  { label: "2022", value: 2022 },
  { label: "2023", value: 2023 },
  { label: "2024", value: 2024 },
];

const PlotPage = () => {
  const [imageData, setImageData] = useState([]);
  const [year, setYear] = useState(2024);

  useEffect(() => {
    const loadPlot = async () => {
      const response = await API.get(`${endpoints.plot}?year=${year}`);
      setImageData([
        {
          title: "score",
          src: { uri: response.data.score_image },
          content: `Thống kê điểm khóa luận năm ${year}`,
        },
        {
          title: "major",
          src: { uri: response.data.major_image },
          content: `Tần suất làm khóa luận theo ngành năm ${year}`,
        },
      ]);
    };
    loadPlot();
  }, [year]);

  return (
    <DefaultLayout>
      {imageData.length !== 0 && (
        <Sliding title="Thống kê dữ liệu" images={imageData} />
      )}
      <DropdownComponent
        data={YEARS}
        value={year}
        onChange={(value) => setYear(value)}
        style={{ dropdownContainer: { width: "100%", marginTop: 20 } }}
      />
    </DefaultLayout>
  );
};

export default PlotPage;
