"use client";
import { Button } from "@/components/ui/button";


import { useEffect, useState } from "react";
import useSportsStore from "@/store/useSportsStore"
import BattonWithClick from "@/components/Batton";
import SearchAndButton from "@/components/SearchAndButton";
import Shoes from "@/components/Shoes";
import Categories from "@/dataBase/categories.json"


import shoe from "@/dataBase/shoe.json"
import Header from "@/components/Header";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CategoriesUnderShoes from "@/components/CategoriesUnderShoes";



export default function Home() {

 

const buttonID = useSportsStore(state => state.buttonIDs)
 


  

  return (
    <div className="min-h-screen w-full bg-white text-black ">
      <div className="flex justify-center   w-1vh ">
        <div className="flex justify-between m-3 bg-[url(./img/firstImg.jpg)] w-[85%] min-h-190 bg-cover rounded-4xl">
          <div className="p-15  w-[40%]">
            <div className="cursor-default inline-block px-4 py-2 bg-[#f4f3f0e5] rounded-full text-[#3d3a37] text-sm font-medium uppercase tracking-wide opacity-90">
              ПРЕМИУМ КОЛЕКЦИЯ
            </div>
            <div className="w-fit bg-gradient-to-b pt-7  from-zinc-900 via-zinc-400 to-zinc-900 bg-clip-text text-transparent font-bold tracking-tight leading-none uppercase">
              <h1 className="text-6xl">Кроссовки</h1>
              <h1 className="text-7xl">Для ритма, комфорта</h1>
              <h1 className="text-7xl">И движения по городу</h1>
            </div>
            <div className="w-70 pt-6">
              <h3>
                Tехнологии, стиль и комфорт для каждого шага. Выбирай лучшее для
                себя и своего ритма
              </h3>
            </div>
            <div className="flex gap-5 pt-15">
              <button className="flex justify-center items-center  w-40 h-15 gap-2  bg-[#5A6052] rounded-full text-white hover:bg-[#4b5144] transition-colors">
                {/* <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path> */}

                <span className="text-sm font-medium">Каталог</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right-icon lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              <button className="flex justify-center items-center w-40 h-14 gap-2 curs bg-gray-300 rounded-full border border-gray-100 text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-200">
     
                <span className="text-sm font-medium">Новинки</span>
              </button>
            </div>
          </div>
          <div className=" flex justify-end   w-[30%]">
            <div>
              <div className="flex flex-col pt-30 px-10 gap-3 w-max">
                {/* Блок 1: Бесплатная доставка */}
                <div className="flex h-30 shadow-zinc-300 items-center gap-4 bg-white/90 backdrop-blur-md rounded-[32px] p-4 pr-12 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className=" flex-shrink-0 w-15 h-15 bg-zinc-100/80 rounded-full flex items-center justify-center text-zinc-700">
                    <svg
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 17h4V5H2v12h3" />
                      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h2" />
                      <circle cx="7.5" cy="17.5" r="2.5" />
                      <circle cx="17.5" cy="17.5" r="2.5" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-zinc-900 leading-tight">
                      Бесплатная доставка
                    </span>
                    <span className="text-[13px] text-zinc-500 mt-0.5">
                      от 7 000 ₽
                    </span>
                  </div>
                </div>

                {/* Блок 2: Примерка перед оплатой */}
                <div className="flex items-center shadow-zinc-300 h-30 gap-4 bg-white/90 backdrop-blur-md rounded-[32px] p-4 pr-12 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="flex-shrink-0 w-[52px] h-[52px] bg-zinc-100/80 rounded-full flex items-center justify-center text-zinc-700">
                    <svg
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 2v6h-6" />
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                      <path d="M3 22v-6h6" />
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-zinc-900 leading-tight">
                      Примерка перед оплатой
                    </span>
                    <span className="text-[13px] text-zinc-500 mt-0.5">
                      14 дней на возврат
                    </span>
                  </div>
                </div>

                {/* Блок 3: Оригинальная продукция */}
                <div className="flex items-center gap-4 shadow-zinc-300 h-30 bg-white/90 backdrop-blur-md rounded-[32px] p-4 pr-12 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="flex-shrink-0 w-[52px] h-[52px] bg-zinc-100/80 rounded-full flex items-center justify-center text-zinc-700">
                    <svg
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-zinc-900 leading-tight">
                      Оригинальная продукция
                    </span>
                    <span className="text-[13px] text-zinc-500 mt-0.5">
                      Гарантия качества
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchAndButton />
     <div className="mx-auto w-full px-4 md:px-8 
  max-w-[1600px]               /* Лимит для обычных экранов и Full HD */
  min-[2000px]:max-w-[2200px]  /* Даем больше ширины для экранов > 2000px */
  min-[2300px]:max-w-[82%]     /* На совсем гигантских экранах занимаем 95% ширины */
">
  <Carousel>
    <CarouselContent className="-ml-4"> {/* -ml-4 компенсирует pl-4 у элементов */}
      {shoe
        .filter((item) => buttonID === null || item.categoryId === buttonID)
        .map((s) => (
          <CarouselItem 
            key={s.id} 
            /* Оставляем брейкпоинты, чтобы карточки не были слишком мелкими */
            className="pl-4 
          basis-full               /* Телефоны: 1 карточка */
          sm:basis-1/2             /* От 640px: 2 карточки */
          md:basis-1/3             /* От 768px: 3 карточки */
          lg:basis-1/4             /* От 1024px: 4 карточки */
          xl:basis-1/5             /* От 1280px: 5 карточек */
          2xl:basis-1/6      /* От 1536px (Full HD): 6 карточек */"
          >
            <Shoes {...s} />
          </CarouselItem>
        ))}
    </CarouselContent>
    
    {/* Стрелки сдвигаем чуть внутрь или оставляем по краям */}
    <CarouselPrevious className="left-0 md:left-[-20px] 2xl:left-[-40px]" />
    <CarouselNext className="right-0 md:right-[-20px] 2xl:right-[-40px]" />
  </Carousel>
</div>
<div className="w-full max-w-[1500px] items-center mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
  {Categories.map((c) => (
    <CategoriesUnderShoes key={c.id} {...c} />
  ))}
</div>
  
</div>
    
  );
}
