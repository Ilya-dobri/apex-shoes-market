"use client";

// 1. Импортируем хуки React
import { useState, useEffect } from "react";
import useSportsStore from "@/store/useSportsStore";

import SearchAndButton from "@/components/SearchAndButton";
import Shoes from "@/components/Shoes";


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
import { getCategoriesFromDB, getShoesFromDB } from "@/components/FireStore/addShoeToDB";

// Проверь путь! В прошлый раз мы писали эту функцию в dataBase/shoesService.ts


export default function Home() {
  const buttonID = useSportsStore((state) => state.buttonIDs);
  const [categories, setCategories] = useState<any[]>([]);
  
  // 2. Создаем состояния для хранения кроссовок и статуса загрузки
  const [shoes, setShoes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Загружаем данные при монтировании компонента
  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const data = await getShoesFromDB();
        setShoes(data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchShoes();
  }, []); 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategories(await getCategoriesFromDB())

      }catch (error) {
        console.error("Ошибка при получении категорий:", error);
      }finally {
        console.log("Категории успешно получены:", categories);
      }
    }
    fetchCategories();
  }, [])

  return (
    <div className="min-h-screen w-full bg-[#FBF9FE] text-black ">
      <InfoBadge />
      <SearchAndButton />
      
      <div className="mx-auto w-full px-4 md:px-8 max-w-[1600px] min-[2000px]:max-w-[2200px] min-[2300px]:max-w-[82%]">
        
        {/* 4. Показываем загрузку, пока ждем ответ от Firebase */}
        {isLoading ? (
          <div className="text-center py-20 text-2xl font-bold">
            Загрузка каталога...
          </div>
        ) : (
          <Carousel>
            <CarouselContent className="-ml-4">
              {/* 5. Заменяем старый JSON (shoe) на наш стейт с базой данных (shoes) */}
              {shoes
                .filter((item) => buttonID === null || item.categoryId === buttonID)
                .map((s) => (
                  <CarouselItem
                    key={s.id}
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
                  >
                    <Shoes {...s} />
                  </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="left-0 md:left-[-20px] 2xl:left-[-40px]" />
            <CarouselNext className="right-0 md:right-[-20px] 2xl:right-[-40px]" />
          </Carousel>
        )}
        
      </div>

      <div className="w-full max-w-[1500px] items-center mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mt-12">
        {categories.map((c) => (
          <CategoriesUnderShoes key={c.id} {...c} />
        ))}
      </div>
      <TechnologiesSection />

      <Footer />
    </div>
  );
}