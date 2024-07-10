import BackendApi from "@/app/common";
import axios from "axios";

export const fetchAdminAllProduct = async () => {
    const response = await axios.get(BackendApi.allProduct.url);
    const dataResponse = await response.data;

    return(dataResponse?.data || []);
};