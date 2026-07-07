'use client'
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import logo from "../app/img/logo.png"
import Link from 'next/link'
import useCartStore from '@/components/store/useCartStore'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '@/dataBase/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        const docSnap = await getDoc(doc(db, "users", uid));
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const items = useCartStore((state) => state.items);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.header
      className={`
        sticky top-0 z-50 transition-colors duration-300
        /* ТЕЛЕФОН: маленькие отступы и высота */
        mt-2 mx-2 h-14 p-2 flex justify-between items-center rounded-xl
        /* ПК (от lg): увеличиваем отступы и высоту */
        lg:mx-5 lg:h-17 lg:p-0 lg:rounded-none
        ${isScrolled ? 'bg-gray-100/90 backdrop-blur shadow-sm' : 'bg-white'}
      `}
    >
      {/* ЛОГОТИП */}
      <div className="flex justify-center items-center">
        <Link href="/">
          {/* На мобилках делаем логотип чуть меньше (w-36), на ПК возвращаем w-50 */}
          <Image src={logo} className="w-36 h-12 lg:w-50 lg:h-17 object-cover object-right" alt="logo" />
        </Link>
      </div>

 
      <div className="hidden lg:flex justify-center items-center gap-1">
        <Button className="cursor-pointer text-[18px] xl:text-[20px] tracking-widest font-bold" variant="ghost">Каталог</Button>
        <Button className="cursor-pointer text-[18px] xl:text-[20px] tracking-widest font-bold" variant="ghost">Бренды</Button>
        <Button className="cursor-pointer text-[18px] xl:text-[20px] tracking-widest font-bold" variant="ghost">Новинки</Button>
        <Button className="cursor-pointer text-[18px] xl:text-[20px] tracking-widest font-bold" variant="ghost">Акции</Button>
        <Button className="cursor-pointer text-[18px] xl:text-[20px] tracking-widest font-bold" variant="ghost">Технологии</Button>
        <Button className="cursor-pointer text-[18px] xl:text-[20px] tracking-widest font-bold" variant="ghost">О нас</Button>
        <Button className="cursor-pointer text-[18px] xl:text-[20px] tracking-widest font-bold" variant="ghost">Доставка</Button>
      </div>

      {/* КНОПКИ ПРОФИЛЯ И КОРЗИНЫ */}
      <div className="flex gap-2 lg:gap-5 justify-center items-center">
        
        {/* Войти / Профиль */}
        <Link href="/authorisation/profile">
          <button className="
            flex justify-center items-center rounded-full border border-gray-100 text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-300 bg-gray-200
            /* ТЕЛЕФОН: компактная круглая кнопка, скрываем текст */
            w-10 h-10 p-0
            /* ПК: полноценная широкая кнопка с текстом */
            lg:w-40 lg:h-14 lg:gap-2
          ">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            {/* Текст скрыт на мобилках (hidden) и появляется на ПК (lg:block) */}
            <span className="hidden lg:block text-sm font-medium">
              {userData ? userData.name : "Войти"}
            </span >
          </button>
        </Link>

        {/* Корзина */}
        <Link href="/cart">
          <button className="
            flex justify-center items-center bg-[#5A6052] rounded-full text-white hover:bg-[#4b5144] transition-colors
            /* ТЕЛЕФОН: маленькая кнопка */
            w-14 h-10 gap-1 px-2
            /* ПК: большая кнопка */
            lg:w-40 lg:h-15 lg:gap-2 lg:pl-5 lg:pr-1.5 lg:py-1.5
          ">
            <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            {/* Слово "Корзина" прячем на мобилках */}
            <span className="hidden lg:block text-sm font-medium">Корзина</span>
            
            <div className="flex items-center justify-center w-7 h-7 bg-white text-[#5A6052] rounded-full text-sm font-bold lg:ml-1">
              {totalCount}
            </div>
          </button>
        </Link>
        
      </div>
    </motion.header>
  )
}

export default Header