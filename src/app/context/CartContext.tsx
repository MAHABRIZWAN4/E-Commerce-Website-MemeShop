 "use client";


import { createContext , useState } from "react";

export const CartContext = createContext({})   // create context apne under ek initila value rakhta he {} ki



// CartProvider ek component he jo ki children props leta he
export const CartProvider = ({ children }: { children: React.ReactNode }) => {


const [showCart, setshowCart]  = useState(false);





// UseState use ker rahein hein counting ke Liye..
const [count, setCount]  = useState(1);




// Ek varibale bana rahi hun kiyu ke quantity ke icon  me quantity  add ker rahe hein.

const [TotalQuantity , setTotalQuantity] = useState(0)


// Ek varibale bana rahi hun kiyu ke quantity berhne ke sath sath price bhi berhni chahiye...
const [TotalPrice , setTotalPrice] = useState(0)









const increment = () => {
    setCount((previousCount) => previousCount+1)
}


const decreament = () => {
    setCount((previousCount) => {
        if( previousCount-1 < 1) return 1;
return previousCount-1;
}
)}





// UseState use ker rahein hein cart me value ko add  or update kerne ke liye...
const [cartItems, setCartItems] = useState<any[]>([]);






// Function bana rahe hein Add to cart button me value update kerne ke liye...
const addProducts = (particularProduct:any, quantity:number) => {



// Check ker rahe hein ke jo product hum cart ke under add ker rahe hein wo item list ke under he ya nahi...Agar he to ise again cart me add nahi kerna only quantity increase kerna.
const checkProductInCart = cartItems.find((item:any) => item._id === particularProduct._id  )





// Ek varibale bana rahi hun kiyu ke quantity ke icon  me quantity  add ker rahe hein.
setTotalQuantity((prev) => prev+quantity);


// Increase Price according quantity..
setTotalPrice((prevTotalPrice) => prevTotalPrice + particularProduct.price* quantity)









if( checkProductInCart ){


const updateCartItems = cartItems.map((cartProduct:any) => {







    if(cartProduct._id === particularProduct._id  ) 
        {
       return {
        ...cartProduct,
        quantity:cartProduct.quantity  + quantity 
       }
    }
    else {
        return cartProduct;
    }
}
)

setCartItems(updateCartItems);

}else{

       // how to add quantity of particular image
       particularProduct.quantity = quantity;

       setCartItems([...cartItems, {...particularProduct}])

}

 
}






// ForToggle cart Item property
const toggleCartItemQty = (id:any, value:any) =>{
    let foundProduct = cartItems.find((item)=> item._id === id);
    const index = cartItems.findIndex((product)=>product._id === id);
    const updatedCartItems = [...cartItems];

    if(value === 'plus'){
        updatedCartItems[index] = { ...updatedCartItems[index], quantity:updatedCartItems[index].quantity + 1 }
        setCartItems([...updatedCartItems]);
        setTotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price);
        setTotalQuantity((prevTotalQty) => prevTotalQty + 1)

    }else if(value === 'minus'){
        if(foundProduct.quantity > 1 ){
            updatedCartItems[index] = { ...updatedCartItems[index], quantity:updatedCartItems[index].quantity - 1 }
            setCartItems([...updatedCartItems]);
            setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price);
            setTotalQuantity((prevTotalQty) => prevTotalQty - 1);
        }

    }

}







const onRemove = (product:any) => {
    let foundProduct = cartItems.find((item)=> item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setCartItems(newCartItems);
    setTotalPrice((prevTotal) => prevTotal - foundProduct.price*foundProduct.quantity)
    setTotalQuantity((prevTotalQty) => prevTotalQty - foundProduct.quantity);

}







return(




    // CartContext.Provider ek component he jo ki value props leta he

    <CartContext.Provider 
    value={{showCart, setshowCart, count, increment , decreament , cartItems , addProducts , TotalQuantity , TotalPrice , toggleCartItemQty , onRemove}}>


    <div>{children}</div>




    </CartContext.Provider>
)
}  

    

