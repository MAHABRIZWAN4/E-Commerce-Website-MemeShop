import React from 'react'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import HeroSection from './hero-section/page';
import Products from './products/page';



export default async function page() {
  const products = await client.fetch(groq`*[_type == 'product']`)
  console.log(products);
  
  return (
   <main className='max-w-[7xl] mx-auto'>
    <HeroSection/>
    <Products/>
   </main>
  )
}
