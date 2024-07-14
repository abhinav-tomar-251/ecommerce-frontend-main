import React from "react";
import scrollTop from "@/actions/scrollTop";
import displayINRCurrency from "@/actions/displayCurrency";
import { useAppContext } from "@/context";
import addToCart from "@/actions/addToCart";
import Link from "next/link";
import { Product } from "@/types";

interface VerticalCardProps {
  loading: boolean;
  data: Product[];
}

const VerticalCard: React.FC<VerticalCardProps> = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useAppContext();

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product, index) => (
            <div
              key={index}
              className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
            >
              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
                <div className="flex gap-3">
                  <p className="text-gray-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                  <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                </div>
                <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
              </div>
            </div>
          ))
        : data.map((product, index) => (
            <Link
              key={product._id}
              href={{
                pathname: `/ProductDetails`,
                query: { _id: product._id },
              }}
              className="w-full min-w-[280px]  md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-slate-50 rounded-sm shadow "
              onClick={scrollTop}
            >
              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                <img
                  src={product.productImage[0]}
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product.productName}
                </h2>
                <p className="capitalize text-slate-500">{product.category}</p>
                <div className="flex gap-3">
                  <p className="text-gray-600 font-medium">
                    {displayINRCurrency(product.sellingPrice)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {displayINRCurrency(product.price)}
                  </p>
                </div>
                <button
                  className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-0.5 rounded-full"
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default VerticalCard;
