import React from 'react';
import Header from '../Components/home/Header';
import Category from '../Components/home/Category';
import FeaturedProducts from "../Components/home/FeaturedProducts";

const Home = () => {

  return (
    <div className="min-h-screen bg-slate-50">

      <Header />
      <div className="max-w-[1400px] mx-auto px-2 md:px-6 lg:px-10 py-12 space-y-16">

        <section id="categories" className="space-y-2">
          <Category />
        </section>

        <section id="featured-products" className="space-y-2">
          <FeaturedProducts />
        </section>

      </div>
    </div>
  );
};

export default Home;
