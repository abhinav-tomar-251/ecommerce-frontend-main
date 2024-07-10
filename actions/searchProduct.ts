import axios from "axios";
import BackendApi from "@/app/common";

export const searchProduct = async (query: string) => {
  try {
    const response = await axios.get(BackendApi.searchProduct.url, {
      params: { q: query },
    });

    return response.data.data; 
  } catch (error) {
    console.error("Error searching products:", error);
    throw new Error('Error searching products. Please try again.');
  }
};