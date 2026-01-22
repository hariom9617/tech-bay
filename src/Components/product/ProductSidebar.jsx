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
    <div className="space-y-5">
      {/* 💰 Price Range - KEEPING OLD MUI SLIDER */}
      <div>
        <h2 className="font-bold text-gray-800 mb-2">Price Range</h2>
        <Slider
          value={priceRange}
          onChange={(e, val) => dispatch(setPriceRange(val))}
          valueLabelDisplay="auto"
          min={0}
          max={500000}
          step={500}
          sx={{ color: "#2563eb" }}
        />
      </div>

      {/* ⭐ Rating - KEEPING OLD MUI SLIDER */}
      <div>
        <h2 className="font-bold text-gray-900 mb-2">Minimum Rating</h2>
        <Slider
          value={minRating}
          onChange={(e, val) => dispatch(setMinRating(val))}
          valueLabelDisplay="auto"
          min={1}
          max={5}
          step={1}
          sx={{ color: "#facc15" }}
        />
        <div className="text-sm text-gray-600 mt-1">{minRating}★ & above</div>
      </div>

      {/* 🗂 Categories - NEW DESIGN */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.length ? (
            categories.map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <Checkbox
                  id={cat}
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={() => dispatch(toggleCategory(cat))}
                />
                <Label htmlFor={cat} className="text-sm cursor-pointer">
                  {cat}
                </Label>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">
              No categories found
            </div>
          )}
        </div>
      </div>

      {/* 🏷 Brands - NEW DESIGN */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Brands</h3>
        <div className="space-y-3">
          {brands.length ? (
            brands.map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => dispatch(toggleBrand(brand))}
                />
                <Label htmlFor={brand} className="text-sm cursor-pointer">
                  {brand}
                </Label>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">
              No brands found
            </div>
          )}
        </div>
      </div>

      {/* 📦 In Stock Only - NEW DESIGN */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="inStock"
          checked={inStockOnly}
          onCheckedChange={(checked) => dispatch(setInStock(checked))}
        />
        <Label htmlFor="inStock" className="text-sm cursor-pointer">
          In Stock Only
        </Label>
      </div>

      {/* Clear Filters - NEW DESIGN */}
      {/* <Button
        variant="outline"
        className="w-full"
        onClick={handleClearFilters}
      >
        <X className="h-4 w-4 mr-2" />
        Clear Filters
      </Button> */}
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
      <h2 className="font-semibold text-lg text-gray-900 mb-6">
        Filters
      </h2>
      <FilterContent />
    </div>
  );
};

export default ProductSidebar;