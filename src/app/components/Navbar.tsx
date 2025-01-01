import { FiShoppingBag } from "react-icons/fi";

import { Urbanist } from 'next/font/google';
import Link from "next/link";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["800"]
});

const Navbar = () => {
  
    return (
   <nav className="h-[114px] bg-white  w-full  shadow-lg">

<div className="md:max-w-[1024px] mx-auto  max-w-[600px] px-4  md:px-0  w-full h-full flex items-center justify-between ">


<Link href="/" className={`${urbanist.className} text-[36px]`}>MemeShop</Link >

<button className="relative text-[25px]">
    <FiShoppingBag />

    <span className="absolute text-[12px] top-0 right-[-5px] bg-red-500 w-[18px] h-[18px] rounded-3xl  text-center text-white font-bold">0</span>
    </button>


</div>
</nav>
  )
}

export default Navbar
