import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from './cartSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
