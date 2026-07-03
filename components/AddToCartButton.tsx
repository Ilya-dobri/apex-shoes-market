"use client"; // Это включает работу хуков и onClick!

import useCartStore from '@/store/useCartStore';

// Описываем, какие данные нужны кнопке (можно вынести тип продукта в отдельный файл)
export interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    size: string;
    imageUrl: string;
  };
}

export const AddToCartButton = ({ product}: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);
const handleAdd = () => {
    // 1. Проверяем, вызывается ли функция при клике
    console.log("Клик по кнопке! Товар:", product); 
    
    // 2. Вызываем метод стора
    addItem({ id: product.id, name: product.name, price: product.price, size: product.size, imageUrl: product.imageUrl });
    
    // 3. Выводим текущее состояние корзины, чтобы убедиться, что товар туда попал
    console.log("Текущая корзина:", useCartStore.getState().items);
    
    // Временный визуальный отклик для тебя
    alert(`Товар ${product.name} добавлен в корзину!`);
  };
  return (
    <button 
      onClick={handleAdd} 
      className="mt-8 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors w-full"
    >
      Добавить в корзину
    </button>
  );
};