import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";
import { formatCurrencyString } from "use-shopping-cart/core";

function ProductCard({ product }) {
  const { addItem } = useShoppingCart();

  const onAddToCart = (e) => {
    e.preventDefault();
    const id = toast.loading("Adding to cart...");
    addItem(product);
    toast.success(`${product.name} added to cart!`, { id });
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="border-1 shadow rounded-md group overflow-hidden bg-white"
    >
      <div className="relative w-full h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="100%"
          className="object-contain bg-white"
        />
      </div>
      <div className="px-4 pb-3 bg-white flex flex-col ">
        <div>
          <p className="font-bold text-gray-800 text-lg">{product.name}</p>
        </div>
        <div className="flex justify-between pt-4 items-center">
          <div className="ml-1">
            <p className="text-sm">Price</p>
            <p className="font-semibold">
              {formatCurrencyString({ currency: "USD", value: product.price })}
            </p>
          </div>
          <button
            onClick={onAddToCart}
            className="bg-teal-600 hover:bg-teal-700 transition duration-200 text-white text-sm px-4 py-2 rounded-lg"
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
