"use client";

import React, { useState } from "react";
import ProductActions from "./ProductActions";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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

  const imagesArray = Array.isArray(product.imageUrl)
    ? product.imageUrl
    : [product.imageUrl];

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
      createdAt: new Date().toISOString(),
    };
    saveReviewsToDB(product.id, newReview);
    setInput("");
    setRating(0);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Link
        href="/catalog"
        className="text-gray-500 hover:text-black mb-6 inline-block"
      >
        ← Назад в каталог
      </Link>

      {/* Верхняя часть (Картинка + Описание) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="flex gap-4">
          <Carousel orientation="vertical" className="h-[400px]">
            <CarouselContent className="h-[400px]">
              {imagesArray.map((img: string, i: number) => (
                <CarouselItem key={i}>
                  <img
                    src={img}
                    className="w-[80px] h-[80px] border rounded object-cover cursor-pointer"
                    onClick={() => setPhoto(img)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="bg-[#F8F9FA] rounded-[24px] flex-1 flex items-center justify-center">
            <img
              src={photo}
              className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply"
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold uppercase mb-4">{product.name}</h1>
          <div className="text-2xl font-extrabold mb-6">
            {product.price.toLocaleString("uk-UA")}
          </div>
          <div>{avgRating}</div>
          <ProductActions product={product} />
        </div>
      </div>

      {/* НИЖНЯЯ ЧАСТЬ: Отзывы и FavoriteItem рядом */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t pt-10">
        {/* Отзывы (занимают 2 колонки) */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Отзывы ({product.reviews?.length || 0})
            </h2>
            <Dialog>
             <DialogTrigger asChild><Button>Оставить отзыв</Button></DialogTrigger>

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
                <span className="text-yellow-400">

                        {"★".repeat(r.rating)}

                      </span>
                <div className="font-bold">{r.userName}</div>
                <p>{r.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FavoriteItem (стоит слева/параллельно отзывам на десктопе) */}
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
