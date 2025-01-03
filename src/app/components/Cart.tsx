"use client";
import React, { useContext } from 'react'
import { AiOutlineLeft } from 'react-icons/ai';
import { CartContext } from '../context/CardContext';

const Cart = () => {




  const {showCart, setshowCart}:any = useContext(CartContext);
  



  const handleClose = () => {
    setshowCart(!showCart)
  }







  return (
    <div className='w-[100vw] bg-black bg-opacity-50  fixed right-0 top-0 z-10'>
        <div className='border h-[100vh]  w-[600px] bg-white  float-right px-[40px] py-[50px] relative'>




<button className='flex items-center text-[18px] font-[500] cursor-pointer gap-[2px] ml-[10px] border-none bg-[transparent]' onClick={handleClose}>
<AiOutlineLeft/>

<span className=' ml-[10px]'>Your Cart</span>
<span className=' ml-[10px] text-[#f02d34]'>0</span>

</button>





        </div>
    </div>
  )
}

export default Cart;
