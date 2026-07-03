"use client";

import React, { useState } from "react";
import useCartStore from "@/store/useCartStore";

// Описываем интерфейс пропсов. В 'sizes' приходит массив всех размеров из базы,
// а остальные данные нужны для кнопки добавления.
export interface ProductActionsProps {
  product: {
    id: string | number;
    name: string;
    price: number;
    sizes: (string | number)[];
    imageUrl: string;
  };
}

const ProductActions = ({ product }: ProductActionsProps) => {
  // Локальное состояние: хранит один конкретный размер, по которому кликнул пользователь
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  // Достаем функцию добавления из Zustand
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    // 1. Не пускаем дальше, если размер не выбран
    if (!selectedSize) {
      alert("Пожалуйста, выберите размер!");
      return;
    }

    console.log("Клик по кнопке! Товар:", product.name, "| Размер:", selectedSize);

    // 2. Отправляем в стор данные + ВЫБРАННЫЙ размер
    addItem({ 
      id: String(product.id), 
      name: product.name, 
      price: product.price, 
      size: String(selectedSize),
      imageUrl: product.imageUrl
    });

    // 3. Выводим текущее состояние корзины
    console.log("Текущая корзина:", useCartStore.getState().items);
    
    // Временный визуальный отклик
    alert(`Товар ${product.name} (размер ${selectedSize}) добавлен в корзину!`);
  };

  return (
    <div className="flex flex-col">
      
      {/* --- 1. Блок выбора размеров --- */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Доступные размеры:</h3>
        <div className="flex gap-2">
          {product.sizes.map((size) => {
            // Переводим size в строку для надежного сравнения
            const sizeStr = String(size);
            const isSelected = selectedSize === sizeStr;

            return (
              <button
                key={sizeStr}
                onClick={() => setSelectedSize(sizeStr)}
                className={`border rounded-lg px-4 py-2 cursor-pointer transition-colors font-semibold ${
                  isSelected 
                    ? "bg-black text-white border-black" 
                    : "text-gray-700 border-gray-300 hover:border-black"
                }`}
              >
                {sizeStr}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- 2. Кнопка Добавить в корзину --- */}
      <button
        onClick={handleAdd}
        className="mt-4 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors w-full"
      >
        Добавить в корзину
      </button>

    </div>
  );
};

export default ProductActions;