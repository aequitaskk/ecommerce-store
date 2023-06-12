import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { AiFillShopping } from "react-icons/ai";

function Header() {
  return (
    <header className="sticky top-0 bg-white z-10 shadow">
      <div className="container mx-auto p-6 flex justify-between">
        <Logo />
        <Link
          href="/cart"
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
        >
          <div className="relative">
            <AiFillShopping className="w-7 h-7 flex-shrink-0" />
          </div>
          <p className="text-lg">
            $0.00
            <span className="ml-2 text-sm text-gray-500">(0)</span>
          </p>
        </Link>
      </div>
    </header>
  );
}

export default Header;