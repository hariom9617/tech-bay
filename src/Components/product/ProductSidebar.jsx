import { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Slider from "@mui/material/Slider";
import { X, Check } from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import {
  setPriceRange,
  toggleCategory,
  toggleBrand,
  setMinRating,
  setInStock,
  clearFilters,
} from "../../redux/slices/filterSlice";

// ============================================
// UTILITY FUNCTION
// ============================================
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// ============================================
// BUTTON COMPONENT
// ============================================
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-card hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

// ============================================
// CHECKBOX COMPONENT
// ============================================
const Checkbox = forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm accent-blue-600 border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// ============================================
// LABEL COMPONENT
// ============================================
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

// ============================================
// PRODUCT SIDEBAR COMPONENT
// ============================================
const ProductSidebar = () => {
  const dispatch = useDispatch();

  const {
    priceRange,
    selectedCategories,
    selectedBrands,
    minRating,
    inStockOnly,
  } = useSelector((state) => state.filters);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // 🔹 Fetch categories from products
  useEffect(() => {
    axios
      .get("https://techbay-j8hr.onrender.com")
      .then((res) => {
        const products = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];

        const catsSet = new Set(
          products
            .flatMap((p) => {
              if (p.category)
                return Array.isArray(p.category)
                  ? p.category
                  : [p.category];
              if (p.categories) return p.categories;
              if (p.categoryName) return [p.categoryName];
              return [];
            })
            .map((c) => (typeof c === "string" ? c : c?.name))
            .filter(Boolean)
        );

        setCategories([...catsSet]);
      })
      .catch((err) => console.error("Category fetch error:", err));
  }, []);

  // 🔹 Fetch brands from products
  useEffect(() => {
    axios
      .get("https://techbay-j8hr.onrender.com/products")
      .then((res) => {
        const products = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];

        const brandSet = new Set(
          products
            .map((p) =>
              typeof p.brand === "string" ? p.brand : p.brand?.name
            )
            .filter(Boolean)
        );

        setBrands([...brandSet]);
      })
      .catch((err) => console.error("Brand fetch error:", err));
  }, []);

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* 💰 Price Range */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-slate-800">Price Range</h3>
          <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
            ₹{priceRange[1].toLocaleString()}
          </span>
        </div>
        <Slider
          value={priceRange}
          onChange={(e, val) => dispatch(setPriceRange(val))}
          valueLabelDisplay="auto"
          min={0}
          max={500000}
          step={500}
          sx={{ color: "#137fec" }}
        />
      </div>

      <div className="h-px bg-slate-100"></div>

      {/* ⭐ Rating */}
      <div>
        <h3 className="font-bold text-slate-800 mb-1">Minimum Rating</h3>
        <Slider
          value={minRating}
          onChange={(e, val) => dispatch(setMinRating(val))}
          valueLabelDisplay="auto"
          min={1}
          max={5}
          step={1}
          sx={{ color: "#f59e0b" }}
        />
        <div className="text-sm text-slate-500 mt-1">{minRating}★ & above</div>
      </div>

      <div className="h-px bg-slate-100"></div>

      {/* 🗂 Categories */}
      <div>
        <h3 className="font-bold text-slate-800 mb-3">Categories</h3>
        <div className="space-y-2.5">
          {categories.length ? (
            categories.map((cat) => (
              <div
                key={cat}
                className="flex items-center gap-2.5 rounded-lg px-1 py-1 hover:bg-slate-50 transition-colors"
              >
                <Checkbox
                  id={cat}
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={() => dispatch(toggleCategory(cat))}
                />
                <Label htmlFor={cat} className="text-sm cursor-pointer text-slate-600">
                  {cat}
                </Label>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-400">No categories found</div>
          )}
        </div>
      </div>

      <div className="h-px bg-slate-100"></div>

      {/* 🏷 Brands */}
      <div>
        <h3 className="font-bold text-slate-800 mb-3">Brands</h3>
        <div className="space-y-2.5">
          {brands.length ? (
            brands.map((brand) => (
              <div
                key={brand}
                className="flex items-center gap-2.5 rounded-lg px-1 py-1 hover:bg-slate-50 transition-colors"
              >
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => dispatch(toggleBrand(brand))}
                />
                <Label htmlFor={brand} className="text-sm cursor-pointer text-slate-600">
                  {brand}
                </Label>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-400">No brands found</div>
          )}
        </div>
      </div>

      <div className="h-px bg-slate-100"></div>

      {/* 📦 In Stock Only */}
      <div className="flex items-center gap-2.5">
        <Checkbox
          id="inStock"
          checked={inStockOnly}
          onCheckedChange={(checked) => dispatch(setInStock(checked))}
        />
        <Label htmlFor="inStock" className="text-sm cursor-pointer text-slate-600">
          In Stock Only
        </Label>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft lg:sticky lg:top-24">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-lg text-slate-900">Filters</h2>
        <button
          onClick={handleClearFilters}
          className="text-xs font-semibold text-slate-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </button>
      </div>
      <FilterContent />
    </div>
  );
};

export default ProductSidebar;