import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Episode from "./components/Episode";

function App() {
  const selItem = {
    Title: "Truth and Bone",
    Doctor: "None",
    Series: "Paternoster Gang ",
    id: "paternoster3-3",
    Featuring: "Vastra, Strax",
    Number: "3.3",
    Released: "2020-05-05T05:00:00.000Z",
    SPath:
      "Audio Dramas/Doctor Who - Big Finish/Paternoster Gang/303 Truth and Bone",
    Chapters: [
      "01 - Truth and Bone 01.mp3",
      "02 - Truth and Bone 02.mp3",
      "03 - Truth and Bone 03.mp3",
      "04 - Truth and Bone 04.mp3",
      "05 - Truth and Bone 05.mp3",
      "06 - Truth and Bone 06.mp3",
      "07 - Truth and Bone 07.mp3",
      "08 - Truth and Bone 08.mp3",
      "09 - Truth and Bone 09.mp3",
      "10 - Truth and Bone Credits.mp3",
    ],
    Image: "https://www.bigfinish.com/image/release/1985/medium.jpg",
    bfUrl:
      "https://www.bigfinish.com/releases/v/the-paternoster-gang-heritage-3-1985",
  };
  return (
    <div className="App">
      <Header branding="Big Finish Audio Library" />
      <Episode ep={selItem} />
    </div>
  );
}

export default App;
