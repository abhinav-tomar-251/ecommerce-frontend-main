'use client'
import CategoryList from '@/app/_components/CategoryList'
import Footer from '@/app/_components/Footer'
import Header from '@/app/_components/Header'
import HorizontalCardProduct from '@/app/_components/HorizontalCardProduct'
import Navbar from '@/app/_components/Navbar'
import VerticalCardProduct from '@/app/_components/VerticalCardProduct'
import { useAppContext } from '@/context'
import { useAppSelector } from '@/lib/hooks'
import { User } from '@/types'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

const HomePage = () => {

  const { fetchUserDetails, cartProductCount } = useAppContext();
  const user = useAppSelector((state) => state?.user?.user) as User;

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  
  return (
    <>
      <header className='fixed shadow-md bg-white w-full z-40'>
        <Header/>
        <Navbar/>
      </header>
      <main className='pt-28 w-full overflow-hidden scroll-smooth'>
        <CategoryList/>

      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
      {/* <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/> */}
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
      {/* <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/> */}
      </main>
      
      
      <Footer/>
    </>
  )
}

export default HomePage
