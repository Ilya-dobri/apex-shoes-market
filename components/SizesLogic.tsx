"use client";

import React, { useState } from "react";
import useCartStore from "@/store/useCartStore";

const SizesLogic = ({ product }: { product: any }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const handleAddToCart = () => {
    console.log("Клик по кнопке! Товар:", product);
  };

  return (
    <div>
      <div className="flex gap-2">
        {product.sizes.map((size: string) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`${selectedSize === size ? "bg-black text-white" : "text-gray-700"} font-semibold`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizesLogic;
