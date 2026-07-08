'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import useFavoriteStore from './store/useFavoriteStore';
import { saveFavoritesToDB } from './FireStore/addComponentToDB';
import { getAuth } from 'firebase/auth';

interface ShoesProps {
  id: string | number;
  imageUrl: string;
  name: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string
}

const Shoes = ({id, imageUrl, name, price, rating, sizes}: ShoesProps) => {
   
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite)
  const favorites = useFavoriteStore((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === String(id));
 const handleHeartClick = () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("Войдите в аккаунт, чтобы добавлять товары в избранное!");
      return;
    }
    const productData = {
      id: String(id),
      name: name,
      imageUrl,
      price,
      size: sizes && sizes.length > 0 ? String(sizes[0]) : "",
    };

    toggleFavorite(productData);
    const updatedFavorites = useFavoriteStore.getState().favorites;
    saveFavoritesToDB(userId, updatedFavorites);
  };


  
  return (
    <motion.div 
    initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
  key={id} 
  className="relative flex flex-col p-4 bg-[#ffecec42] rounded-[24px] w-[260px] hover:shadow-lg transition-shadow duration-300"
>
  {/* Иконка сердечка */}
 <button   
        onClick={handleHeartClick}    
        className={`absolute top-4 right-4 z-10 transition-colors ${
          isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
        }`}
      >   
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  </button>

  {/* Блок с картинкой */}
  <div className="w-full h-44 flex items-center justify-center mb-4">
    <Link href={`/products/${id}`}>
      <motion.img whileHover={{ scale: 1.08, rotate: -2 }} transition={{ duration: 0.3 }} 
        src={imageUrl}
        alt={name}
        className="object-contain max-h-full mix-blend-multiply cursor-pointer" 
      />
    </Link>
  </div>

  {/* Название и категория */}
  <div className="flex flex-col pt-5 flex-grow">
    <h3 className="font-bold text-sm text-gray-900 uppercase leading-snug">
      {name} {/* <--- ВСТАВЛЯТЬ НАЗВАНИЕ СЮДА */}
    </h3>
    <p className="text-xs text-gray-400 mt-1">
      Универсальные кроссовки {/* <--- ТУТ МОЖЕШЬ НАПИСАТЬ СВОЙ ТЕКСТ ИЛИ ВСТАВИТЬ КАТЕГОРИЮ */}
    </p>
  </div>

  {/* Нижний ряд: Цена, Рейтинг, Размеры */}
  <div className="flex items-center justify-between mt-auto">
    
    {/* Цена */}
    <span className="font-extrabold text-base text-gray-900 whitespace-nowrap">
      {price.toLocaleString('ru-RU')} ₽ {/* <--- ВСТАВЛЯТЬ ЦЕНУ СЮДА (toLocaleString красиво добавит пробел: 12 990) */}
    </span>

    {/* Контейнер для рейтинга и размеров */}
    <div className="flex items-center gap-3">
      
      {/* Рейтинг */}
      <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
        <svg width="14" height="14" fill="#FBBF24" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {rating} {/* <--- ВСТАВЛЯТЬ ОЦЕНКУ СЮДА */}
      </div>

      {/* Плашка с размерами (берем минимальный и максимальный размер из массива) */}
      <span className="border border-gray-200 rounded-lg px-2 py-1 text-[10px] font-medium text-gray-400 bg-white shadow-sm whitespace-nowrap">
        {Math.min(...sizes)}-{Math.max(...sizes)} {/* <--- ВСТАВЛЯТЬ РАЗМЕРЫ СЮДА */}
      </span>
      
    </div>
  </div>
</motion.div>
  )
}

export default Shoes
