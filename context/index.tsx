"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import BackendApi from "@/app/common";
import { setUserDetails } from "../lib/store/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { User } from "@/types";

interface AppContextProps {
  fetchUserDetails: () => Promise<void>;
  cartProductCount: number;
  fetchUserAddToCart: () => Promise<void>;
}

const AppContext = createContext<AppContextProps | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const dispatch = useAppDispatch();

  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(BackendApi.current_user.url, {
      method: BackendApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(BackendApi.addToCartProductCount.url, {
      method: BackendApi.addToCartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <AppContext.Provider
      value={{ fetchUserDetails, cartProductCount, fetchUserAddToCart }}
    >
      {children}
    </AppContext.Provider>
  );
};
