import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'; // Рекомендую использовать lucide-react
import Link from 'next/link';
type FavoriteProductType = {
  product: {
    id: string;
    title?: string;
    price: number;
    imageUrl: string;
    category?: string;
    
  };
  size: string
  onRemove?: () => void;
  cart?:boolean
  rating: number
  title?: string
};


const FavoriteItem = ({ cart, product, size, onRemove , rating }: FavoriteProductType) => {
  
  return (
    <div className=" group relative bg-white rounded-[24px] p-4 border border-[#f0f2f5] shadow-sm hover:shadow-lg transition-all duration-300 w-65 flex flex-col">
      {/* Кнопка удаления */}
      {cart ? <button
        onClick={onRemove}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
      >
        <Trash2 size={18} />
      </button>: ''}

      {/* Изображение */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f9fafb] mb-4">
        <Link href={`/products/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        </Link>
      </div>

      {/* Информация */}
      <div className="flex-grow">
        {product.category && (
          <p className="text-[12px] text-gray-400 font-medium uppercase tracking-wider mb-1">
            {product.category}
          </p>
        )}
        <h3 className="font-semibold text-[16px] text-[#222] mb-2 line-clamp-1">
          {product.title}
        </h3>
        <p className="font-bold text-[18px] text-[#222]">
          {product.price.toLocaleString("ru-RU")} ₽
        </p>
        <p>
          <span className="text-yellow-400">
                        ★
                      </span>{rating}
        </p>
        <p>
          {size}
        </p>
      </div>

      {/* Кнопка добавления в корзину */}
      
    </div>
  );
};

export default FavoriteItem;