import BackendApi from "@/app/common";
import axios from "axios";


export const fetchUserOrderDetails = async () => {
    const response = await axios(BackendApi.getOrder.url, {
      method: BackendApi.getOrder.method,
      withCredentials: true,
    });

    const responseData = await response.data;

    return responseData.data;
};
