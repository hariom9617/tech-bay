import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Start Shopping",
      links: [
        { label: "Laptops", href: "/product" },
        { label: "Smartphones & Tablets", href: "/product" },
        { label: "Audio & Wearables", href: "/product" },
        { label: "Accessories", href: "/product" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/term and conditions" },
        { label: "Order Tracking", href: "/profile" },
        { label: "Returns & Refunds", href: "/profile" },
        { label: "Contact Us", href: "/term and conditions" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/term and conditions" },
        { label: "Cookie Policy", href: "/term and conditions" },
        { label: "Compliance", href: "/privacy-policy" },
      ],
    },
  ];

  const socials = [
    { Icon: Facebook, label: "Facebook" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: Instagram, label: "Instagram" },
    { Icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                >
                  <path
                    d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span className="text-xl font-extrabold text-slate-900">TechBay</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              TechBay is your premium destination for the latest technology and
              e-commerce excellence in India and beyond.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {socials.map((social) => {
                const SocialIcon = social.Icon;
                return (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-brand-500 hover:text-white transition-colors"
                  >
                    <SocialIcon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold mb-5 text-slate-900">{col.title}</h4>
              <ul className="space-y-3.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="text-slate-500 hover:text-brand-600 transition-colors"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {year} TechBay India Pvt Ltd. All rights reserved.
          </p>
          <p className="text-sm text-slate-400">
            Made with care for tech lovers 💙
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
