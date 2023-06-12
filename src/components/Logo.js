import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/images/logo.png"
        width={48}
        height={48}
        alt="Headphone Store"
      />
      <span className="hidden sm:inline-block font-extrabold text-3xl text-gray-700">
        Headphone Store
      </span>
    </Link>
  );
}

export default Logo;
