"use client";

import { createContext, useState } from "react";

// Define a Product interface
interface Product {
  _id: string;
  price: number;
  quantity?: number;
}

export const CartContext = createContext({});




export const CartProvider = ({ children }: { children: React.ReactNode }) => {



  const [showCart, setshowCart] = useState(false);
  const [count, setCount] = useState(1);



  const [TotalQuantity, setTotalQuantity] = useState(0);
  const [TotalPrice, setTotalPrice] = useState(0);



  const [cartItems, setCartItems] = useState<Product[]>([]); // cartItems ka use kia



  
  const increment = () => setCount((previousCount) => previousCount + 1);
  const decreament = () =>
    setCount((previousCount) => (previousCount - 1 < 1 ? 1 : previousCount - 1));




  const addProducts = (particularProduct: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === particularProduct._id
    );




    setTotalQuantity((prev) => prev + quantity); // Total Quantity update ho rahi hai
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice + particularProduct.price * quantity // Total Price update ho rahi hai
    );




    if (checkProductInCart) {
      const updateCartItems = cartItems.map((cartProduct) =>
        cartProduct._id === particularProduct._id
          ? { ...cartProduct, quantity: cartProduct.quantity! + quantity }
          : cartProduct
      );


      setCartItems(updateCartItems); // cart items ko update kia
    } else {
      const productWithQuantity = { ...particularProduct, quantity };
      setCartItems([...cartItems, productWithQuantity]); // naye product ko cart mein add kia
    }
  };





  const toggleCartItemQty = (id: string, value: "plus" | "minus") => {
    const foundProduct = cartItems.find((item) => item._id === id); // existing product ko check kia
    const index = cartItems.findIndex((product) => product._id === id);
    const updatedCartItems = [...cartItems];




    if (value === "plus") {
      updatedCartItems[index] = {
        ...updatedCartItems[index],
        quantity: updatedCartItems[index].quantity! + 1,
      };




      setCartItems([...updatedCartItems]); // cart items ko update kia
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct!.price); // price ko update kia
      setTotalQuantity((prevTotalQty) => prevTotalQty + 1); // quantity ko update kia
    }
    
    
    
    
    else if (value === "minus") {
      
      
        if (foundProduct!.quantity! > 1) {
        updatedCartItems[index] = {
          ...updatedCartItems[index],
          quantity: updatedCartItems[index].quantity! - 1,
        };
        setCartItems([...updatedCartItems]); // cart items ko update kia
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct!.price); // price ko update kia
        setTotalQuantity((prevTotalQty) => prevTotalQty - 1); // quantity ko update kia
      }
    }
  };




  const onRemove = (product: Product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id); // product ko find kia
    const newCartItems = cartItems.filter((item) => item._id !== product._id); // us product ko remove kia

    setCartItems(newCartItems); // cart items ko update kia
    setTotalPrice(
      (prevTotal) => prevTotal - foundProduct!.price * foundProduct!.quantity!
    ); // total price ko update kia
    setTotalQuantity(
      (prevTotalQty) => prevTotalQty - foundProduct!.quantity!
    ); // total quantity ko update kia
  };




  
  return (
    <CartContext.Provider
      value={{
        showCart,
        setshowCart,
        count,
        increment,
        decreament,
        cartItems,
        addProducts,
        TotalQuantity,
        TotalPrice,
        toggleCartItemQty,
        onRemove,
      }}
    >
      <div>{children}</div>
    </CartContext.Provider>
  );
};
