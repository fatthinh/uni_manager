import React, { useState, useEffect } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import Sliding from "../../components/Sliding";
import { Button } from "react-native";

const PlotPage = () => {
  const [imageData, setImageData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Make a network request to your Django API endpoint
    fetch("http://192.168.1.42:8000/api/plot/")
      .then((response) => response.json())
      .then((data) => {
        // Extract the image data from the response
        const base64ImageData = data.image;
        setImageData((prev) => [
          ...prev,
          {
            title: "data1",
            src: { uri: base64ImageData },
            content: "content 1",
          },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, [refresh]); // Empty dependency array means this effect runs once when the component mounts

  return (
    <DefaultLayout>
      {imageData.length !== 0 && (
        <Sliding title="Thống kê dữ liệu" images={imageData} />
      )}
      <Button title="hello" onPress={() => setRefresh((prev) => !prev)} />
    </DefaultLayout>
  );
};

export default PlotPage;
