"use client";
import { FiShoppingBag } from "react-icons/fi";

import { Urbanist } from 'next/font/google';
import Link from "next/link";
import Cart from "./Cart";


import { CartContext } from "../context/CartContext";
import { useContext } from "react";
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["800"]
});

const Navbar = () => {





  const { showCart, setshowCart , TotalQuantity } = useContext(CartContext) as { showCart: boolean; setshowCart: (value: boolean) => void ; TotalQuantity:number };

  



  const handleClick = () => {
    setshowCart(!showCart)
  }







    return (

      <>
   <nav className="h-[114px] bg-white  w-full  shadow-lg">

<div className="md:max-w-[1024px] mx-auto  max-w-[600px] px-4  md:px-0  w-full h-full flex items-center justify-between ">


<Link href="/" className={`${urbanist.className} text-[36px]`}>MemeShop</Link >

<button className="relative text-[25px]" onClick={handleClick}>
    <FiShoppingBag />

    <span className="absolute text-[12px] top-0 right-[-5px] bg-red-500 w-[18px] h-[18px] rounded-3xl  text-center text-white font-bold">{TotalQuantity}</span>
    </button>


</div>
</nav>


{showCart && <Cart/>}

</>
  )
}

export default Navbar
