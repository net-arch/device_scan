import React, { useState, useEffect } from "react";
import axios from "axios";
import ScanResults from "./ScanResults";
import networkImage from "./images/NETWORK.png";
// import networkImage from './images/NETWORK_NBG.png';

const AppScreen = () => {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const startScan = () => {
    setIsScanning(true);
  };

  if (isScanning) {
    return <ScanResults />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-sky-500">
      <div className="flex flex-col items-center justify-center ">
        <div
          className="bg-white bg-opacity-40 rounded-full p-2 inline-block"
          style={{
            animation: "fadeInUp 1s ease-in forwards",
            opacity: 0,
            transition: "opacity 1s ease-in-out",
          }}
          onLoad={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <img
            src={networkImage}
            alt="Network"
            style={{ borderRadius: "30%", width: "100%", height: "100%" }}
          />
        </div>
        <h1
          style={{
            animation: "fadeInUp 1s ease-in 0.5s forwards",
            opacity: 0,
            transition: "opacity 1s ease-in-out",
          }}
          onLoad={(e) => (e.currentTarget.style.opacity = "1")}
          className="text-white text-4xl font-bold mt-4"
        >
          Device Scanner へようこそ
        </h1>
        <p
          style={{
            animation: "fadeInUp 1s ease-in 1s forwards",
            opacity: 0,
            transition: "opacity 1s ease-in-out",
          }}
          onLoad={(e) => (e.currentTarget.style.opacity = "1")}
          className="text-white text-opacity-70 mt-2"
        >
          ネットワークの状態確認しましょう。
        </p>
        <button
          style={{
            animation: "fadeInUp 1s ease-in 1.5s forwards",
            opacity: 0,
            transition: "opacity 1s ease-in-out",
          }}
          onLoad={(e) => (e.currentTarget.style.opacity = "1")}
          onClick={startScan}
          className="mt-4 bg-white text-purple-600 font-semibold py-2 px-4 rounded-full hover:bg-purple-100"
        >
          スタート
        </button>
      </div>
    </div>
  );
};

export default AppScreen;
