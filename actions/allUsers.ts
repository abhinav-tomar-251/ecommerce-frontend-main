import BackendApi from "@/app/common";
import axios from "axios";
import { toast } from "react-toastify";



export const fetchAllUsers = async () => {
    try {
      const fetchData = await axios(BackendApi.allUser.url, {
        method: BackendApi.allUser.method,
        withCredentials: true,
      });

      const dataResponse = await fetchData.data;

      if (dataResponse.success) {
        return(dataResponse.data); 
      }

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
      toast.error("Failed to fetch users. Please try again.");
    }
  };
