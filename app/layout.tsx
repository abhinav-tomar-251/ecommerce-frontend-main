import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "../context";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e-commerce-shop",
  description: "Created by Abhinav Tomar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <StoreProvider>
          <AppProvider>
            <ToastContainer position="top-center" />
            {children}
          </AppProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
