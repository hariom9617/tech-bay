import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";


const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = debounce(async (text) => {
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `https://techbay-j8hr.onrender.com/products/search?q=${text}`
      );
      setSuggestions(res.data.products);
    } catch (error) {
      console.error("Suggestion error:", error);
    }
  }, 300);

  const handleChange = (e) => {
    const text = e.target.value;
    setQuery(text);
    setOpen(true);
    fetchSuggestions(text);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      navigate(`/product?q=${query}`);
      setOpen(false);
    }
  };

  const handleSelect = (title) => {
    navigate(`/product?q=${title}`);
    setOpen(false);
    setQuery(title);
  };

  return (
    <div ref={wrapperRef} className="relative w-full z-50">
      <input
        type="text"
        value={query}
        placeholder="Search for products, brands and more"
        onChange={handleChange}
        onKeyDown={handleEnter}
        className="
          w-full px-4 py-2 text-sm rounded-md 
          border border-gray-300 
          focus:outline-none focus:border-blue-500
          shadow-sm
        "
      />

      {open && suggestions.length > 0 && (
        <>
         
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setOpen(false)}
          ></div>

         
          <div
            className="
              fixed top-[80px] left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg 
              bg-white shadow-lg rounded-md z-50 overflow-y-auto
            "
            style={{ maxHeight: "60vh" }}
          >
            {suggestions.map((item) => (
              <div
                key={item._id}
                onClick={() => handleSelect(item.title)}
                className="
                  px-4 py-2 text-sm cursor-pointer 
                  hover:bg-gray-100 flex items-center gap-2
                "
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-8 h-8 object-contain rounded"
                />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
