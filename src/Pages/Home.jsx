import React from 'react'
// import Navbar from '../Components/layout/Navbar';
import Header from '../components/home/Header';
import FeaturedProducts from "../Components/home/FeaturedProducts";
import Category from "../Components/home/Category";
import TrustedCompanies from "../Components/home/TrustedCompanies";
import Footer from '../Components/layout/Footer';

const Home = () => {
  
  return (
 <div className="min-h-screen bg-gray-100">
  {/* <Navbar /> */}
  


  <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
    <Header />
    <Category></Category>
    <FeaturedProducts></FeaturedProducts>
    <TrustedCompanies></TrustedCompanies>
    <Footer />
  </div>
</div>

  )
}

export default Home;