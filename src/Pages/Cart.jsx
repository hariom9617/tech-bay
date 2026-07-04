import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addToCart,
  removeFromCart,
} from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Lock, Minus, Plus, ShieldCheck } from "lucide-react";

const CartState = ({ icon, title, subtitle, cta, onCta }) => (
  <div className="flex flex-col items-center justify-center text-center py-24 px-4">
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-50 text-brand-500 mb-6">
      {icon}
    </div>
    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    <p className="text-slate-500 mt-2 max-w-sm">{subtitle}</p>
    {cta && (
      <button
        onClick={onCta}
        className="mt-6 px-6 py-3 bg-brand-500 text-white font-semibold rounded-xl shadow-sm shadow-brand-500/30 hover:bg-brand-600 transition-colors"
      >
        {cta}
      </button>
    )}
  </div>
);

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const authLoading = useSelector((state) => state.auth.loading);

  const { items, loading: cartLoading, error } = useSelector(
    (state) => state.cart
  );

  // Fetch cart on mount if logged in
  useEffect(() => {
    if (token) dispatch(fetchCart());
  }, [token, dispatch]);

  // Safe price getter
  const getPrice = (details) => details?.price ?? 0;

  // SAFE subtotal calculation
  const subtotal = items?.reduce((sum, item) => {
    const price = getPrice(item.product_details);
    return sum + price * (item.quantity ?? 1);
  }, 0) ?? 0;

  const shipping = 15.0;
  const taxes = parseFloat((subtotal * 0.044).toFixed(2));
  const total = subtotal + shipping + taxes;

  // Always refetch cart after update
  const handleIncrease = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 })).then(() =>
      dispatch(fetchCart())
    );
  };

  const handleDecrease = (productId) => {
    dispatch(removeFromCart({ productId, quantity: 1 })).then(() =>
      dispatch(fetchCart())
    );
  };

  const handleQuantityChange = (productId, value) => {
    const currentItem = items.find((i) => i.product_id === productId);
    if (!currentItem) return;

    const diff = value - currentItem.quantity;
    if (diff > 0) {
      dispatch(addToCart({ productId, quantity: diff })).then(() =>
        dispatch(fetchCart())
      );
    } else if (diff < 0) {
      dispatch(removeFromCart({ productId, quantity: -diff })).then(() =>
        dispatch(fetchCart())
      );
    }
  };

  // UI States
  if (authLoading)
    return (
      <div className="text-center py-24 text-slate-500">
        Checking login status...
      </div>
    );
  if (!token)
    return (
      <CartState
        icon={<Lock size={40} />}
        title="Please log in"
        subtitle="Sign in to view the items in your cart and continue shopping."
        cta="Sign In"
        onCta={() => navigate("/login")}
      />
    );
  if (cartLoading)
    return (
      <div className="text-center py-24 text-slate-500">Loading cart...</div>
    );
  if (error)
    return <div className="text-center py-24 text-red-500">Error: {error}</div>;
  if (!items || items.length === 0)
    return (
      <CartState
        icon={<ShoppingCart size={40} />}
        title="Your cart is empty"
        subtitle="Looks like you haven't added anything yet. Let's find something you'll love."
        cta="Browse Products"
        onCta={() => navigate("/product")}
      />
    );

  return (
    <main className="max-w-[1300px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-slate-900 text-3xl font-black tracking-tight">
          Shopping Cart
        </h1>
        <p className="text-slate-500 mt-1">
          Review and manage items in your cart.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft divide-y divide-slate-100">
            {items.map((item) => {
              const details = item.product_details ?? {};
              const price = getPrice(details);

              return (
                <div
                  key={item.product_id}
                  className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 justify-between items-start"
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-xl bg-slate-100 shrink-0 overflow-hidden">
                      <img
                        src={details.image ?? ""}
                        alt={details.title ?? "Product"}
                        className="max-h-full max-w-full object-contain p-2"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-center gap-1">
                      <p className="text-slate-900 text-base font-semibold line-clamp-2">
                        {details.title ?? "Unknown Product"}
                      </p>
                      <p className="text-slate-500 text-sm">
                        ₹{price.toFixed(2)} each
                      </p>
                      <p className="text-slate-900 font-bold mt-1 sm:hidden">
                        ₹{(price * (item.quantity ?? 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end sm:gap-3">
                    <div className="flex items-center gap-1 rounded-full border border-slate-200 p-1">
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                        onClick={() => handleDecrease(item.product_id)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>

                      <input
                        className="text-sm font-semibold w-10 text-center bg-transparent focus:outline-0 text-slate-900"
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.product_id,
                            parseInt(e.target.value)
                          )
                        }
                      />

                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                        onClick={() => handleIncrease(item.product_id)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="hidden sm:block text-slate-900 font-bold">
                      ₹{(price * (item.quantity ?? 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-700 font-medium">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="text-slate-700 font-medium">
                  ₹{shipping.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span>Taxes</span>
                <span className="text-slate-700 font-medium">
                  ₹{taxes.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 mt-4 pt-4">
              <div className="flex justify-between font-bold text-slate-900 text-lg">
                <span>Order Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="w-full mt-6 h-12 rounded-xl bg-brand-500 text-white font-bold shadow-sm shadow-brand-500/30 hover:bg-brand-600 transition-colors"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
              <ShieldCheck size={14} />
              <span>Secure checkout • 100% protected</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
