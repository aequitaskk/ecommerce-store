import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

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
            <FaShoppingCart className="w-7 h-7 flex-shrink-0" />
            {cartCount > 0 && (
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm text-white absolute right-0 top-0 bg-rose-600 rounded-full px-1"
              >
                {cartCount}
              </motion.p>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
