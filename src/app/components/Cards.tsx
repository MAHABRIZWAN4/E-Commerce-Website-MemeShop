import { Urbanist } from "next/font/google";
import Image from "next/image";

import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["800"],
});

async function Cards() {
  const products = await client.fetch(groq`*[_type == 'product']{
    _id,
    name,
    price,
    slug,
    images,
    description
  }`);
  console.log(products);

  return (
    <div className="bg-[#F8F8F8] w-full py-12 mt-[125px]">
      <div className="md:max-w-[1024px] max-w-[600px] m-auto md:px-4 px-0">




        {/* ********************** Heading div ***************************** */}
        <div className="py-4">
          <h1 className={`${urbanist.className} text-[29px]`}>
            Best Selling Products.
          </h1>
          <h1 className="text-xl font-medium">Enjoy Up To 50%</h1>
        </div>







        {/* ********************** Product Card div ***************************** */}
        <div className="grid md:grid-cols-4 gap-x-1 grid-cols-1 sm:grid-cols-2 mt-6 gap-6">


        {products.map((product: { _id: string; name: string; price: number; slug: { current: string }; images: string[] }) => (
  <Link key={product._id} href={`/product/${product.slug.current}`}>


<div key={product._id} className="bg-white pt-10 drops-shadow-md rounded-lg overflow-hidden">
    <Image
      src={urlFor(product.images && product.images[0]).url()}
      alt={product.slug.current}
      width={220}
      height={100}
      className="object-cover h-32 mx-auto"
    />
    <div className="text-center py-10">
      <h1 className={`${urbanist.className} text-[24px]`}>{product.name}</h1>
      <h1 className={`${urbanist.className} text-[20px] text-[#9C9C9C]`}>${product.price}</h1>
    </div>
  </div>
  
  
  </Link>
))}


        </div>








      </div>
    </div>
  );
}

export default Cards;