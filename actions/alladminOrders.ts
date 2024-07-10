import axios from "axios";
import BackendApi from "@/app/common";

export const fetchOrderDetails = async () => {
  const response = await axios(BackendApi.allOrder.url, {
    method: BackendApi.allOrder.method,
    withCredentials: true,
  });

  const responseData = await response.data;
  return responseData.data;
};
