"use client"
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { div, main } from 'framer-motion/client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { useParams } from 'next/navigation'


const ProductDetail = async () => {


    // To Fetch Product
    const {slug}:any = useParams()
 
    



      
    // Now hum product list ko fetch karenge.
    const products = await client.fetch(groq`*[_type == 'product']{
      _id,
      name,
      price,
      slug,
      images,
      description
    }`);


    

    
      

    // Now hum product list me se ek particular product ko fetch karenge.
    const ParticularProduct = products.find((product: any) => product.slug.current === slug);
  
      



  return (
   
<main className='w-full md:py-16 bg-red-600'>


<div className='gap-8 md:max-w-[1024px] m-auto max-w-[600px] px-4 md:px-0 grid md:grid-cols-2 grid-cols-1 bg-blue-500'>


{/* Left box */}
<div className='bg-red-100'>hello
  {/* Top Image */}
<div className='h-[450px] flex items-center mb-[25px] bg-green-700'>


<Image
    loader={() => urlFor(ParticularProduct.images[0]).url()}
    src={urlFor(ParticularProduct.images[0]).url()}
    alt={ParticularProduct.images[0]}
    width={350}
    height={350}
    className='object-cover mx-auto'>
</Image>

</div>
</div>




{/* Right Box */}
<div className='bg-yellow-500'>hello</div>






</div>
</main>
  )
}

export default ProductDetail;