"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/dataBase/firebaseConfig';

  
  const Authorisation = () => {
    const router = useRouter();
const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
   
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Очищаем старые ошибки
    setIsLoading(true); // Включаем режим загрузки

    try {
      // Пытаемся залогинить юзера
      await signInWithEmailAndPassword(auth, email, password);
      
      console.log('✅ Вход успешно выполнен!');
      
      // Перенаправляем на главную страницу (или в личный кабинет)
      router.push(`/authorisation/profile`); 
    } catch (err: any) {
      console.error('❌ Ошибка входа:', err);
      
      // Обработка типичных ошибок Firebase при входе
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Неверная электронная почта или пароль');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Слишком много попыток. Попробуйте позже.');
      } else {
        setError('Произошла ошибка при входе. Попробуйте еще раз.');
      }
    } finally {
      setIsLoading(false); // Выключаем загрузку в любом случае
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
        
        <h1 className="text-[20px] font-semibold text-[#222] mb-[30px]">
          Вход в аккаунт
        </h1>
        
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
          <div className="mb-4">
            <input 
              type="password" 
              placeholder="Пароль" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full px-6 py-4 border-2 border-transparent rounded-full bg-[#f0f2f5] text-[15px] text-[#333] outline-none transition-all duration-300 placeholder:text-[#999] focus:bg-white focus:border-[#5a6258]"
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-5 py-4 bg-[#5a6258] text-white border-none rounded-full text-[16px] font-semibold cursor-pointer mt-2.5 transition-all duration-300 hover:bg-[#4a5148] active:scale-[0.98]"
          >
            {isLoading ? 'Входим...' : 'Войти'}
          </button>
        </form>
        
        <div className="mt-[25px] text-[14px] flex flex-col gap-2.5">
          <Link 
            href="/forgot-password" 
            className="text-[#5a6258] no-underline font-medium transition-colors duration-200 hover:text-[#333]"
          >
            Забыли пароль?
          </Link>
          <Link 
            href="/authorisation/register" 
            className="text-[#888] no-underline font-medium transition-colors duration-200"
          >
            Нет аккаунта? <span className="text-[#5a6258] hover:text-[#333] transition-colors duration-200">Зарегистрироваться</span>
          </Link>
        </div>
      </div>
    </div>
  );
  };

export default Authorisation;