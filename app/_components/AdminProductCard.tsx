import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../../actions/displayCurrency";

interface AdminProductCardProps {
  data: {
    productName: string;
    brandName: string;
    category: string;
    productImage: string[];
    description: string;
    price: number;
    sellingPrice: number;
  };
  fetchdata: () => void;
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({
  data,
  fetchdata,
}) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleEditProduct = () => {
    setEditProduct(true);
  };

  const handleCloseEdit = () => {
    setEditProduct(false);
  };

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full"
            alt={data.productName}
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

        <div>
          <p className="font-semibold">
            {displayINRCurrency(data.sellingPrice)}
          </p>

          <div
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={handleEditProduct}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={handleCloseEdit}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
