

// export function GET(){
//     return NextResponse.json({
//         data: "hello",
        
//     })
// }
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia", 
});

interface Product {
  name: string;
  price: number;
  quantity: number;
}

export const POST = async (request: Request) => {
  const { products }: { products: Product[] } = await request.json();

  // Fetch active products from Stripe
  let activeProducts = await stripe.products.list({ active: true });

  try {
    // Check and add new products if they don't exist in Stripe
    for (const product of products) {
      const matchedProduct = activeProducts?.data?.find(
        (stripeProduct) =>
          stripeProduct.name.toLowerCase() === product.name.toLowerCase()
      );

      if (!matchedProduct) {
        await stripe.products.create({
          name: product.name,
          default_price_data: {
            currency: "usd",
            unit_amount: product.price * 100,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error in creating a new product:", error);
    throw error;
  }

  // Fetch updated products from Stripe
  activeProducts = await stripe.products.list({ active: true });

  // Map products to line items for Stripe checkout
  const stripeProducts = products
    .map((product) => {
      const stripeProduct = activeProducts.data.find(
        (sp) => sp.name.toLowerCase() === product.name.toLowerCase()
      );

      if (stripeProduct && stripeProduct.default_price) {
        return {
          price: stripeProduct.default_price as string,
          quantity: product.quantity,
        };
      }

      return null;
    })
    .filter(
      (item): item is { price: string; quantity: number } => item !== null
    );

  // Create a Checkout Session
  const session = await stripe.checkout.sessions.create({
    line_items: stripeProducts,
    mode: "payment",
    success_url: `https://e-commerce-website-meme-shop-gwy4.vercel.app/success`,
    cancel_url: `https://e-commerce-website-meme-shop-gwy4.vercel.app/`,
  });

  return NextResponse.json({
    url: session.url,
  });
};
