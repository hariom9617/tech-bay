import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white  border-t border-slate-200  py-12 px-4 md:px-10 lg:px-40">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 text-primary mb-6">
            
            <span className="text-xl font-bold text-[#111418]">
              TechBay
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            TechBay is your premium destination for the latest technology and
            e-commerce excellence in India and beyond.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-slate-900">
            Start Shopping
          </h4>
          <ul className="space-y-4 text-sm text-slate-900">
            <li>
              <a className="hover:text-primary transition-colors" href="/product">
                Laptops
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="/product">
                Smartphones &amp; Tablets
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="/product">
                Audio &amp; Wearables
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="/product">
                Accessories
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-slate-900">
            Support
          </h4>
          <ul className="space-y-4 text-sm text-slate-900">
            <li>
              <a className="hover:text-primary transition-colors" href="/term and conditions">
                Help Center
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="/profile">
                Order Tracking
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="/profile">
                Returns &amp; Refunds
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="/term and conditions">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-slate-900 ">
            Legal
          </h4>
          <ul className="space-y-4 text-sm text-slate-900">
            <li>
              <a className="text-primary font-bold" href="/privacy-policy">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="/term and conditions">
                Terms of Service
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="/term and conditions">
                Cookie Policy
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors" href="privacy-policy">
                Compliance
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t items-center border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-slate-900">
          © 2023 TechBay India Pvt Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
