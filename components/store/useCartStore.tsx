import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  imageUrl: string;
}

interface CartState {
  amount: number;
  items: CartItem[];
 
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: string, imageUrl: string) => void;
  updateQuantity: (id: string, size: string, quantity: number ) => void;
  clearCart: () => void;

}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      amount: 0,
      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id && item.size === newItem.size && item.imageUrl === newItem.imageUrl);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id && item.size === newItem.size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { ...newItem, quantity: 1 }],
            amount: state.amount + 1,
          };
        }),
     removeItem: (id, size, imageUrl) =>
  set((state) => {
    const target = state.items.find((item) => item.id === id && item.size === size && item.imageUrl === imageUrl);
    if (!target) return state;

    if (target.quantity > 1) {
      return {
        items: state.items.map((item) =>
          item.id === id && item.size === size && item.imageUrl === imageUrl
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        amount: state.amount - 1, 
      };
    }
 

    return {
      items: state.items.filter((item) => !(item.id === id && item.size === size && item.imageUrl === imageUrl)),
      amount: state.amount - target.quantity, 
    };
  }),
      updateQuantity: (id, size, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.size === size ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "sports-storage", 
    }
  )
);

export default useCartStore
