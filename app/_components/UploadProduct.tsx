"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "@/actions/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "@/actions/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import BackendApi from "../common";
import { toast } from "react-toastify";

interface ProductData {
  productName: string;
  brandName: string;
  category: string;
  productImage: string[];
  description: string;
  price: number;
  rating: number;
  sellingPrice: string;
}

interface UploadProductProps {
  onClose: () => void;
  fetchData: () => void;
}

const UploadProduct: React.FC<UploadProductProps> = ({
  onClose,
  fetchData,
}) => {
  const [data, setData] = useState<ProductData>({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: 0,
    rating: 0,
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileInput = document.getElementById(
      "uploadImageInput"
    ) as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const imageData = await uploadImage(file);
      if (imageData) {
        setData((prev) => ({
          ...prev,
          productImage: [...prev.productImage, imageData.secure_url],
        }));
      }
    }
  };

  const handleDeleteProductImage = (index: number) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: newProductImage,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(BackendApi.uploadProduct.url, {
        method: BackendApi.uploadProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        fetchData();
      } else {
        toast.error(
          responseData.message || "Failed to upload product. Please try again."
        );
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Failed to upload product. Please try again.");
    }
  };

  return (
    <div className=" fixed w-full h-full bg-slate-200 bg-opacity-35 top-14  left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll scrollbar-none h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter brand name"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data.productImage.length > 0 ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt={`product-${index}`}
                      width={80}
                      height={80}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-xs">
                *Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price :
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter selling price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="rating" className="mt-3">
            Rating :
          </label>
          <input
            type="number"
            id="rating"
            placeholder="Enter rating"
            value={data.rating}
            name="rating"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter product description"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button
            type="submit"
            className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700"
          >
            Upload Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
