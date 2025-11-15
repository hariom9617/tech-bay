import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";


const ProductsProduct = ({ selectedCategories = [], priceRange = [0, Infinity] }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://192.168.29.133:5002/products");

        if (Array.isArray(res.data))
         setProducts(res.data);
        else if (Array.isArray(res.data.products)) 
        setProducts(res.data.products);
        else throw new Error("Invalid API response format");

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // iska matlab he jab bhi selected categories and price range change hogi toh current page 1 hojayega  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, priceRange]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">Error: {error}</div>;

  // Helper
  const getFieldStrings = (product, keys) => {
    const out = [];
    keys.forEach((key) => {
      const val = product?.[key];
      if (!val) return;

      if (Array.isArray(val)) {
        val.forEach((v) => {
          if (typeof v === "string") out.push(v);
          else if (typeof v === "object") out.push(v.name || v.title || v.categoryName);
        });
      } else if (typeof val === "object") {
        out.push(val.name || val.title || val.categoryName);
      } else {
        out.push(val);
      }
    });
    return out.map((s) => s.trim()).filter(Boolean);
  };

  const filteredProducts = products.filter((product) => {
    const price = Number(product.price ?? 0);
    const min = priceRange[0];
    const max = priceRange[1];

    if (price < min || price > max) return false;

    if (selectedCategories.length > 0) {
      const prodCats = getFieldStrings(product, [
        "category",
        "categories",
        "categoryName",
      ]).map((c) => c.toLowerCase());

      const matches = selectedCategories.some((c) =>
        prodCats.includes(c.toLowerCase())
      );

      if (!matches) return false;
    }

    return true;
  });

  // Pagination
  const indexLast = currentPage * productsPerPage;
  const indexFirst = indexLast - productsPerPage;

  const currentProducts = filteredProducts.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);









  return (
    <>
      <div className="container mx-auto px-4 md:px-6">

        <h1 className="text-2xl font-semibold text-black mb-4 text-center">
          All Products ({filteredProducts.length})
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg"
            >
              <div className="p-4 bg-gray-100 flex items-center justify-center">
                <img
                  className="h-36 md:h-48 object-contain"
                  src={product.image}
                  alt=""
                />
              </div>

              <div className="p-4 flex flex-col">
                <h3 className="text-sm md:text-base font-bold truncate">
                  {product.title}
                </h3>

                <p className="text-lg md:text-xl font-black mt-auto">
                  ₹{product.price}
                </p>
              </div  >
              <div className="flex items-center justify-between mt-3">
                <button
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>

                <button
                  className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                >
                  <FavoriteBorderOutlined />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center my-8">
          <Pagination
            count={totalPages}             
            page={currentPage}             
            onChange={(event, value) => setCurrentPage(value)}  
            color="primary"              
            variant="outlined"            
            shape="rounded"                
            size="large"                  
          />
        </div>


      </div>
    </>
  );
};

export default ProductsProduct;