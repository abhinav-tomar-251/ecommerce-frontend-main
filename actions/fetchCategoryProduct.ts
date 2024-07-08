import axios from "axios";
import BackendApi from "@/app/common";

interface CategoryWiseProductResponse {
  success: boolean;
  data: any;
  message?: string;
}

const fetchCategoryWiseProduct = async (category: string): Promise<CategoryWiseProductResponse> => {
  try {
    const response = await axios.post(
      BackendApi.categoryWiseProduct.url,
      { category },
    );

    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data.message || "Error fetching data";
      } else if (error.request) {
        errorMessage = "No response received from server";
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error fetching category wise products:", errorMessage);
    return { success: false, data: null, message: errorMessage };
  }
};

export default fetchCategoryWiseProduct;