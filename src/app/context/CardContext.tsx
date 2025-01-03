 "use client";


import { createContext , useState } from "react";

export const CartContext = createContext({})   // create context apne under ek initila value rakhta he {} ki



// CartProvider ek component he jo ki children props leta he
export const CartProvider = ({children}:any) => {

const [showCart, setshowCart]  = useState(false);





// UseState use ker rahein hein counting ke Liye..
const [count, setCount]  = useState(1);




const increment = () => {
    setCount((previousCount) => previousCount+1)
}


const decreament = () => {
    setCount((previousCount) => {
        if( previousCount-1 < 1) return 1;
return previousCount-1;
}
)}


return(




    // CartContext.Provider ek component he jo ki value props leta he

    <CartContext.Provider 
    value={{showCart, setshowCart, count, increment , decreament}}>


    <div>{children}</div>




    </CartContext.Provider>
)
}  

    

