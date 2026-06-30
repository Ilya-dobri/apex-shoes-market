import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UseSportsStoreType } from "../types/types";



const useSportsStore = create<UseSportsStoreType>()(
  persist(
    (set) => ({
      users: [
        {
          username: "",
          userPassword: 0,
        },
      ],
      isLoading: false,
      products: [
        {
          productName: "",
          productPrice: 0,
          productId: null,
          categoryId: 0
        },
      ],
      cart: 0,
      errors: [],
      buttonIDs: null, // Начальное значение - ничего не выбрано
      addButtonId: (buttonId) => set(() => ({ buttonIDs: buttonId })),
    }),
    {
      name: "sports-storage", // Уникальное имя ключа, под которым данные будут лежать в localStorage
    }
  )
);

export default useSportsStore