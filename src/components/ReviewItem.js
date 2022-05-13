import React, { useState } from "react";

function ReviewItem({ onDeleteReview, changeReview, review }) {
  const { id, name, content } = review;
  const [editing, setEditing] = useState(false);
  const [reviewText, setReviewText] = useState(review.content);

  function handleRemoveReview() {
    fetch(`http://localhost:9292/reviews/${id}`, {
      method: "DELETE",
    });
    onDeleteReview(id);
  }

  if (editing) {
    return (
      <div className="edit-form-container">
        <h2 id="edit-review-header">Want to edit a review?</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            changeReview({ ...review, content: reviewText });
            setEditing(false);
          }}
          className="review-form"
        >
          <textarea
            type="text"
            name="content"
            rows={5}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button className="form-button" type="submit">
            Edit Review
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setReviewText(review.content);
            }}
            className="form-button"
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="review-item">
        <div className="name-content">
          <h1>{name}</h1>
          <h2>{content}</h2>
        </div>
        <div className="remove-btn">
          <button onClick={handleRemoveReview}>Remove Review</button>
        </div>
        <div className="edit-btn">
          <button onClick={() => setEditing(true)}>Edit Review</button>
        </div>
      </div>
    );
  }
}
export default ReviewItem;
