"use client";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import useSportsStore from "@/store/useSportsStore";
import BattonWithClick from "@/components/Batton";
import SearchAndButton from "@/components/SearchAndButton";
import Shoes from "@/components/Shoes";
import Categories from "@/dataBase/categories.json";

import shoe from "@/dataBase/shoe.json";
import Header from "@/components/Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoriesUnderShoes from "@/components/CategoriesUnderShoes";
import InfoBadge from "@/components/InfoBadge";
import TechnologiesSection from "@/components/TechnologiesSection";
import Footer from "@/components/Footer";

export default function Home() {
  const buttonID = useSportsStore((state) => state.buttonIDs);

  return (
    <div className="min-h-screen w-full bg-white text-black ">
      <InfoBadge />
      <SearchAndButton />
      <div
        className="mx-auto w-full px-4 md:px-8 
  max-w-[1600px]               /* Лимит для обычных экранов и Full HD */
  min-[2000px]:max-w-[2200px]  /* Даем больше ширины для экранов > 2000px */
  min-[2300px]:max-w-[82%]     /* На совсем гигантских экранах занимаем 95% ширины */
"
      >
        <Carousel>
          <CarouselContent className="-ml-4">
           
            {shoe
              .filter(
                (item) => buttonID === null || item.categoryId === buttonID,
              )
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

          <CarouselPrevious className="left-0 md:left-[-20px] 2xl:left-[-40px]" />
          <CarouselNext className="right-0 md:right-[-20px] 2xl:right-[-40px]" />
        </Carousel>
      </div>
      <div className="w-full max-w-[1500px] items-center mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {Categories.map((c) => (
          <CategoriesUnderShoes key={c.id} {...c} />
        ))}
      </div>
      <TechnologiesSection />

      <Footer />
    </div>
  );
}
