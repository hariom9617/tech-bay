import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fb] mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Techbay</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your one-stop shop for the latest and greatest in tech, gadgets, and electronics.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 text-xl">
                <i className="ri-facebook-circle-fill"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-xl">
                <i className="ri-instagram-fill"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-xl">
                <i className="ri-twitter-x-fill"></i>
              </a>
              <a href="https://www.linkedin.com/in/hariom-patil/" className="text-gray-600 hover:text-blue-600 text-xl">
                <i className="ri-linkedin-fill"></i>
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a className="hover:text-blue-600" href="#">Contact Us</a></li>
              <li><a className="hover:text-blue-600" href="#">FAQ</a></li>
              <li><a className="hover:text-blue-600" href="#">Shipping & Returns</a></li>
              <li><a className="hover:text-blue-600" href="#">Track Order</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a className="hover:text-blue-600" href="/profile">My Account</a></li>
              <li><a className="hover:text-blue-600" href="/wishlist">Wishlist</a></li>
              <li><a className="hover:text-blue-600" href="#">Terms & Conditions</a></li>
              <li><a className="hover:text-blue-600" href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-3">
              Subscribe to receive updates on new launches and offers.
            </p>

            <div className="flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 outline-none text-sm"
              />
              <button className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} <span className="font-semibold">Techbay</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
