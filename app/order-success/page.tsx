"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/dataBase/firebaseConfig';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!orderId) {
      setStatus('error');
      return;
    }

    const updateOrderStatus = async () => {
      try {
        // Находим документ заказа по ID, который пришел в URL
        const orderRef = doc(db, 'orders', orderId);
        
        
        await updateDoc(orderRef, {
          status: 'paid',
          updatedAt: new Date()
          
        });

        setStatus('success');
      } catch (error) {
        console.error('Ошибка обновления статуса заказа:', error);
        setStatus('error');
      }
    };

    updateOrderStatus();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-sans px-4">
      <div className="bg-white p-8 rounded-[32px] shadow-sm max-w-md w-full text-center">
        {status === 'loading' && (
          <div className="space-y-4">
            <p className="text-xl font-medium text-gray-900">Проверяем статус оплаты...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 text-3xl">
              ✓
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Оплата успешна!</h1>
            <p className="text-gray-500 text-sm">
              Ваш заказ №<span className="font-mono text-gray-800">{orderId}</span> успешно оформлен и оплачен.
            </p>
            <Link 
              href="/" 
              className="block w-full bg-[#646C55] hover:bg-[#535A46] text-white py-3 rounded-full font-semibold transition-colors text-center"
            >
              На главную
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600 text-3xl">
              ✕
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Что-то пошло не так</h1>
            <p className="text-gray-500 text-sm">
              Не удалось обновить статус заказа или ссылка недействительна.
            </p>
            <Link 
              href="/" 
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-full font-semibold transition-colors text-center"
            >
              Вернуться в магазин
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}