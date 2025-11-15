import React from "react";

const OrderConfirmPage = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-center whitespace-nowrap border-b border-solid border-b-slate-200 dark:border-b-slate-800 px-4 sm:px-8 lg:px-10 py-3 bg-white dark:bg-background-dark/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="w-full max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-[#111418] dark:text-white">
                <span className="material-symbols-outlined text-2xl text-primary">pacemaker</span>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Techbay</h2>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a className="text-sm font-medium leading-normal text-slate-800 dark:text-slate-300 hover:text-primary dark:hover:text-primary" href="#">Home</a>
                <a className="text-sm font-medium leading-normal text-slate-800 dark:text-slate-300 hover:text-primary dark:hover:text-primary" href="#">Products</a>
                <a className="text-sm font-medium leading-normal text-slate-800 dark:text-slate-300 hover:text-primary dark:hover:text-primary" href="#">Wishlist</a>
              </nav>
            </div>
            <div className="flex flex-1 justify-end items-center gap-4">
              <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-slate-500 flex bg-slate-100 dark:bg-slate-800 items-center justify-center pl-3 rounded-l-lg border-r-0">
                    <span className="material-symbols-outlined text-lg">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-slate-100 dark:bg-slate-800 h-full placeholder:text-slate-500 dark:placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                    placeholder="Search products..."
                    value=""
                  />
                </div>
              </label>
              <div className="flex gap-2">
                <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                  <span className="material-symbols-outlined text-xl">shopping_basket</span>
                </button>
                <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                  <span className="material-symbols-outlined text-xl">person</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="layout-content-container flex flex-col w-full max-w-3xl flex-1">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col items-center text-center gap-4 mb-8">
                <span className="material-symbols-outlined text-6xl text-success">check_circle</span>
                <div className="flex flex-col gap-2">
                  <h1 className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
                    Thank You for Your Order!
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal max-w-md">
                    Your order has been placed successfully. An email confirmation with the full details has been sent to your address.
                  </p>
                </div>
              </div>

              <div className="border-y border-solid border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-1 py-4 sm:pr-4">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Order Number</p>
                  <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">ID-589340921</p>
                </div>
                <div className="flex flex-col gap-1 py-4 sm:pl-4 border-t sm:border-t-0 sm:border-l border-solid border-slate-200 dark:border-slate-800">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Estimated Delivery</p>
                  <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">June 12, 2024 - June 15, 2024</p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-4">Order Summary</h2>
                <div className="flex flex-col gap-4 border-b border-solid border-slate-200 dark:border-slate-800 pb-6">
                  {/* Product Item 1 */}
                  <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 bg-slate-100 dark:bg-slate-800"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCaiSQx6VFjim4AhmdVl2z3Dn8b0Q-5p58nz8a6Wfq6meQ6oOyXLDsF6esby-mTcH88iRd3XmXgtypmWTlO3Kp7JOFmTWNugi5WSm18uBuyAWdmsKhZ8mnW-6uYgaakwvKy5iL0xhUQAIZS6anQuQOsHYmo16Pc8NEzUajIEpqduw8R9N1U4A4NrIvm80xu_KwTOpTE3lusZ3n4W1Vi6sZc-ZpkVo8usK6TkTXkE9N-6UJiKCOlNsZFiTi-z_y-LfrvYOWBarTxHPE")',
                        }}
                      ></div>
                      <div className="flex flex-col justify-center">
                        <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">
                          Quantum Pro Laptop
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal line-clamp-2">
                          Qty: 1
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal">$1299.00</p>
                    </div>
                  </div>

                  {/* Product Item 2 */}
                  <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 bg-slate-100 dark:bg-slate-800"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCH5MVgQwBlmkuVzWLzMV2ArKiscucxjGQ-xwTODNR5X0-EnJMTN4VN1sV6sMCwZxMIFu7Ug1d0kRxp3oD-jyDeRnARt7xXarJSX1lzuKgE0R7ab09fd1gSxybKFKLBANR3NDxWr4RNIx-GogKYLGLrWjrGOXVBPIOthjf9eHHkQx4tKLJXniYnz46SG6vUbt7Nfj7I_2yyo0Wi-5gKL-JUKxr65FjJ_f1u5BS4S3Oz3DX9oqKI-ifShFgoO2IZvw-b285X-MHnTww")',
                        }}
                      ></div>
                      <div className="flex flex-col justify-center">
                        <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">
                          Aether Wireless Buds
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal line-clamp-2">
                          Qty: 1
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal">$149.99</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <p className="text-slate-600 dark:text-slate-400">Subtotal</p>
                  <p className="text-slate-800 dark:text-slate-200">$1448.99</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-slate-600 dark:text-slate-400">Shipping</p>
                  <p className="text-slate-800 dark:text-slate-200">$10.00</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <p className="text-slate-600 dark:text-slate-400">Taxes</p>
                  <p className="text-slate-800 dark:text-slate-200">$72.45</p>
                </div>
                <div className="flex justify-between items-center text-base font-bold mt-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-slate-900 dark:text-white">Total</p>
                  <p className="text-slate-900 dark:text-white">$1531.44</p>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary" href="#">
                  <span className="material-symbols-outlined text-base">print</span>
                  Print Receipt
                </a>
                <button className="flex w-full sm:w-auto max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-6 hover:bg-primary/90 focus:ring-4 focus:ring-primary/30">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderConfirmPage;
