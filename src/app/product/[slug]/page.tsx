"use client";
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
const ProductDetail = () => {
  // State for products and index
  const [products, setProducts] = useState<any[]>([]);
  const [particularProduct, setParticularProduct] = useState<any>(null);
  const [index, setIndex] = useState(0);

  // Get slug from params
  const { slug }: any = useParams();

  // Fetch data on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await client.fetch(groq`*[_type == 'product']{
        _id,
        name,
        price,
        slug,
        images,
        description
      }`);
      setProducts(fetchedProducts);

      // Find particular product
      const product = fetchedProducts.find((product: any) => product.slug.current === slug);
      setParticularProduct(product || {});
    };

    fetchProducts();
  }, [slug]);

  // Ensure `particularProduct` has loaded before rendering
  return (
    <main className="w-full md:py-16">
      {particularProduct && (
        <div className="gap-8 md:max-w-[1024px] m-auto max-w-[600px] px-4 md:px-0 grid md:grid-cols-2 grid-cols-1">
          {/* Left Box */}
          <div>
            {/* Top Image */}
            <div className="h-[450px] flex items-center mb-[25px] ">
              <Image
                loader={() => urlFor(particularProduct.images[index]).url()}
                src={urlFor(particularProduct.images[index]).url()}
                alt={particularProduct.images[index]}
                width={350}
                height={350}
                className="object-cover mx-auto"
              />
            </div>

            {/* Bottom Images */}
            <div className="flex gap-[5px] justify-center ">
              {particularProduct.images?.map((item: any, i: number) => (
                <Image
                  key={i}
                  loader={() => urlFor(particularProduct.images[i]).url()}
                  src={urlFor(particularProduct.images[i]).url()}
                  alt={particularProduct.images[i]}
                  width={220}
                  height={100}
                  className="object-cover mx-auto border h-32 rounded-xl hover:cursor-pointer"
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>

          
          
          
          
          
          
          
          {/* Right Box */}
          <div className='flex flex-col gap-8 md:pt-32 pt-0'>

<div className='flex flex-col gap-4'>
<div className='text-3xl font-bold'>{particularProduct.name}</div>
<div className='text-xl font-medium'>{particularProduct.price}
</div>
</div>



      <div className='flex gap-2 items-center'>
        <h3>Quantity</h3>

        <p className=' p-[10px] flex gap-7 border border-black  items-center '>
<span className='text-red-600'><AiOutlineMinus/></span>
<span className='text-[20px]'>1</span>
<span className='text-green-600'><AiOutlinePlus/></span>


        </p>
      </div>



{/* for button */}
<button className='text-black md:w-1/2 p-5 text-xl font-bold w-full  border-4 border-black  hover:bg-black  hover:text-white'>Add to Cart</button>


          </div>



        </div>
      )}
    </main>
  );
};

export default ProductDetail;
