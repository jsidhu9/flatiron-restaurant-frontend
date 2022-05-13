import React from "react";
import ReviewItem from "./ReviewItem";
import Header from "./Header";
import NewReviewForm from "./NewReviewForm";

function Reviews({ reviews, onDeleteReview, addNewReview, changeReview }) {
  return (
    <>
      <Header />
      <div className="reviews-container">
        <h1 id="review-title">Reviews</h1>
        <div className="reviews">
          {Object.values(reviews).map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onDeleteReview={onDeleteReview}
              changeReview={changeReview}
            />
          ))}
        </div>
      </div>

      <NewReviewForm addNewReview={addNewReview} />
    </>
  );
}

export default Reviews;
