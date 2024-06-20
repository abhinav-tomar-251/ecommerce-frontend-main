'use client'
import React, { useEffect, useState } from 'react';
import BackendApi from '../common';
import Link from 'next/link';
import { Product } from '@/types';

const CategoryList: React.FC = () => {
    const [categoryProduct, setCategoryProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(BackendApi.categoryProduct.url);
            const dataResponse = await response.json();
            setCategoryProduct(dataResponse.data);
        } catch (error) {
            console.error('Error fetching category products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-4 justify-between overflow-hidden scrollbar-none'>
                {loading ? (
                    categoryLoading.map((_, index) => (
                        <div
                            className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'
                            key={"categoryLoading" + index}
                        />
                    ))
                ) : (
                    categoryProduct.map((product) => (
                        <Link href={`/product-category?category=${product.category}`} className='cursor-pointer' key={product.category}>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                <img
                                    src={product.productImage[0]}
                                    alt={product.category}
                                    className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
                                />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product.category}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
