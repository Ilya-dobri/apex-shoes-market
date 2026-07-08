import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'; // Рекомендую использовать lucide-react

type FavoriteProductType = {
  product: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    category?: string;
  };
  onRemove: () => void;
};

const FavoriteItem = ({ product, onRemove }: FavoriteProductType) => {
  return (
    <div className=" group relative bg-white rounded-[24px] p-4 border border-[#f0f2f5] shadow-sm hover:shadow-lg transition-all duration-300 w-70 flex flex-col">
      {/* Кнопка удаления */}
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
      >
        <Trash2 size={18} />
      </button>

      {/* Изображение */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f9fafb] mb-4">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
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
      </div>

      {/* Кнопка добавления в корзину */}
      <button className="mt-4 w-full flex items-center justify-center gap-2 bg-[#222] text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors">
        <ShoppingCart size={18} />
        В корзину
      </button>
    </div>
  );
};

export default FavoriteItem;