"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import {
  getFilterMasiveFromDB,
  getShoesFromDB,
} from "./FireStore/addComponentToDB";
import { Slider } from "./ui/slider";
import Shoes from "./Shoes";
import { Separator } from "./ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const Catalog = () => {
  const [filters, setFilters] = useState<any>(null);
  const [shoes, setShoes] = useState<any[]>([]);
  const items = [
    { label: "сортировка по рейтингу", value: "raiting" },
    { label: "от дешевых до дорогих", value: "soll" },
    { label: "от дорогих до дешевых ", value: "prime" },
  ];

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<string | undefined>()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlPrice = searchParams.get("price");
   const [isSlider, setIsSlider] = useState<number[]>([urlPrice? Number(urlPrice) : 300]);
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await getFilterMasiveFromDB();
        console.log("filters data:", data);
        const filterDoc = Array.isArray(data) ? data[0] : data;
        setFilters(filterDoc);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchFilters();
  }, []);
  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const data = await getShoesFromDB();
        console.log("shoes data:", data);
        setShoes(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchShoes();
  }, []);

  const filterShoes = shoes.filter((s) => {
    const urlPrice = searchParams.get("price");
    const maxPrice = urlPrice ? Number(urlPrice) : 500;
    const collection = searchParams.get('collection')
   
    if (s.price > maxPrice){
      return false
    }
    
    

    for (const [key] of searchParams.entries()) {
      if(key === "price" || key === 'sort' || key === collection) continue
    
    
      if (searchParams.has(key) && s[key] !== true && s.brand !== key && s.collection !== key && !(Array.isArray(s.collection) ? s.collection.includes(key) : s.collection === key) &&
    !(Array.isArray(s.section) ? s.section.includes(key) : s.section === key)  ) {
        
       return false; 
    }
  }
  return true; 
  
});
const sortedShoes = [...filterShoes].sort((a, b) => {
  if (value === "raiting") {
    return b.rating - a.rating; 
  }
  if (value === "soll") {
    return a.price - b.price; 
  }
  if (value === "prime") {
    return b.price - a.price; 
  }
  return 0; 
});

  const handleFilter = (key: string , value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value); 
    } else {
      params.delete(key); 
    }
    router.push(`${pathname}?${params.toString()}`);
  };

 

  return isLoading ? (
    <div className="m-auto flex items-center justify-between w-[95%] font-bold gap-7 pt-10 ">
      <h1 className="text-[36px]">Загрузка...</h1>
    </div>
  ) : (
    <div>
      <div className="m-auto flex items-center justify-between w-[95%] font-bold gap-7 pt-10 ">
        <h1 className="text-[36px]">Каталог</h1>
        <div className="">
          <Select onValueChange={(val) => setValue(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Сортировать по " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value} >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex  w-[95%] m-auto h-auto">
        <div className=" sticky left-0 top-20 flex items-center gap-3 flex-col w-61 h-full   text-[19px] tracking-wide font-semibold rounded-3xl p-5 md:p-8 lg:p-8  font-sans bg-[#f5f6f8] ">
          <div className="w-50 ">
            <h1 className="text-[22px] ">Фильтр</h1>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-3xl  shadow-sm p-4">
            {filters?.quickFilters?.map((f: any) => (
              <FieldGroup key={f.id} className="mx-auto pb-3 w-46 ">
                <Field orientation="horizontal">
                  <Checkbox
                    checked={searchParams.get(f.id) === f.id}
                    onCheckedChange={(checked) => {
                      handleFilter(f.id, checked ? f.id : "");
                    }}
                    id={f.id}
                    className="w-[24px] h-[24px]"
                    name="terms-checkbox-basic"
                  />
                  <FieldLabel htmlFor={f.id}>{f.label}</FieldLabel>
                </Field>
              </FieldGroup>
            ))}
          </div>

          <div className="w-52 p-5 bg-slate-50 border border-slate-100 rounded-3xl shadow-sm">
            <h4 className="text-sm font-semibold text-slate-700 mb-4">
              Цена от и до:
            </h4>

            <div className="flex items-center justify-between mb-5 text-xs text-slate-500 font-medium">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  от
                </span>
                <span className="text-sm text-slate-800">0 $</span>
              </div>

              <div className="flex flex-col items-center gap-0.5 px-3 py-1 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="text-[9px] text-indigo-500 uppercase tracking-wider font-bold">
                  Выбрано
                </span>
                <span className="text-sm text-indigo-600 font-bold">
                  {Array.isArray(isSlider) ? isSlider[0] : isSlider} ₽
                </span>
              </div>

              <div className="flex flex-col items-end gap-0.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                  до
                </span>
                <span className="text-sm text-slate-800">300 $</span>
              </div>
            </div>

            <div className="px-1">
              <Slider
                onValueCommit={(val) => handleFilter("price", val[0].toString())}
                className="py-2 cursor-pointer"
                onValueChange={setIsSlider}
                defaultValue={[100]}
                value={isSlider}
                min={filters?.priceRange?.min ?? 0}
                max={filters?.priceRange?.max ?? 500}
              />
            </div>
          </div>
          <div className="bg-slate-50 border  border-slate-100 rounded-3xl  shadow-sm p-4">
            {Array.isArray(filters?.brands?.items) &&
              filters.brands.items.map((f: any) => (
                <FieldGroup key={f.id} className="mx-auto pb-3 w-46">
                  <Field orientation="horizontal">
                    <Checkbox

                      id={f.id}
                      checked={searchParams.get(f.id) === f.id}
                      onCheckedChange={(checked) => handleFilter(f.id,  checked ? f.id : '')}
                      className="w-[24px] h-[24px]"
                      name="terms-checkbox-basic"
                    />
                    <FieldLabel htmlFor={f.id}>{f.label}</FieldLabel>
                  </Field>
                </FieldGroup>
              ))}
          </div>
        </div>
        <div className="w-[70%] ml-15">
          <div className="grid grid-cols-6 gap-10   ">
            {sortedShoes.slice(0, 30).map((s: any) => (
              <div key={s.id}>
                <Shoes {...s} />
              </div>
            ))}
          </div>
          <div className="m-auto p-5">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
