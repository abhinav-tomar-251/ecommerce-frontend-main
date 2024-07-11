
import CategoryList from "@/app/_components/CategoryList";
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import HorizontalCardProduct from "@/app/_components/HorizontalCardProduct";
import Navbar from "@/app/_components/Navbar";
import VerticalCardProduct from "@/app/_components/VerticalCardProduct";
import React from "react";

const HomePage = () => {
  

  return (
    <>
      <header className="fixed shadow-md bg-white w-full z-40">
        <Header />
        <Navbar />
      </header>
      <main className="pt-28 w-full overflow-hidden scroll-smooth">
        <CategoryList />

        <HorizontalCardProduct
          category={"airdopes"}
          heading={"Top's Airdopes"}
        />
        <HorizontalCardProduct
          category={"watches"}
          heading={"Popular's Watches"}
        />

        <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
        <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
        <VerticalCardProduct
          category={"camera"}
          heading={"Camera & Photography"}
        />
        <VerticalCardProduct category={"earphones"} heading={"Earphones"} />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
