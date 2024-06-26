"use client";
import React, { useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "@/actions/fetchCategoryProduct";
import displayINRCurrency from "@/actions/displayCurrency";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Link from "next/link";
import addToCart from "@/actions/addToCart";
import { useAppContext } from "@/context";
import { Product } from "@/types";

interface HorizontalCardProductProps {
  category: string;
  heading: string;
}

const HorizontalCardProduct: React.FC<HorizontalCardProductProps> = ({
  category,
  heading,
}) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState<number>(0);
  const scrollElement = useRef<HTMLDivElement | null>(null);

  const { fetchUserAddToCart } = useAppContext();

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    _id: string
  ) => {
    await addToCart(e, _id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft += 300;
    }
  };
  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft -= 300;
    }
  };

  return (
    <div className="container mx-auto px-4 my-6 relative rounded-md">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="  p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <SlArrowLeft />
        </button>
        <button
          className="  p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <SlArrowRight />
        </button>

        {loading
          ? loadingList.map((product, index) => (
              <div
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-md shadow flex"
                key={`categoryLoading${index}`}
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                <div className="p-4 grid w-full gap-2">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                  <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                  <div className="flex gap-3 w-full">
                    <p className="text-gray-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    <p className="text-slate-400 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                  </div>
                  <button className="text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                href={{
                  pathname: `/ProductDetails`,
                  query: { _id: product._id },
                }}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-md shadow flex"
                key={product?._id}
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="object-scale-down h-full hover:scale-110 transition-all"
                  />
                </div>
                <div className="p-4 grid">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-gray-600 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-400 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-0.5 rounded-full"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
