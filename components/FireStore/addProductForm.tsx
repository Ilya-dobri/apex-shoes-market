"use client";

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/dataBase/firebaseConfig'; // Проверь путь к твоему конфигу!

const AddProductForm = () => {
  // Состояния для полей кроссовка (добавь нужные тебе поля)
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Пока используем просто ссылку на картинку
  const [categoryId, setCategoryId] = useState(''); // Добавляем состояние для категории
  
  // Состояния интерфейса
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');


    try {
      // Отправляем данные в коллекцию "shoes"
      await addDoc(collection(db, "shoes"), {
        title: title,
        price: Number(price), // Обязательно переводим цену в число!
        brand: brand,
        imageUrl: imageUrl,
        categoryId: categoryId, // Сохраняем айди категории
        createdAt: new Date() // Записываем дату добавления
      });

      setMessage('✅ Кроссовки успешно добавлены в базу!');
      
      // Очищаем форму после успешной отправки
      setTitle('');
      setPrice('');
      setBrand('');
      setImageUrl('');
        setCategoryId('');
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
      setMessage('❌ Ошибка при добавлении товара.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-4">
      <h3 className="text-[18px] font-semibold text-[#222] mb-4">Добавить новые кроссовки</h3>
      
      {message && (
        <div className={`mb-4 p-3 rounded-xl text-sm text-center ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input 
          type="text" 
          placeholder="Название модели (например, Nike Air Force 1)" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
          className="w-full px-4 py-3 rounded-xl bg-[#f0f2f5] outline-none focus:bg-white focus:ring-2 focus:ring-[#5a6258] transition-all"
        />
        
        <div className="flex gap-3">
          <input 
            type="number" 
            placeholder="Цена (₽)" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required 
            className="w-1/2 px-4 py-3 rounded-xl bg-[#f0f2f5] outline-none focus:bg-white focus:ring-2 focus:ring-[#5a6258] transition-all"
          />
          <input 
            type="text" 
            placeholder="Бренд (Nike, Adidas...)" 
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required 
            className="w-1/2 px-4 py-3 rounded-xl bg-[#f0f2f5] outline-none focus:bg-white focus:ring-2 focus:ring-[#5a6258] transition-all"
          />
        </div>

        <input 
          type="url" 
          placeholder="Ссылка на фото товара (https://...)" 
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required 
          className="w-full px-4 py-3 rounded-xl bg-[#f0f2f5] outline-none focus:bg-white focus:ring-2 focus:ring-[#5a6258] transition-all"
        />
<input 
          type="text" 
          placeholder="айди категории" 
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required 
          className="w-full px-4 py-3 rounded-xl bg-[#f0f2f5] outline-none focus:bg-white focus:ring-2 focus:ring-[#5a6258] transition-all"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-2 py-3 bg-[#5a6258] text-white rounded-xl font-semibold hover:bg-[#4a5148] disabled:opacity-50 transition-all"
        >
          {isLoading ? 'Добавляем...' : 'Отправить в базу'}
        </button>
        
      </form>
    </div>
  );
};

export default AddProductForm;