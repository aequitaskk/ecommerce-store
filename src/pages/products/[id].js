import { stripe } from "@/utils/stripe";
import Image from "next/image";
import { formatCurrencyString } from "use-shopping-cart";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "react-hot-toast";

export default function ProductPage({ product }) {
  const [count, setCount] = useState(1);
  const { addItem } = useShoppingCart();

  const onAddToCart = (e) => {
    e.preventDefault();
    const id = toast.loading(`Adding ${count} item${count > 1 ? "s" : ""} ...`);
    addItem(product, { count });
    toast.success(`${count} ${product.name} added to cart!`, { id });
  };

  return (
    <div className="container lg:max-w-screen-lg mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-12">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          <Image
            src={product.image}
            alt={product.name}
            fill
            contain
            className="rounded-md shadow"
          />
        </div>

        <div className="w-full flex-1 max-w-md border border-opacity-50 rounded-md shadow-lg p-6 bg-white">
          <h2 className="text-3xl font-semibold">{product.name}</h2>
          <div className="mt-4 border-t pt-4">
            <p className="text-gray-500">Price:</p>
            <p className="text-xl font-semibold">
              {formatCurrencyString({
                value: product.price,
                currency: product.currency,
              })}
            </p>
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="text-gray-500">Description:</p>
            <p className="font-semibold">{product.description}</p>
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="text-gray-500">Quantity:</p>
            <div className="mt-1 flex items-center space-x-3">
              <button
                disabled={count <= 1}
                onClick={() => setCount(count - 1)}
                className="p-1 rounded-md hover:bg-rose-100 hover:text-rose-500 disabled:cursor-not-allowed"
              >
                <AiOutlineMinus />
              </button>
              <p className="font-semibold text-xl">{count}</p>
              <button
                onClick={() => setCount(count + 1)}
                className="p-1 rounded-md hover:bg-rose-100 hover:text-rose-500"
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>

          <button
            onClick={onAddToCart}
            className="w-full mt-4 bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-opacity-50 focus:ring-teal-600 transition duration-200 text-white text-sm px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const inventory = await stripe.products.list();
  const paths = inventory.data.map((product) => ({
    params: {
      id: product.id,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const inventory = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = inventory.data.map((product) => {
    const price = product.default_price;
    return {
      currency: price.currency,
      id: product.id,
      name: product.name,
      price: price.unit_amount,
      image: product.images[0],
      description: product.description,
    };
  });
  const product = products.find((product) => product.id === params.id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60,
  };
}
