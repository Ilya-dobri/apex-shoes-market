"use client";

import React, { useEffect } from 'react';
import useCartStore from '@/components/store/useCartStore';
import Link from 'next/link'
import { addDoc, collection, doc, getDoc} from 'firebase/firestore';
import { db, auth } from '@/dataBase/firebaseConfig';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  imageUrl: string;
}




export default function MockCartItems() {
  
 const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const [isProcessing, setIsProcessing] = React.useState(false);





  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему перед оплатой.');
      setIsProcessing(false);
      return;
    }
    const uid = currentUser.uid;
    try {
      const docSnap = await getDoc(doc(db, "users", uid));
      const currentUserId = docSnap.data()?.userId || uid;

    const orderRef = await addDoc(collection(db, "orders"), {
      userId: currentUserId,    
      userUid: uid,             
      products: items,           
      totalAmount: totalPrice, 
      status: 'pending',        
      createdAt: new Date(),    
    });
      

      // 1. Запрашиваем подпись у нашего Next.js API роута
      const res = await fetch('/api/liqpay-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice,
          userId: currentUserId,
          orderId: orderRef.id
        }),
      });

      if (!res.ok) throw new Error('Ошибка создания сессии платежа');

      const { data, signature } = await res.json();

      // 2. Создаем невидимую форму и отправляем её на эквайринг LiqPay
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://www.liqpay.ua/api/3/checkout';
      form.acceptCharset = 'utf-8';

      const dataInput = document.createElement('input');
      dataInput.type = 'hidden';
      dataInput.name = 'data';
      dataInput.value = data;
      form.appendChild(dataInput);

      const signInput = document.createElement('input');
      signInput.type = 'hidden';
      signInput.name = 'signature';
      signInput.value = signature;
      form.appendChild(signInput);

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Ошибка редиректа на LiqPay:', error);
      alert('Не удалось запустить процесс оплаты. Попробуйте позже.');
      setIsProcessing(false);
    }
  };
  
  return (

    
    
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-12">
      <div className="max-w-7xl mx-auto px-4 pt-10">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
          Корзина <span className="text-gray-400 text-xl font-normal ml-2">{items.length}</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Левая колонка: Список товаров */}
          <div className="lg:col-span-8 space-y-4">
            {items.length === 0 ? <p>Пусто</p> : null}
            {items.map((item) => (
              <div 
                key={item.id + item.size + item.imageUrl} 
                className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col sm:flex-row items-center gap-6"
              >
                {/* Изображение товара */}
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-[16px] overflow-hidden flex-shrink-0">
                  <img  
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Информация о товаре */}
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    {/* Кнопка удаления */}
                    <button onClick={() => removeItem(item.id, item.size, item.imageUrl)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    Размер: {item.size}
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                  
                    <div className="flex items-center bg-[#F1F2F2] rounded-full px-1 py-1">
                      <button onClick={() => { if (item.quantity > 1) { updateQuantity(item.id, item.size, item.quantity - 1); } else { removeItem(item.id, item.size, item.imageUrl); } }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-gray-600">
                        -
                      </button>
                      <span className="w-8 text-center font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-gray-600">
                        +
                      </button >
                    </div>
                    
                    {/* Цена */}
                    <div className="text-xl font-bold text-gray-900">
                      {item.price.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Правая колонка: Итого (Order Summary) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[32px] shadow-sm sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Сумма заказа</h2>
              
              <div className="space-y-4 text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Товары ({items.length})</span>
                  <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span className="text-green-600 font-medium">Бесплатно</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-medium text-gray-900">Итого</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              {/* Главная кнопка в фирменном оливковом цвете (#646C55) */}
              <button onClick={handleCheckout} className="w-full bg-[#646C55] hover:bg-[#535A46] text-white py-4 rounded-full font-semibold text-lg transition-colors shadow-lg shadow-[#646c55]/20">
                Перейти к оформлению
              </button>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}