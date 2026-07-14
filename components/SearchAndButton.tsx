"use client";

import { useEffect, useRef, useState } from "react";
import BattonWithClick from "./Batton";
import useSportsStore from "@/components/store/useSportsStore";
import { getShoesFromDB } from "./FireStore/addComponentToDB";
import Link from "next/link";
import { getAverageRating } from "./Shoes";

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
  const [infoShoes, setInfoShoes] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchShoes = async () => {
      const data = await getShoesFromDB();
      setInfoShoes(data);
    };

    fetchShoes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
     
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); 
      }
    };

    
    document.addEventListener("mousedown", handleClickOutside);

   
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const filteredProducts = infoShoes.filter((product: any) =>
    (product.name || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const buttonID = useSportsStore((state) => state.buttonIDs);
  const addButonID = useSportsStore((state) => state.addButtonId);
  return (
    <div className="md:flex md:w-[95%] md:m-auto  md:flex-col xl:flex-row items-center gap-4 w-full p-4 font-sans">
      <div className="md:flex   md:w-[85%]  justify-between  gap-20">
        <div
          ref={searchContainerRef}
          className=" relative flex items-center bg-white border border-gray-200 rounded-full p-1.5 md:w-140  shadow-sm flex-shrink-0"
        >
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
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            placeholder="Поиск по моделям, брендам и технологиям..."
            className="flex-1 bg-transparent outline-none text-[14px] text-gray-700 placeholder-gray-400 w-full"
          />

          
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
       {isDropdownOpen && searchQuery.trim() !== "" && (
  <ul className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-y-auto py-2">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <li key={product.id}>
          <Link
            href={`/products/${product.id}`}
            className="block text-sm transition-colors"
            onClick={() => setSearchQuery("")}
          >
            
            <div className="hover:bg-gray-50 px-5 py-3 text-gray-900 flex items-center gap-4 text-sm transition-colors w-full">
              
             
              <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={product.imageUrl[0]}
                  alt={product.name}
                />
              </div>

              
              <div className="flex flex-col gap-1 flex-1 min-w-0">
           
                <span className="font-medium text-gray-800 line-clamp-1">
                  {product.name}
                </span>
                
                <span className="text-gray-500 font-semibold text-xs">
                  {product.price} ₽
                </span>
                
              
                <span className="text-amber-500 text-xs flex items-center gap-1 font-medium">
                  ★ {getAverageRating(product.reviews)}
                </span>
              </div>

            </div>
          </Link>
        </li>
      ))
    ) : (
      <li className="px-5 py-3 text-gray-400 text-sm">
        Товары не найдены
      </li>
    )}
  </ul>
)}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 pt-4 md:gap-5">
        {categories.map((cat) => (
          <BattonWithClick
            key={cat.id}
            id={cat.id}
            cat={cat}
            isSelected={buttonID === cat.id}
            onClick={() => {
              console.log(buttonID);
              addButonID(buttonID === cat.id ? null : cat.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchAndButton;
