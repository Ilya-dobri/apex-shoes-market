'use client'


import { useEffect, useState } from 'react';
import BattonWithClick from './Batton';
import useSportsStore from '@/store/useSportsStore';
import { getCategoriesFromDB } from "@/components/FireStore/addShoeToDB";
 

 

 const categories = [
    {
      name: "Бег",
      id: 1,
      icon: (
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13.4 10.4L9 14.8l-3.3-3.3" />
          <path d="M12.5 17.5L16 14l3.5 3.5" />
          <circle cx="12" cy="5" r="2" />
        </svg>
      ),
    },
    {
      name: "Баскетбол",
      id: 2,
      icon: (
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      name: "Тренинг",
      id: 3,
      icon: (
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6.5 6.5 11 11" />
          <path d="m21 21-1-1" />
          <path d="m3 3 1 1" />
          <path d="m18 22 4-4" />
          <path d="m2 6 4-4" />
          <path d="m3 10 7-7" />
          <path d="m14 21 7-7" />
        </svg>
      ),
    },
    {
      name: "Лайфстайл",
      id: 4,
      icon: (
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
          <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      ),
    },
    {
      name: "Для зала",
      id: 5,
      icon: (
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
          <path d="M3 9h18" />
          <path d="M3 15h18" />
        </svg>
      ),
    },
  ];




const SearchAndButton = () => {
    // const [categories, setCategories] = useState<any[]>([]);
    // const [loading, setLoading] = useState(true);
      // useEffect(() => {
      //   const fetchCategories = async () => {
      //     try {
      //       setCategories(await getCategoriesFromDB())
      //     }catch (error) {
      //       console.error("Ошибка при получении категорий:", error);
      //     }finally {
      //       console.log("Категории успешно получены:", categories);
      //       setLoading(false);
      //     }
      //   }
      //   fetchCategories();
      // }, [])
    
     const buttonID = useSportsStore(state => state.buttonIDs)
  const addButonID = useSportsStore(state => state.addButtonId)
  return (
    <div className="flex  flex-col xl:flex-row items-center gap-4 w-full p-4 font-sans">
        {/* 1. Блок поиска */}
        <div className="flex m-auto  w-[85%]  justify-between  gap-20">
          <div className=" flex items-center bg-white border border-gray-200 rounded-full p-1.5 w-140  shadow-sm flex-shrink-0">
          <div className="pl-3 pr-2 text-gray-400">
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Поиск по моделям, брендам и технологиям..."
            className="flex-1 bg-transparent outline-none text-[14px] text-gray-700 placeholder-gray-400 w-full"
          />
          {/* Кнопка с лупой (темно-оливковая, как на макете) */}
          <button className="bg-[#5c6350] hover:bg-[#4a5040] transition-colors text-white p-3 rounded-full flex items-center justify-center ml-1">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>

        <div className="flex gap-5">
          {categories.map((cat) => (
            <BattonWithClick
              key={cat.id}
              id={cat.id}
              cat={cat}
              
              isSelected={buttonID === cat.id}
              onClick={() => {
                console.log(buttonID)
              addButonID(buttonID === cat.id ? null : cat.id);
              }}
            />
          ))}
        </div>
      </div>
        </div>
  )
}

export default SearchAndButton
