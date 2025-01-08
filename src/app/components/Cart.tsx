"use client";
import React, { useContext } from "react";
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { TiDeleteOutline } from "react-icons/ti";
import { json } from "stream/consumers";
import { domainToASCII } from "url";

const Cart = () => {




  
  const {
    showCart,
    setshowCart,
    cartItems,
    TotalQuantity,
    TotalPrice,
    toggleCartItemQty,
    onRemove,
  } = useContext(CartContext) as {
    showCart: boolean;
    setshowCart: (value: boolean) => void;
    cartItems: number[];
    TotalQuantity: number;
    TotalPrice: number;
    toggleCartItemQty: (id: any, value: any) => void;
    onRemove: (product: any) => void;
  };

  const handleClose = () => {
    setshowCart(!showCart);
  };



  // handledCheckOut function bana rahe hein Pay to Stripe button per functunality add kerne ke liye..

  async function handledCheckOut(){
   
    try {
      const response  = await fetch('http://localhost:3000/api/check-out' , {
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body:JSON.stringify({products:cartItems})
      });

      const data = await response.json();

      if(data.url){
        window.location.href = data.url

      }
    } catch (error) {
      console.log("Error During CheckOut" , error);
      
    }

    }

  return (
    <div className="w-full h-full fixed right-0 top-0 z-10 bg-black bg-opacity-50">
      <div className="border h-full sm:w-[600px] w-full bg-white float-right relative flex flex-col">
        {/* Fixed "Your Cart" header */}
        <div className="flex items-center text-[18px] font-[500] cursor-pointer gap-[2px] px-[40px] py-[20px] bg-white border-b-[1px] border-gray-300">
          <button
            className="flex items-center gap-[10px] text-[#324d67]"
            onClick={handleClose}
          >
            <AiOutlineLeft />
            <span>Your Cart</span>
          </button>
          <span className="ml-auto text-[#f02d34]">{TotalQuantity}</span>
          <span>items</span>
        </div>

        {/* Scrollable cart items */}
        <div className="flex-1 overflow-auto px-[20px] py-[10px]">
          {cartItems.map((particularProduct: any) => (
            <div
              className="flex flex-col sm:flex-row sm:gap-[15px] gap-0 p-0 sm:p-[20px]"
              key={particularProduct._id}
            >
              <Image
                loader={() => urlFor(particularProduct.images[0]).url()}
                src={urlFor(particularProduct.images[0]).url()}
                alt={`Product Image ${0 + 1}`}
                width={200}
                height={200}
                className="object-cover w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]"
              />

              <div className="h-[150px] mt-0 sm:mt-4">
                <div className="flex flex-col justify-between text-[#324d67] flex-wrap gap-[10px]">
                  <h5 className="text-xl font-medium">
                    {particularProduct.name}
                  </h5>
                  <h4 className="text-xl">${particularProduct.price}</h4>
                </div>

                <div className="flex sm:justify-between gap-4 sm:gap-0 text-[#324d67] sm:mt-[30px] mt-2">
                  <div className="sm:p-[10px] p-[6px] flex gap-5 border-[1px] border-black items-center">
                    <span
                      className="text-red-600 cursor-pointer"
                      onClick={() =>
                        toggleCartItemQty(particularProduct._id, "minus")
                      }
                    >
                      <AiOutlineMinus />
                    </span>
                    <span>{particularProduct.quantity}</span>
                    <span
                      className="text-green-600 cursor-pointer"
                      onClick={() =>
                        toggleCartItemQty(particularProduct._id, "plus")
                      }
                    >
                      <AiOutlinePlus />
                    </span>
                  </div>

                  <button
                    type="button"
                    className="text-[24px] text-[#f02d34] cursor-pointer bg-transparent border-none"
                    onClick={() => onRemove(particularProduct)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed "Pay With Stripe" footer */}
        {cartItems.length > 0 && (
          <div className="px-[40px] py-[20px] bg-white border-t-[1px] border-gray-300">
            <div className="flex justify-between py-3">
              <h3 className="text-2xl">SubTotal</h3>
              <h3 className="text-2xl">${TotalPrice}</h3>
            </div>
            <button
              type="button"
              className="text-black p-5 text-xl font-bold w-full border-4 border-black hover:text-white hover:bg-black"
             onClick={handledCheckOut}>
              Pay With Stripe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
