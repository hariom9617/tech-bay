import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import { Search } from "lucide-react";


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
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          value={query}
          placeholder="Search for products, brands and more"
          onChange={handleChange}
          onKeyDown={handleEnter}
          onFocus={() => query && setOpen(true)}
          className="
            w-full pl-11 pr-4 py-2.5 text-sm rounded-full
            bg-slate-100 border border-transparent text-slate-800 placeholder:text-slate-400
            focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
            transition-all
          "
        />
      </div>

      {open && suggestions.length > 0 && (
        <div
          className="
            absolute left-0 right-0 top-full mt-2 z-50
            bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-100
            animate-fade-up
          "
        >
          <div className="px-4 pt-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Products
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-1.5 pt-0">
            {suggestions.map((item) => (
              <div
                key={item._id}
                onClick={() => handleSelect(item.title)}
                className="
                  px-3 py-2.5 text-sm cursor-pointer rounded-xl
                  hover:bg-brand-50 flex items-center gap-3 transition-colors group
                "
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-8 h-8 object-contain"
                  />
                </span>
                <span className="text-slate-700 font-medium line-clamp-1 flex-1">
                  {item.title}
                </span>
                {item.price != null && (
                  <span className="text-sm font-bold text-slate-900 shrink-0">
                    ₹{item.price}
                  </span>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              navigate(`/product?q=${query}`);
              setOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-t border-slate-100 text-sm font-semibold text-brand-600 hover:bg-brand-50 transition-colors"
          >
            <Search size={15} />
            View all results for “{query}”
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
