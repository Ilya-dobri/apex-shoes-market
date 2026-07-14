"use client";

import React, { useState } from "react";
import ProductActions from "./ProductActions";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
 
} from "./ui/carousel";
import { Button } from "./ui/button";
import { saveReviewsToDB } from "./FireStore/addComponentToDB";
import { getAuth } from "firebase/auth";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import FavoriteItem from "./FavoriteItem";
import useFavoriteStore from "./store/useFavoriteStore";

const ProductCart = ({ product }: any) => {
  const [input, setInput] = useState("");
  const avgRating =
    product.reviews?.length > 0
      ? (
          product.reviews.reduce((s: any, r: any) => s + r.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : 0;
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [photo, setPhoto] = useState(product.imageUrl[0] || "");
  const [file, setFile] = useState(null);
  const imagesArray = Array.isArray(product.imageUrl)
    ? product.imageUrl
    : [product.imageUrl];
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const isFavorite = favorites.some((fav) => fav.id === String(product.id));
  const onClickDataInFB = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Пожалуйста, войдите в аккаунт, чтобы оставить отзыв");
      return;
    }
    const newReview = {
      userName: user.displayName || user.email || "Аноним",
      rating,
      comment: input,
      imgUser: file || null,
      createdAt: new Date().toISOString(),
    };
    saveReviewsToDB(product.id, newReview);
    setInput("");
    setRating(0);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800; 
        let width = img.width;
        let height = img.height;

       
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          setFile(compressedBase64 as any); 
        }
      };
    };
    reader.readAsDataURL(selectedFile);
  };
  const handleHeartClick = () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("Войдите в аккаунт, чтобы добавлять товары в избранное!");
      return;
    }

  
    if (toggleFavorite) {
      toggleFavorite(product);
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-4">
      <Link
        href="/catalog"
        className="text-gray-500 hover:text-black mb-6 inline-block"
      >
        ← Назад в каталог
      </Link>

   
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="flex gap-4">
          <div className="w-auto relative top-15">
            <Carousel orientation="vertical" className="h-[400px]">
              <CarouselContent className="h-[400px]">
                {imagesArray.map((img: string, i: number) => (
                  <CarouselItem key={i} className="basis-1/7">
                    <img
                      src={img}
                      className="w-[80px] h-[80px] border rounded object-cover cursor-pointer"
                      onClick={() => setPhoto(img)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="relative bg-[#F8F9FA] rounded-[24px] flex-1 flex items-center justify-center">
            <img
              src={photo}
              className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply"
            />
            <button
              onClick={handleHeartClick}
              className={`absolute top-5  right-5 z-100 p-3  rounded-full shadow-md transition-colors ${
                isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            >
              <svg
                width="24"
                height="24"
                fill={isFavorite ? "currentColor" : "none"} 
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold uppercase mb-4">{product.name}</h1>
          <div className="text-2xl font-extrabold mb-6">
            {product.price.toLocaleString("uk-UA")}
          </div>
          <div className="text-amber-500">★{avgRating}</div>
          <ProductActions product={product} />
        </div>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t pt-10">
      
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Отзывы ({product.reviews?.length || 0})
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Оставить отзыв</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ваш отзыв о товаре</DialogTitle>
                </DialogHeader>

                <div className="flex  flex-col gap-4 py-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-xl ${rating && star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <textarea
                    placeholder="Что вы думаете об этом товаре?"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <input
                    type="file"
                    id="photoInput"
                    onChange={handleFileChange}
                  />
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        onClickDataInFB();
                      }}
                    >
                      Отправить отзыв
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {product.reviews?.map((r: any, i: number) => (
              <div key={i} className="bg-white p-4 border rounded-lg shadow-sm">
                <span className="text-yellow-400">{"★".repeat(r.rating)}</span>
                <div className="font-bold">{r.userName}</div>
                <p>{r.comment}</p>
                {r.imgUser && (
                  <img
                    src={r.imgUser}
                    alt="Фото отзыва"
                    className="mt-2 max-w-[150px] max-h-[150px] rounded-lg object-cover border"
                  />
                )}
              </div>
            ))}
          </div>
        </div>


        <div className="lg:col-span-1">
          <div className="sticky top-24 border p-4 rounded-xl">
            <h3 className="font-bold mb-4">Выбранный товар</h3>
            <FavoriteItem
              product={product}
              size="M"
              cart={false}
              rating={Number(avgRating)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
