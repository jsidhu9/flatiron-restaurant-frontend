import "./App.css";
import Reviews from "./components/Reviews";
import Home from "./components/Home";
import Menu from "./components/Menu";
import React, { useState, useEffect } from "react";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [menu, setMenu] = useState([]);
  const [reviews, setReviews] = useState({});

  function handleRenderMenu(data) {
    setMenu(data);
  }

  function handleRenderReviews(data) {
    setReviews(data.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}));
  }

  function handleCartClick(id, cart, price) {
    setMenu(
      menu.map((item) => (id === item.id ? { ...item, isCart: cart } : item))
    );
  }

  function onDeleteReview(id) {
    //const updatedReviews = reviews.filter((review) => review.id !== id);
    const updatedReviews = { ...reviews };
    delete updatedReviews[id];
    setReviews(updatedReviews);
  }

  // function onChangeReview(changedReview) {
  //   // const changedReviews = reviews.map((review) => {
  //   //   if (review.id === changedReview.id) {
  //   //     return changedReview;
  //   //   } else {
  //   //     return review;
  //   //   }
  //   // };
  //   const updatedReviews = { ...reviews };
  //   updatedReviews[changedReview.id] = changedReview;
  //   setReviews(updatedReviews);
  // }

  const updateReview = (review, method) => {
    fetch(
      `http://localhost:9292/reviews${
        method === "PATCH" ? `/${review.id}` : ""
      }`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      }
    )
      .then((res) => res.json())
      .then((data) => setReviews({ ...reviews, [data.id]: data }));
  };

  const addNewMenuItem = (e) => {
    fetch("http://localhost:9292/menu_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    })
      .then((res) => res.json())
      .then(setMenu([...menu, e]));
  };

  useEffect(() => {
    fetch("http://localhost:9292/menu_items")
      .then((res) => res.json())
      .then(handleRenderMenu);
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/reviews")
      .then((res) => res.json())
      .then(handleRenderReviews);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="menu"
            element={
              <Menu
                menu={menu}
                addNewMenuItem={addNewMenuItem}
                handleCartClick={(id) => handleCartClick(id, true)}
              />
            }
          />
          <Route
            exact
            path="reviews"
            element={
              <Reviews
                reviews={reviews}
                addNewReview={(review) => updateReview(review, "POST")}
                changeReview={(review) => updateReview(review, "PATCH")}
                onDeleteReview={onDeleteReview}
                //onChangeReview={onChangeReview}
              />
            }
          />
          <Route
            exact
            path="cart"
            element={
              <Cart
                menu={menu.filter((item) => item.isCart)}
                handleClick={(id) => handleCartClick(id, false)}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
