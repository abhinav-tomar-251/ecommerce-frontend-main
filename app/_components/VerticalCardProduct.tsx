"use client";

import React, { useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "@/actions/fetchCategoryProduct";
import displayINRCurrency from "@/actions/displayCurrency";
import Link from "next/link";
import addToCart from "@/actions/addToCart";
import { useAppContext } from "@/context";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Product } from "@/types";

interface VerticalCardProductProps {
  category: string;
  heading: string;
}

const VerticalCardProduct: React.FC<VerticalCardProductProps> = ({
  category,
  heading,
}) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState<number>(0);
  const scrollElement = useRef<HTMLDivElement>(null);

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
          className=" p-1 absolute -left-2 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <SlArrowLeft />
        </button>
        <button
          className=" p-1 absolute right-2 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <SlArrowRight />
        </button>
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-md shadow"
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-gray-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                    <p className="text-slate-400 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  </div>
                  <button className="text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                key={product?._id}
                href={{
                  pathname: `/ProductDetails`,
                  query: { _id: product._id },
                }}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-md shadow"
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    alt={product?.productName}
                  />
                </div>
                <div className="p-4 grid gap-3">
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

export default VerticalCardProduct;
