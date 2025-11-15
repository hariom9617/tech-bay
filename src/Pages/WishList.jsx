import React, { useEffect } from "react";
import Navbar from "../Component/Navbar";

import { useNavigate } from "react-router-dom";

const WishList = () => {
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !token) {
      navigate("/login");
    }
  }, [loading, token, navigate]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!token) {
    return null; // navigation will redirect
  }

  return (
    <div className="container mx-auto p-2">
      <Navbar />
      <div className="flex flex-wrap justify-between mt-10 gap-3">
        <p className="text-[#1F2937] dark:text-black text-4xl pl-5 font-black leading-tight tracking-[-0.033em] min-w-72">
          My Wishlist {user ? `(${user.name || user.username})` : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {[
          {
            name: "Apple MacBook Pro 14",
            price: "$1,999.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuASiC-9NLjaUGvaixsq0gWi62MyDSPrqabciY2ZJajLLP6nM5dQG2qpgxrGAB2RbvTZClLS5MCu93Jnj76TXd6izkn2pTAW2TcERjB89hiBujSLUrWUNBbWFX44Xsw0m8Hbma3fsUe1NGaE609EaiNO871bPW-QQcrnaeDrZaPPYpt0fHLiC0pJkgv437XBB-KEBce9Xe6ZdHM4RgyaiqurY_p_PtVq8HegEdaJ7uP2J7sMULxlfm0ujHrsKQsK0p-tk6u7QUK3JgQ",
          },
          {
            name: "Pixel 8 Pro",
            price: "$999.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCe9cNf6oXlCN_-eEgXPVRLEaUUQ65dr7khEs9c7WUoWku1hG_Ec2DStfdxAFIihjlBNwmRqwYNAy3HL-OTlQDrUQl9ZHp9NwhWl522nQsx_Jn_P5_UnO6ZnRzMpw7kNMaYFff7dmuG2TANfvYKNmjz0gZSoKu-2pfSviOa6gbgIPD_6F8MJ_KPQwHsMUoqaP8VRBc2ZzrxrWguI0pFs_AXuasEWsYGMFSXMUFtizDGfVV2FedusaZ3tR49_uhk9cBpa8jLGEyFyzI",
          },
          {
            name: "Sony WH-1000XM5 Headphones",
            price: "$399.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuChyZOlP6hLAXr2wNUuAoL0tTPgpt5_JxZfa7G-AzEtUdiDi3JA8EAYwQLRPDGwuHwt0WTt89PfpV7OVc_C9KUpDhPZdsH8nlP6F7ffbNibS1yjQUghSjkwcSZx6qNdh6inWn1nrEfhDTLL3dfh29M7dqAfwVI_tcJ212G_nkxOHpiepucZPzUfQDrPyT-IgwPlo-KISIcCZrhKFEDJoi6hHI8evUgNfUFzjgYWtFwx4nBM5LKTJreF-AmqPP543MdKiU5-X9gk8Fs",
          },
          {
            name: "Galaxy Watch 6",
            price: "$299.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqt4XWxXrrcdV3F8tCXomzmBs9slTfcvds1czeX03omC8kB4SpCim8MS4mX-GsR4JgQdV2vthD2rOSFIi09xB153WuVVEMTOnLlmMrgUDCbcUormAsGS1nTv0HkthIhqTIvmtjFimWUFk1XlGDKvx16zv7og1WRtfMKIzyPg2RMChoixoQCXscaqbZbXZlRJBOpFSrh7ux-ToaOh9_x6gYAUqgF1VItqK0IIOmv3get1kA4JYZ04NHW45LfbpyK2FpZTi66DX3oBk",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 group bg-white p-3 rounded-xl shadow-md hover:shadow-lg transition-all m-5"
          >
            <div className="relative overflow-hidden rounded-xl">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.img})` }}
              ></div>
              <button
                className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white/80 text-red-500 hover:bg-white transition-all"
                title="Remove from Wishlist"
              >
                <span className="material-symbols-outlined text-lg">
                  favorite
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <p className="text-gray-800 font-semibold truncate">
                {item.name}
              </p>
              <p className="text-gray-500 text-sm">{item.price}</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
