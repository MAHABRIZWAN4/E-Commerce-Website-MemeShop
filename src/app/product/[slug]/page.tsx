"use client";
import { CartContext } from "@/app/context/CartContext";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// Product type definition
type Product = {
  _id: string;
  name: string;
  price: number;
  slug: { current: string };
  images: string[];
  description: string;
};

const ProductDetail = () => {
  // State for the particular product and index
  const [particularProduct, setParticularProduct] = useState<Product | null>(null);
  const [index, setIndex] = useState(0);

  // Get slug from params
  const { slug } = useParams<{ slug: string }>();

  // Fetch data on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts: Product[] = await client.fetch(
        groq`*[_type == 'product']{
          _id,
          name,
          price,
          slug,
          images,
          description
        }`
      );

      // Find particular product
      const product = fetchedProducts.find((product) => product.slug.current === slug);
      setParticularProduct(product || null);
    };

    fetchProducts();
  }, [slug]);

  // useState for count increment and decrement
  const { count, increment, decreament , addProducts , cartItems } = useContext(CartContext) as {
    count: number;
    increment: () => void;
    decreament: () => void;
    addProducts: (particularProduct: any, quantity: number) => void;
    cartItems: number[];
  };


  
  return (
    <main className="w-full md:py-16 max-w-[7xl] mx-auto">
      {particularProduct && (
        <div className="gap-8 md:max-w-[1024px] m-auto max-w-[600px] px-4 md:px-0 grid md:grid-cols-2 grid-cols-1">
          {/* Left Box */}
          <div>
            {/* Top Image */}
            <div className="h-[450px] flex items-center mb-[25px]">
              <Image
                loader={() => urlFor(particularProduct.images[index]).url()}
                src={urlFor(particularProduct.images[index]).url()}
                alt={`Product Image ${index + 1}`}
                width={350}
                height={350}
                className="object-cover mx-auto"
              />
            </div>

            {/* Bottom Images */}
            <div className="flex gap-[5px] justify-center flex-col sm:flex-row md:ml-72 lg:ml-0">
              {particularProduct.images?.map((item, i) => (
                <Image
                  key={i}
                  loader={() => urlFor(item).url()}
                  src={urlFor(item).url()}
                  alt={`Thumbnail ${i + 1}`}
                  width={220}
                  height={100}
                  className="object-cover  mx-auto border h-32 rounded-xl hover:cursor-pointer"
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Right Box */}
          <div className="flex flex-col gap-8 md:pt-32 pt-0">
            <div className="flex flex-col gap-4">
              <div className="text-3xl font-bold">{particularProduct.name}</div>
              <div className="text-xl font-medium">${particularProduct.price}</div>
            </div>

            <div className="flex gap-2 items-center">
              <h3>Quantity</h3>
              <p className="p-[10px] flex gap-7 border border-black items-center">
                <span className="text-red-600  cursor-pointer" onClick={decreament}>
                  <AiOutlineMinus />
                </span>
                <span className="text-[20px]">{count}</span>
                <span className="text-green-600 cursor-pointer" onClick={increment}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>

            
            
            {/* Add to Cart Button */}
            <button className="text-black md:w-1/2 p-5 text-xl font-bold w-full border-4 border-black hover:bg-black hover:text-white" 
            onClick={() => addProducts(particularProduct, count)}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
