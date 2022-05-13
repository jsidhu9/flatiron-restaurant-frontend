import React from "react";
import { useState } from "react";
function NewReviewForm({ addNewReview }) {
  const blankReview = {
    name: "",
    content: "",
  };
  const [newReview, setFormData] = useState(blankReview);

  function handleTitleChange(e) {
    setFormData({
      ...newReview,
      name: e.target.value,
    });
  }

  function handleContentChange(e) {
    setFormData({
      ...newReview,
      content: e.target.value,
    });
  }

  const handleForm = (e) => {
    e.preventDefault();

    addNewReview(newReview);
    setFormData(blankReview);
  };
  return (
    <div className="form-container">
      <h2 id="add-review-header">Want to add a review?</h2>
      <form onSubmit={handleForm} className="review-form">
        <input
          type="text"
          name="title"
          value={newReview.name}
          placeholder="Insert your name here..."
          onChange={handleTitleChange}
        />
        <textarea
          type="text"
          name="content"
          placeholder="Write your review here..."
          rows={5}
          value={newReview.content}
          onChange={handleContentChange}
        />
      </form>
      <button onClick={handleForm} className="form-button" type="submit">
        Add Review
      </button>
    </div>
  );
}
export default NewReviewForm;
