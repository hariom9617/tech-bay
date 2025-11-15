import React, { useState } from "react";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#1F2937] dark:text-gray-200 min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-center whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-10 py-5">
        <div className="flex items-center gap-4">
          <div className="text-primary text-2xl">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-[#1F2937] dark:text-white">
            Techbay
          </h2>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="w-full max-w-6xl">
          {/* Steps */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center gap-2 sm:gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-gray-700/50 px-4">
                <span className="material-symbols-outlined text-base">
                  check
                </span>
                <p>Shipping</p>
              </div>
              <div className="h-px w-8 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary px-4 text-white">
                <p>Payment</p>
              </div>
              <div className="h-px w-8 bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-gray-700/50 px-4">
                <p>Confirmation</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Payment Details Column */}
            <div className="flex flex-col">
              <div className="flex min-w-72 flex-col gap-2 mb-8">
                <h1 className="text-[#1F2937] dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
                  Payment Method
                </h1>
                <p className="text-[#6B7280] dark:text-gray-400 text-base font-normal leading-normal">
                  All transactions are secure and encrypted.
                </p>
              </div>

              {/* Radio List */}
              <div className="flex flex-col gap-4">
                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-lg border-2 border-solid p-4 ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-gray-300 dark:border-gray-700 hover:border-primary/50 transition-colors duration-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    className="form-radio mt-1 h-5 w-5 border-2 border-[#dbe0e6] dark:border-gray-600 text-primary focus:ring-primary focus:ring-offset-0"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <div className="flex grow flex-col">
                    <p className="text-[#1F2937] dark:text-white text-base font-medium leading-normal">
                      Credit or debit card
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        className="h-6"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp70KuoOnxJATdReMPHhstQKIl01CcZgCtYzqLWngGpsYBZdPFYlapEkW4Vrz-OjRsBkyaAozdhKD6HY-13WeJ3W55Z3A7A9b2IvKpX34ouEjWNg2rODWVvVNEKPgAF6q9VOiNO21W2Y81nFmTgqR5gZ6rRpxWkrZ2tGul301H_mvZ3aDgtyOD7w8dXLULbNdBUEjxzUlErNxHRg7vbLAFzlP8V6NDYTBH8vutX6udyhPCj3fQBEPJGJwggEkGcazOiKeRfmfCVB8"
                        alt="Visa logo"
                      />
                      <img
                        className="h-6"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQb_aFk4gQbUjRcu5nCvwO5zBrsUik7iU8yAv9WoKwaqhycR1birQtveJaduIrT_6N_jDlJGP_XFHu-d2osBl07F6SQTzO9wVpxFhA4eNSbsRKFbI15TefSjXIIKuAM_0_YAfVUvH_w9haUepBDYrUT6FCzkNo5FvODitnLal3vp_RvSwlrb8QgPRsFzwc90YVxig5qWiI7WfS_qXxsAkCqCWAGKejIK596aiBsdMZSGg--8ZKbq-AG4Gtei7mAMreHBX25oNet-s"
                        alt="Mastercard logo"
                      />
                      <img
                        className="h-6"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaLqPJpweU8rnlyzVgC5UysMz2s0mWyXgj1F5_1tC0AE0L5uIp_R0OY5sjEpm2lkDH2ar6elloBduDS9onbvbnEqnQukuULdJxdyLl52m-k1nfpp_38UY7GFwq_DNyNtYdlvGlULxIq7CDW7XuZb1sRW8_C7MLXYCocrERzp83pI-y_kMs0aTnQbQyxuW6YOBPhhsvKzMjDMtLcRQ1AE83yFztwoPdMI_Kelm1iexrxHmom9MsGD5tJ4CJsQCTRHftK0BiA1CQk-s"
                        alt="American Express logo"
                      />
                    </div>
                  </div>
                </label>

                {/* PayPal */}
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 ${
                    paymentMethod === "paypal"
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-gray-300 dark:border-gray-700 hover:border-primary/50 transition-colors duration-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    className="form-radio h-5 w-5 border-2 border-[#dbe0e6] dark:border-gray-600 text-primary focus:ring-primary focus:ring-offset-0"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                  />
                  <div className="flex grow flex-col">
                    <p className="text-[#1F2937] dark:text-white text-base font-medium leading-normal">
                      PayPal
                    </p>
                  </div>
                </label>

                {/* Google Pay */}
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 ${
                    paymentMethod === "gpay"
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-gray-300 dark:border-gray-700 hover:border-primary/50 transition-colors duration-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    className="form-radio h-5 w-5 border-2 border-[#dbe0e6] dark:border-gray-600 text-primary focus:ring-primary focus:ring-offset-0"
                    checked={paymentMethod === "gpay"}
                    onChange={() => setPaymentMethod("gpay")}
                  />
                  <div className="flex grow flex-col">
                    <p className="text-[#1F2937] dark:text-white text-base font-medium leading-normal">
                      Google Pay
                    </p>
                  </div>
                </label>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === "card" && (
                <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <label className="flex flex-col flex-1">
                    <p className="text-sm font-medium leading-normal pb-2 text-[#1F2937] dark:text-gray-300">
                      Cardholder Name
                    </p>
                    <input
                      type="text"
                      placeholder="John M. Doe"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-[#1F2937] dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#6B7280] p-3 text-base font-normal leading-normal"
                    />
                  </label>

                  <label className="flex flex-col flex-1">
                    <p className="text-sm font-medium leading-normal pb-2 text-[#1F2937] dark:text-gray-300">
                      Card Number
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9123 0000"
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-[#1F2937] dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#6B7280] p-3 pl-12 text-base font-normal leading-normal"
                      />
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                        credit_card
                      </span>
                    </div>
                  </label>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex flex-col flex-1">
                      <p className="text-sm font-medium leading-normal pb-2 text-[#1F2937] dark:text-gray-300">
                        Expiration Date (MM/YY)
                      </p>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-[#1F2937] dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#6B7280] p-3 text-base font-normal leading-normal"
                      />
                    </label>
                    <label className="flex flex-col flex-1">
                      <div className="flex items-center gap-2 pb-2">
                        <p className="text-sm font-medium leading-normal text-[#1F2937] dark:text-gray-300">
                          CVV
                        </p>
                        <span
                          className="material-symbols-outlined text-base text-[#6B7280] cursor-help"
                          title="3-4 digit number on the back of your card"
                        >
                          help_outline
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="123"
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-[#1F2937] dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#6B7280] p-3 text-base font-normal leading-normal"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Column */}
            <div className="flex flex-col">
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 lg:p-8 sticky top-8">
                <h2 className="text-xl font-bold text-[#1F2937] dark:text-white mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {/* Product 1 */}
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          className="w-16 h-16 rounded object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc9DR9zYxbwrhXjkbRvj7foms6QNP5diqmyjmBl_UMeIgstn6VOBJbfb_jmXreN7gUMS2GH-BfvRh766Mvqz9PPKL5aQ5G0LP0DyPQ8riOnZuDIYkVaAYaCHv4DH3rcltu5ll9PU-CF4wCzrfW3ZfesGLcy-hnISk4O4xfL24wqdUybk42gRQgzWamKSknCR3lB28SvKARxAbyafY9eyKR5ZMeUs__-cdWPlZIzu62tPBKcfkZg06HJtzHMwFQR8CUZ_iJmJADWBc"
                          alt="Apex Smartwatch"
                        />
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                          1
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-[#1F2937] dark:text-white">
                          Apex Smartwatch
                        </p>
                        <p className="text-sm text-[#6B7280]">
                          Color: Midnight Black
                        </p>
                      </div>
                    </div>
                    <p className="font-medium text-[#1F2937] dark:text-white">
                      $299.00
                    </p>
                  </div>

                  {/* Product 2 */}
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          className="w-16 h-16 rounded object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt9coN0H3c_Kj6ZcU5JPeRZO1n_jsH1B8QxYg7YNppsKvrx0eMf5uuc8M9PvPgcYEWGAed4XURL0SsnNE_NePT8wKA9hafFBwIv7SjtyjGuwYmv5qc4-DmAmMgo32BPJr09SQTygcSXivGzZ55RS1cqR35uQOjlDwqf3O9rP0RaGWInw8ljsoxnqMGzmM_dMT9TejXT3qH68mZGp_QHMJHwUBY5H4rsyW9qKK3hKk1Up7Y3OisvAOFLG2M_l7Ytq4MOPhozAw-UzU"
                          alt="Sonic Wireless Buds"
                        />
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                          1
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-[#1F2937] dark:text-white">
                          Sonic Wireless Buds
                        </p>
                        <p className="text-sm text-[#6B7280]">Color: White</p>
                      </div>
                    </div>
                    <p className="font-medium text-[#1F2937] dark:text-white">
                      $149.00
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3 text-sm text-[#6B7280] dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#1F2937] dark:text-white font-medium">
                      $448.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#1F2937] dark:text-white font-medium">
                      $5.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="text-[#1F2937] dark:text-white font-medium">
                      $36.24
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-baseline">
                  <span className="text-base font-medium text-[#1F2937] dark:text-white">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-[#1F2937] dark:text-white">
                    $489.24
                  </span>
                </div>

                <button className="w-full mt-8 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">lock</span> Place
                  Order
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#6B7280]">
                  <span className="material-symbols-outlined text-base">
                    verified_user
                  </span>
                  <span>Secure SSL Connection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-[#6B7280] dark:text-gray-400">
          <p>© 2024 Techbay. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentForm;
