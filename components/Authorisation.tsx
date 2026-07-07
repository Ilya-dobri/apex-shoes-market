"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
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


  const handleGoogleSignIn = async () => {
    // Защита от двойного клика: если уже грузимся, выходим из функции
    if (isLoading) return; 

    setError('');
    setIsLoading(true); // Включаем блокировку кнопок
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      console.log('✅ Вход через Google успешно выполнен!');
      router.push(`/authorisation/profile`); 
    } catch (err: any) {
      console.error('❌ Ошибка входа через Google:', err);
      // Игнорируем и закрытие окна пользователем, и отмену запроса из-за спама кликами
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setError('Ошибка при авторизации через Google. Попробуйте еще раз.');
      }
    } finally {
      setIsLoading(false); // Обязательно выключаем загрузку в конце
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
        <button 
          type="button" 
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-white border-2 border-[#f0f2f5] rounded-full text-[15px] font-semibold text-[#333] cursor-pointer transition-all duration-300 hover:bg-[#f9fafb] active:scale-[0.98]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Войти через Google
        </button>
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