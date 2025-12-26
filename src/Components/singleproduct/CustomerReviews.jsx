import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CustomerReviews = ({ productId }) => {
  const API_BASE = import.meta.env.VITE_API_URL;
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add review states
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  // Edit review states
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);

  // ================= FETCH REVIEWS =================
  const fetchReviews = () => {
    if (!productId) return;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/reviewbyproduct/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => setReviews(data || []))
      .catch(() => setError("Failed to fetch reviews"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, token]);

  // ================= ADD REVIEW =================
  const handleAddReview = () => {
    if (rating === 0) return;

    const body = {
      rating,
      comment: comment.trim(),
      username: user?.username,
    };

    fetch(`${API_BASE}/reviewproduct/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}`,},
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.message || "Failed to add review");
          });
        return res.json();
      })
      .then(() => {
        fetchReviews();
        setRating(0);
        setHoverRating(0);
        setComment("");
        setShowCommentBox(false);
      })
      .catch((err) => setError(err.message));
  };

  // ================= EDIT REVIEW =================
  const handleEditReview = (rev) => {
    setEditingReviewId(rev._id);
    setEditComment(rev.comment || "");
    setEditRating(rev.rating);
  };

  const handleUpdateReview = (reviewId) => {
    const body = {
      rating: editRating,
      comment: editComment.trim(),
    };

    fetch(`${API_BASE}/updatereview/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.message || "Failed to update review");
          });
        return res.json();
      })
      .then(() => {
        fetchReviews();
        setEditingReviewId(null);
        setEditComment("");
        setEditRating(0);
      })
      .catch((err) => setError(err.message));
  };

  // ================= DELETE REVIEW =================
  const handleDeleteReview = (reviewId) => {
    fetch(`${API_BASE}/deletereview/${reviewId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.message || "Failed to delete review");
          });
        fetchReviews();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* ================= ADD REVIEW UI ================= */}
      {user && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <p className="font-semibold mb-2">Rate this product</p>

          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-2xl ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => {
                  setRating(star);
                  setShowCommentBox(true);
                }}
              >
                ★
              </span>
            ))}
          </div>

          {showCommentBox && (
            <>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment (optional)"
                className="border p-2 w-full mb-3 rounded"
              />
              <button
                onClick={handleAddReview}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit Review
              </button>
            </>
          )}
        </div>
      )}

      {/* ================= REVIEWS LIST ================= */}
      {reviews.length === 0 && !loading && <p>No reviews yet</p>}

      {reviews.map((rev) => (
        <div key={rev._id} className="p-5 bg-white shadow rounded-lg mb-4">
          {/* Display username and email */}
          <div>
            <p className="text-lg font-semibold">{rev.username || rev.user?.username || "Anonymous"}</p>
            <p className="text-sm text-gray-600">{rev.email || rev.user?.email || ""}</p>
          </div>

          <p className="text-gray-500 text-sm mt-1">
            {new Date(rev.createdAt || rev.date).toLocaleDateString()}
          </p>

          {editingReviewId === rev._id ? (
            <>
              <div className="flex gap-1 mb-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-2xl ${
                      editRating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setEditRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="border p-2 w-full mb-2 rounded"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateReview(rev._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditingReviewId(null)}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              {rev.comment && <p className="mt-2">{rev.comment}</p>}
              <p className="text-yellow-500 mt-2">
                {"★".repeat(rev.rating)}
                {"☆".repeat(5 - rev.rating)}
              </p>

                  {/* Show Edit/Delete buttons if the review belongs to the logged-in user */}
          {rev.username === user?.username && (
         <div className="mt-2 flex gap-2">
          <button
          onClick={() => handleEditReview(rev)}
           className="text-blue-500"
           >
             Edit
            </button>
            <button
            onClick={() => handleDeleteReview(rev._id)}
             className="text-red-500"
             >
            Delete
               </button>
        </div>
)}

            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomerReviews;
