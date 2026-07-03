"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
// Обязательно проверь путь до твоего файла инициализации Firebase!
import { auth, db } from '@/dataBase/firebaseConfig'; 

const Registration = () => {
  const router = useRouter();
  
  // Данные полей формы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Состояния интерфейса
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Создаем пользователя в Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Сразу создаем для него профиль в базе данных Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: "user", // Базовая роль для новых клиентов
        createdAt: new Date()
      });

      console.log('✅ Аккаунт успешно создан!');
      
      // 3. Перенаправляем на главную страницу после успеха
      router.push('/'); 
    } catch (err: any) {
      console.error('❌ Ошибка при регистрации:', err);
      
      // Обработка типичных ошибок Firebase
      if (err.code === 'auth/email-already-in-use') {
        setError('Пользователь с такой почтой уже существует');
      } else if (err.code === 'auth/weak-password') {
        setError('Пароль должен содержать минимум 6 символов');
      } else if (err.code === 'auth/invalid-email') {
        setError('Некорректный формат электронной почты');
      } else {
        setError('Произошла ошибка при регистрации. Попробуйте еще раз.');
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
        
        <h1 className="text-[20px] font-semibold text-[#222] mb-[30px]">
          Создание аккаунта
        </h1>
        
        {/* Блок вывода ошибки */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 text-[14px] rounded-xl text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Ваше имя" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              className="w-full px-6 py-4 border-2 border-transparent rounded-full bg-[#f0f2f5] text-[15px] text-[#333] outline-none transition-all duration-300 placeholder:text-[#999] focus:bg-white focus:border-[#5a6258]"
            />
          </div>
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
              placeholder="Пароль (минимум 6 символов)" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              minLength={6}
              className="w-full px-6 py-4 border-2 border-transparent rounded-full bg-[#f0f2f5] text-[15px] text-[#333] outline-none transition-all duration-300 placeholder:text-[#999] focus:bg-white focus:border-[#5a6258]"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full px-5 py-4 bg-[#5a6258] text-white border-none rounded-full text-[16px] font-semibold cursor-pointer mt-2.5 transition-all duration-300 hover:bg-[#4a5148] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Создаем...' : 'Зарегистрироваться'}
          </button>
        </form>
        
        <div className="mt-[25px] text-[14px] flex flex-col gap-2.5">
          <Link 
            href="/authorisation" 
            className="text-[#888] no-underline font-medium transition-colors duration-200"
          >
            Уже есть аккаунт? <span className="text-[#5a6258] hover:text-[#333] transition-colors duration-200">Войти</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;