'use client'
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import logo from "../app/img/logo.png"
import Link from 'next/link'
import useCartStore from '@/store/useCartStore'
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
    className={`sticky top-0 mt-2 mx-5 flex justify-between z-50 h-17 transition-colors duration-300 ${
        isScrolled ? 'bg-gray-100 shadow-sm' : 'bg-white'
      }`}>
        <div className="flex  justify-center items-center  ">
          <Link href="/"><Image src={logo} className="w-50 h-17 object-cover object-right" alt="logo" /></Link>
        </div>
        <div className="flex  justify-center items-center  ">
          <Button
            className=" cursor-pointer text-[20px] tracking-widest font-bold "
            variant="ghost"
          >
            Каталог
          </Button>
          <Button
            className=" cursor-pointer text-[20px] tracking-widest font-bold "
            variant="ghost"
          >
            Бренды
          </Button>
          <Button
            className=" cursor-pointer text-[20px] tracking-widest font-bold "
            variant="ghost"
          >
            Новинки
          </Button>
          <Button
            className=" cursor-pointer text-[20px] tracking-widest font-bold "
            variant="ghost"
          >
            Акции
          </Button>
          <Button
            className=" cursor-pointer text-[20px] tracking-widest font-bold "
            variant="ghost"
          >
            Технологии
          </Button>
          <Button
            className=" cursor-pointer text-[20px] tracking-widest font-bold "
            variant="ghost"
          >
            О нас
          </Button>
          <Button
            className=" cursor-pointer text-[20px] tracking-widest font-bold "
            variant="ghost"
          >
            Доставка
          </Button>
        </div>
        <div className="flex gap-5  justify-center items-center ">
          <Link href="/authorisation"><button className="flex justify-center items-center w-40 h-14 gap-2 bg-gray-200 rounded-full border border-gray-100 text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-300">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            {userData ? (
              <span className="text-sm font-medium">{userData.name}</span>
            ) : ( 
              <span className="text-sm font-medium">Войти</span>
            )}
          </button></Link>

          <Link href={"/cart"}> <button className="flex justify-center items-center  w-40 h-15 gap-2 pl-5 pr-1.5 py-1.5 bg-[#5A6052] rounded-full text-white hover:bg-[#4b5144] transition-colors">
            <svg
              className="w-5 h-5 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
           <span className="text-sm font-medium">Корзина</span>
            <div className="flex items-center justify-center w-7 h-7 ml-1 bg-white text-[#5A6052] rounded-full text-sm font-bold">
              {totalCount}
            </div>
          </button>
          </Link>
        </div>
      </motion.header>
  )
}

export default Header
