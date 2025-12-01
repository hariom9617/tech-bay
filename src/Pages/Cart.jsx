import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addToCart,
  removeFromCart,
} from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const authLoading = useSelector((state) => state.auth.loading);

  const { items, loading: cartLoading, error } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
    }
  }, []);

  if (authLoading) return <div className="p-6">Checking login status...</div>;
  if (!token) return <div className="p-6">Please log in to view your cart.</div>;
  if (cartLoading) return <div className="p-6">Loading cart...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  if (!items || items.length === 0)
    return <div className="p-6">Your cart is empty.</div>;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product_details.price * item.quantity,
    0
  );
  const shipping = 15.0;
  const taxes = parseFloat((subtotal * 0.044).toFixed(2));
  const total = subtotal + shipping + taxes;

  const handleIncrease = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleDecrease = (productId) => {
    dispatch(removeFromCart({ productId, quantity: 1 }));
  };

  const handleQuantityChange = (productId, value) => {
    const currentItem = items.find((i) => i.product_id === productId);
    if (!currentItem) return;

    const diff = value - currentItem.quantity;

    if (diff > 0) dispatch(addToCart({ productId, quantity: diff }));
    else if (diff < 0) dispatch(removeFromCart({ productId, quantity: -diff }));
  };

  return (
    <main className="">
      <div className="mt-10 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-text-primary dark:text-black text-3xl font-black leading-tight tracking-[-0.033em]">
                Shopping Cart
              </p>
              <p className="text-secondary dark:text-gray-400 text-base font-normal leading-normal">
                Review and manage items in your cart.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4 shadow-2xl">
            <div className="bg-white dark:bg-background-dark rounded-lg shadow-xl">
              {items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex flex-col sm:flex-row gap-4 px-4 py-5 justify-between items-start border-b border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4 w-full">
                    <div
                      className="bg-no-repeat aspect-square bg-cover rounded-lg h-25 w-40 flex-shrink-0"
                      style={{
                        backgroundImage: `url('${item.product_details.image}')`,
                      }}
                    ></div>

                    <div className="flex flex-1 flex-col justify-center gap-1">
                      <p className="text-text-primary dark:text-black text-base font-medium leading-normal">
                        {item.product_details.title}
                      </p>

                      <p className="text-secondary dark:text-gray-400 text-sm font-normal leading-normal">
                        ${item.product_details.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 mt-2 sm:mt-0">
                    <div className="flex items-center gap-2 text-text-primary dark:text-black">
                      <button
                        className="text-lg font-medium flex h-8 w-8 items-center justify-center rounded-full bg-background-light cursor-pointer hover:bg-gray-200"
                        onClick={() => handleDecrease(item.product_id)}
                      >
                        -
                      </button>

                      <input
                        className="text-base font-medium w-15 text-center bg-transparent focus:outline-0"
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
                        className="text-lg font-medium flex h-8 w-8 items-center justify-center rounded-full bg-background-light cursor-pointer hover:bg-gray-200"
                        onClick={() => handleIncrease(item.product_id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-background-dark rounded-lg shadow-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-text-primary border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-secondary dark:text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-secondary dark:text-gray-700">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-secondary dark:text-gray-700">
                  <span>Taxes</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                <div className="flex justify-between font-bold text-text-primary text-lg">
                  <span>Order Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="w-full mt-6 h-12 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
