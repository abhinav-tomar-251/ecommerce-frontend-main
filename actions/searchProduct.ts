'use client'
import BackendApi from '@/app/common';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  

  const searchProduct = async () => {
    if (!q) return;
    try {
   
      const response = await axios.get(`${BackendApi.searchProduct.url}`, {
        params: { q },
      });
      return(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    searchProduct();
  }, [q]);

  export default searchProduct

