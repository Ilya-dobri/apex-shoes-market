"use client";

import  { useState, useRef, useEffect } from "react";
import useCartStore from "@/components/store/useCartStore";
import AlertComponent from "./AlertComponent";

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
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  // 1. Создаем стейт для управления видимостью красивого алерта
  const [showAlert, setShowAlert] = useState(false);
  
  // 2. Создаем реф для хранения ID таймера (защита от багов при частом клике)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    if (!selectedSize) {
      alert("Пожалуйста, выберите размер!");
      return;
    }

    console.log("Клик по кнопке! Товар:", product.name, "| Размер:", selectedSize);

    addItem({ 
      id: String(product.id), 
      
      name: product.name, 
      price: product.price, 
      size: String(selectedSize),
      imageUrl: product.imageUrl
    });

    console.log("Текущая корзина:", useCartStore.getState().items);
    
    
    
    // Сначала принудительно показываем алерт
    setShowAlert(true);

    // Если таймер уже был запущен (например, от предыдущего клика), сбрасываем его
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Запускаем новый таймер на 5000 миллисекунд (5 секунд)
    timerRef.current = setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  // Правило хорошего тона: если компонент вдруг размонтируется, очищаем таймер
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col">
      
      {/* --- 1. Блок выбора размеров --- */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Доступные размеры:</h3>
        <div className="flex gap-2">
          {product.sizes?.map((size) => {
            const sizeStr = String(size);
            const isSelected = selectedSize === sizeStr;

            return (
              <button
                key={sizeStr}
                onClick={() => setSelectedSize(sizeStr)}
                className={`border  rounded-lg px-4 py-2 cursor-pointer transition-colors font-semibold ${
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

     
      <button
        onClick={handleAdd}
        className="mt-4 w bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors w-2xs"
      >
        Добавить в корзину
      </button>

      {/* --- 3. Передаем наш стейт showAlert в пропс isVisible --- */}
      <AlertComponent 
        title="Успешно!" 
        description={`Товар ${product.name} (размер ${selectedSize}) добавлен в корзину`} 
        isVisible={showAlert} 
      />
    </div>
  );
};

export default ProductActions;