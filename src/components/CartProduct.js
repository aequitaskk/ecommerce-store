import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useShoppingCart } from "use-shopping-cart";

function CartProduct({ product }) {
  const { setItemQuantity, removeItem } = useShoppingCart();

  return (
    <div className="flex justify-between items-center space-x-4 hover:shadow-md hover:border-opacity-50 border border-opacity-0 rounded-md p-4 bg-white">
      <Link
        href={`/products/${product.id}`}
        className="flex items-center space-x-4 group"
      >
        <div className="relative w-20 h-20 group-hover:scale-110 transition-transform">
          <Image src={product.image} alt={product.name} fill contain />
        </div>

        <p className="font-semibold text-xl">{product.name}</p>
      </Link>

      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setItemQuantity(product.id, product.quantity - 1)}
            disabled={product.quantity <= 1}
            className="p-1 rounded-md hover:bg-rose-100 hover:text-rose-500 disabled:cursor-not-allowed"
          >
            <AiOutlineMinus className="text-sm" />
          </button>
          <p className="font-semibold text-lg">{product.quantity}</p>
          <button
            onClick={() => setItemQuantity(product.id, product.quantity + 1)}
            className="p-1 rounded-md hover:bg-rose-100 hover:text-rose-500"
          >
            <AiOutlinePlus className="text-sm" />
          </button>
        </div>
        <p className="font-semibold text-xl ">{product.formattedValue}</p>
        <button
          onClick={() => removeItem(product.id)}
          className="text-gray-500 text-sm mt-2 mr-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
