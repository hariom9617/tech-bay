import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Component/Navbar";

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://192.168.29.133:5002/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log("Error loading product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center mt-10">No products available</div>;

  return (<>
    <Navbar></Navbar>
     <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-10 bg-white p-8 rounded-xl shadow-lg">

        <div className="flex-1 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-80 h-80 object-contain rounded-lg  shadow-sm hover:scale-105 transition-transform"
            />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-gray-600 text-base leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
              key={i}
              className={`material-symbols-outlined text-yellow-500`}
              style={{
                  fontSize: 22,
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                {i < Math.round(product.rating) ? "star" : "star_border"}
              </span>
            ))}
            <span className="text-gray-500 text-sm ml-1">{product.rating} / 5</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-green-600">₹{product.price}</span>
            <span className="text-gray-400 line-through">₹{product.original_price}</span>
            {product.discountPercentage && (
              <span className="text-sm font-semibold text-red-500">
                ({product.discountPercentage}% OFF)
              </span>
            )}
          </div>

          <div className="text-sm text-gray-700 space-y-1">
            <p><span className="font-semibold">Brand:</span> {product.brand}</p>
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p>
              <span className="font-semibold">Availability:</span>{" "}
              {product.inStock ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
            <button className="flex-1 bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-600 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

    </div>
                </>
  );
};

export default SingleProductPage;