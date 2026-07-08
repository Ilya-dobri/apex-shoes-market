"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/dataBase/firebaseConfig'; // Проверь правильность пути к твоему конфигу

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      // Функция Firebase для отправки письма сброса пароля
      await sendPasswordResetEmail(auth, email);
      
      setMessage('Ссылка для восстановления отправлена на почту!');
      setEmail(''); // Очищаем поле ввода после успеха
    } catch (err: any) {
     
      
      
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') {
        setError('Пользователь с такой почтой не найден.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Слишком много попыток. Попробуйте позже.');
      } else {
        setError('Произошла ошибка. Проверьте почту и попробуйте еще раз.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f6f8] flex items-center justify-center p-5 text-[#333] font-sans">
      <div className="w-full max-w-[420px] bg-white rounded-[30px] px-[30px] py-[40px] shadow-[0_15px_35px_rgba(0,0,0,0.04)] text-center">
        
        {/* Логотип */}
        <div className="text-[28px] font-black tracking-[1px] mb-2.5 flex items-center justify-center gap-2">
          <div className="w-[30px] h-[30px] bg-[#333] [clip-path:polygon(100%_0,0_50%,100%_100%,70%_50%)]"></div>
          APEX
        </div>
        
        <h1 className="text-[20px] font-semibold text-[#222] mb-3">
          Восстановление пароля
        </h1>
        
        <p className="text-[14px] text-[#888] mb-[25px]">
          Введите почту от аккаунта, и мы пришлем ссылку для сброса пароля.
        </p>

        {/* Уведомление об ошибке */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* Уведомление об успешной отправке */}
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm font-medium text-center">
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Электронная почта" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full px-6 py-4 border-2 border-transparent rounded-full bg-[#f0f2f5] text-[15px] text-[#333] outline-none transition-all duration-300 placeholder:text-[#999] focus:bg-white focus:border-[#5a6258]"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || message !== ''} // Блокируем кнопку при загрузке или после успешной отправки
            className="w-full px-5 py-4 bg-[#5a6258] text-white border-none rounded-full text-[16px] font-semibold cursor-pointer mt-2.5 transition-all duration-300 hover:bg-[#4a5148] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Отправка...' : 'Отправить ссылку'}
          </button>
        </form>

        <div className="mt-[25px] text-[14px]">
          <Link 
            href="/authorisation" 
            className="text-[#888] no-underline font-medium transition-colors duration-200"
          >
            Вспомнили пароль? <span className="text-[#5a6258] hover:text-[#333] transition-colors duration-200">Войти</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;