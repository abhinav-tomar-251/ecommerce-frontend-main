import BackendApi from "@/app/common";
import axios from "axios";
import { toast } from "react-toastify";

interface AddToCartResponse {
  success?: boolean;
  error?: boolean;
  message?: string;
}


const addToCart = async (
  e: React.MouseEvent | React.FormEvent,
  _id: string
): Promise<AddToCartResponse> => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    const response = await axios.post(BackendApi.addToCartProduct.url, {
      productId: _id
    }, {
      withCredentials: true, 
    });

    const responseData: AddToCartResponse = response.data;

    if (responseData.success) {
      toast.success(
        responseData.message || 'Product added to cart successfully'
      );
    } else if (responseData.error) {
      toast.error(responseData.message || 'Failed to add product to cart');
    }

    return responseData;
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error('An unexpected error occurred. Please try again.');
    return {
      error: true,
      message: 'An unexpected error occurred. Please try again.'
    };
  }
};

export default addToCart;
