"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BackendApi from "@/app/common";
import { FaRegStar, FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";
import displayINRCurrency from "@/actions/displayCurrency";
import CategroyWiseProductDisplay from "@/app/_components/CategoryWiseProducts";
import addToCart from "@/actions/addToCart";
import { useAppContext } from "@/context";
import { Product } from "@/types";
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import axios from "axios";

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const _id = searchParams.get("_id");

  const [data, setData] = useState<Product>({
    _id: "",
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: 0,
    rating: 0,
    sellingPrice: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState<string>("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useAppContext();

  const fetchProductDetails = async (_id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BackendApi.productDetails.url}/${_id}`,
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataResponse = response.data;

      if (dataResponse.success) {
        setData(dataResponse.data);
        setActiveImage(dataResponse.data.productImage[0]);
      } else {
        console.error("API error:", dataResponse.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (_id) {
      fetchProductDetails(_id);
    }
  }, [_id]);

  const handleMouseEnterProduct = (imageURL: string) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      setZoomImage(true);
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({ x, y });
    },
    []
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    _id?: string
  ) => {
    if (_id) {
      await addToCart(e, _id);
      fetchUserAddToCart();
    }
  };

  const handleBuyProduct = async (
    e: React.MouseEvent<HTMLButtonElement>,
    _id?: string
  ) => {
    if (_id) {
      await addToCart(e, _id);
      fetchUserAddToCart();
      router.push("/Cart");
    }
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars ;

    for (let i = 1; i <= totalStars; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={`star-${i}`} />);
      } else if (i === Math.ceil(rating) && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={`star-${i}`} />);
      } else {
        stars.push(<FaRegStar key={`star-${i}`} />);
      }
    }

    return stars;
  };

  return (
    <>
      <header className="fixed shadow-md bg-white w-full z-40">
        <Header />
        <Navbar />
      </header>
      <main className="pt-28 w-full overflow-hidden scroll-smooth">
        <div className="container mx-auto p-4">
          <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
            {/* Product Image */}
            <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
              <div className="h-[300px] w-[300px] rounded-md lg:h-96 lg:w-96 bg-slate-200 relative p-2">
                <img
                  src={activeImage}
                  className="h-full w-full object-scale-down mix-blend-multiply"
                  onMouseMove={handleZoomImage}
                  onMouseLeave={handleLeaveImageZoom}
                />

                {/* Product Zoom */}
                {zoomImage && (
                  <div className="hidden md:block absolute min-w-[400px] overflow-hidden min-h-[300px] bg-slate-200 p-1 -right-[420px] top-5 rounded-md">
                    <div
                      className="w-full h-full min-h-[300px] min-w-[400px] mix-blend-multiply scale-150"
                      style={{
                        background: `url(${activeImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                          zoomImageCoordinate.y * 100
                        }% `,
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="h-full">
                {loading ? (
                  <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                    {productImageListLoading.map((product, index) => (
                      <div
                        className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                        key={"loadingImage" + index}
                      ></div>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                    {data?.productImage?.map((imgURL, index) => (
                      <div
                        className="h-20 w-20 bg-slate-200 rounded p-1"
                        key={imgURL}
                      >
                        <img
                          src={imgURL}
                          className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                          onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                          onClick={() => handleMouseEnterProduct(imgURL)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            {loading ? (
              <div className="grid gap-1 w-full">
                <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
                <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full"></h2>
                <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>

                <div className="text-gray-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full"></div>

                <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
                  <p className="text-gray-600 bg-slate-200 w-full"></p>
                  <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
                </div>

                <div className="flex items-center gap-3 my-2 w-full">
                  <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
                  <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
                </div>

                <div className="w-full">
                  <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></p>
                  <p className="bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full"></p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <p className="bg-gray-200 text-gray-600 px-2 rounded-full inline-block w-fit">
                  {data?.brandName}
                </p>
                <h2 className="text-2xl lg:text-4xl font-medium">
                  {data?.productName}
                </h2>
                <p className="capitalize text-slate-400">{data?.category}</p>

                <div className="text-gray-600 flex items-center gap-1">
                  {renderStarRating(data?.rating)} <span>{data?.rating}</span>
                </div>

                <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
                  <p className="text-gray-600">
                    {displayINRCurrency(data?.sellingPrice)}
                  </p>
                  <p className="text-slate-400 line-through">
                    {displayINRCurrency(data?.price)}
                  </p>
                </div>

                <div className="flex items-center gap-3 my-2">
                  <button
                    className="border-2 border-gray-600 rounded px-3 py-1 min-w-[120px] text-gray-600 font-medium hover:bg-gray-600 hover:text-white"
                    onClick={(e) => handleBuyProduct(e, data?._id)}
                  >
                    Buy
                  </button>
                  <button
                    className="border-2 border-gray-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-gray-600 hover:text-gray-600 hover:bg-white"
                    onClick={(e) => handleAddToCart(e, data?._id)}
                  >
                    Add To Cart
                  </button>
                </div>

                <div>
                  <p className="text-slate-600 font-medium my-1">
                    Description:
                  </p>
                  <p>{data?.description}</p>
                </div>
              </div>
            )}
          </div>

          {data?.category && (
            <CategroyWiseProductDisplay
              category={data?.category}
              heading={"Recommended Product"}
              excludeProductId={data._id}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
