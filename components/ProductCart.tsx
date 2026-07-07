import React from 'react'
import ProductActions from './ProductActions';
import Link from 'next/link';

// Убрали 'use client', убрали 'async', убрали импорты Firebase
const ProductCart = ({ product }: any) => {
  return (
    <div className='flex flex-col'>
      <div className="max-w-4xl mx-auto p-8">
      <Link href="/catalog" className="text-gray-500 hover:text-black mb-6 inline-block">
        ← Назад в каталог
      </Link>
      
      <div className="md:grid md:grid-cols-2 gap-8 items-start">
        {/* Картинка */}
        <div className="bg-[#F8F9FA] rounded-[24px] p-8 flex items-center justify-center">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Информация */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-400 mb-2">Артикул: {product.id}</p>
          <h1 className="text-3xl font-bold uppercase text-gray-900 mb-4">
            {product.name}
          </h1>
          
          <div className="text-2xl font-extrabold text-gray-900 mb-6">
            {product.price.toLocaleString('uk-UA')} 
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-400">★</span>
            <span className="font-bold">{product.rating}</span>
          </div>

          <div>
          </div>
          
          {/* Передаем product дальше, в кнопки */}
          <ProductActions product={product} />
            
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductCart;