import React from "react";
import Header from "./Header";
let HomeImg = require("../images/home-img.jpg");

function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <img id="home-img" src={HomeImg}></img>
        <p id="home-content">
          Flatiron Restaurant
        </p>
      </div>
    </>
  );
}

export default Home;