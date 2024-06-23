'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BackendApi from '@/app/common';
import { Product } from '@/types';
import VerticalCard from '@/app/_components/VertcalCard';

const ProductSearch: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { q } = searchParams.get('search') ? { q: searchParams.get('q') } : { q: '' };
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);


  console.log(q)
  const fetchProduct = async () => {
    if (!q) return;

    setLoading(true);
    try {
      const response = await fetch(`${BackendApi.searchProduct.url}?search=${encodeURIComponent(q as string)}`);
      const dataResponse = await response.json();
      console.log(dataResponse);
      console.log(dataResponse.data)
      setData(dataResponse.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [q]);

  return (
    <div className="container mx-auto p-4">
      {loading && (
        <p className="text-lg text-center">Loading ...</p>
      )}

      <p className="text-lg font-semibold my-3">Search Results: {data.length}</p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No Data Found....</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default ProductSearch;
