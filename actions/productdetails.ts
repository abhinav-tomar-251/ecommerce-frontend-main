
import axios from 'axios';
import BackendApi from '@/app/common';
import { Product } from '@/types';

export const fetchProductDetails = async (_id: string): Promise<Product | null> => {
  try {
    const response = await axios.get(`${BackendApi.productDetails.url}/${_id}`);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const dataResponse = response.data;

    if (dataResponse.success) {
      return dataResponse.data;
    } else {
      console.error("API error:", dataResponse.message);
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
