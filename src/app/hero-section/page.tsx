"use client"
import Image from "next/image";

import { motion } from "framer-motion";



// Make Variant Varible 
const variants = {
    hidden:{x:0,y:70,opacity:0.25},
    visible:{x:0,y:-10,opacity:1, transition:{delay:0.05}},
}





const HeroSection = () => {
    

  return (
    <div className="w-full md:h-[350px] h-[250px] flex items-center ">
      
      <div className="h-full md:max-w-[1024px] max-w-[600px] mx-auto flex items-center justify-center relative px-4 md:px-0">


<div className="object-cover ">

<Image src="/heroBanner.png" alt="HeroBanner" height={100} width={1400}/>

</div>


<div className="absolute md:mt-[310px] mt-[160px]">

{/* Wrap  this image into Framer Motion */}
<motion.div
initial="hidden"
animate="visible"
variants={variants} 
><Image src="/heroAirpods.png" alt="HeroAirpods" height={100} width={700}/></motion.div>

</div>



      </div>
    </div>
  )
}

export default HeroSection;
