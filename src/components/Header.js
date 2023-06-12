import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { AiFillShopping } from "react-icons/ai";
import { useShoppingCart } from "use-shopping-cart";

function Header() {
  const { formattedTotalPrice, cartCount } = useShoppingCart();

  return (
    <header className="sticky top-0 bg-white z-10 shadow">
      <div className="container mx-auto p-6 flex justify-between">
        <Logo />
        <Link
          href="/cart"
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 pr-1"
        >
          <div className="relative flex items-center">
            {cartCount > 0 && <p className="text-lg">{formattedTotalPrice}</p>}
            <AiFillShopping className="w-8 h-8 flex-shrink-0" />
            {cartCount > 0 && (
              <p className="text-sm text-white absolute right-1 top-1 bg-rose-600 rounded-full px-1">
                {cartCount}
              </p>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
