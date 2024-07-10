"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";
import VerticalCard from "@/app/_components/VerticalCard";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import Header from "@/app/_components/Header";
import {searchProduct} from "@/actions/searchProduct";

const ProductSearch: React.FC = () => {

  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchedProduct = await searchProduct(q || "");
        setData(searchedProduct);
      } catch (error) {
        console.error("Error fetching searched products:", error);
        setError("Error fetching searched products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (q) {
      fetchData();
    }
  }, [q]);

  return (
    <>
      <header className="fixed shadow-md bg-white w-full z-40">
        <Header />
        <Navbar />
      </header>
      <main className="pt-28 w-full overflow-hidden scroll-smooth">
        <div className="container mx-auto p-4">
          {loading && <p className="text-lg text-center">Loading ...</p>}

          <p className="text-lg font-semibold my-3">
            Search Results: {data?.length}
          </p>

          {data?.length === 0 && !loading && (
            <p className="bg-white text-lg text-center p-4">
              No Data Found....
            </p>
          )}

          {data?.length !== 0 && !loading && (
            <VerticalCard loading={loading} data={data} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductSearch;