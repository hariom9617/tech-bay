const CustomerReviews = () => {
  const reviews = [
    {
      name: "Alex Johnson",
      date: "March 15, 2024",
      rating: 5,
      text: "Incredible phone with amazing performance and battery life!"
    },
    {
      name: "Samantha Lee",
      date: "March 12, 2024",
      rating: 4,
      text: "Pretty good overall. Only wished for a better camera."
    }
  ];

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {reviews.map((rev, idx) => (
        <div key={idx} className="p-5 bg-white shadow rounded-lg mb-4">
          <p className="font-semibold">{rev.name}</p>
          <p className="text-gray-500 text-sm">{rev.date}</p>
          <p className="mt-2">{rev.text}</p>
          <p className="text-yellow-500 mt-2">
            {"⭐".repeat(rev.rating)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CustomerReviews;
