import BackendApi from "@/app/common";
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
    const response = await fetch(BackendApi.addToCartProduct.url, {
      method: BackendApi.addToCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: _id }),
    });

    const responseData: AddToCartResponse = await response.json();

    if (responseData.success) {
      toast.success(
        responseData.message || "Product added to cart successfully"
      );
    } else if (responseData.error) {
      toast.error(responseData.message || "Failed to add product to cart");
    }

    return responseData;
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("An unexpected error occurred. Please try again.");
    return {
      error: true,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};

export default addToCart;
