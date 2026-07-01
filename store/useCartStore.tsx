import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
}

interface CartState {
  amount: number;
  items: CartItem[];
 
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

}

const useCartStore = create<CartState>((set) => ({
  items: [],
  amount: 0,
  addItem: (newItem) =>
    set((state) => {
      
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === newItem.id
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
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      amount: state.amount - 1,
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
}));

export default useCartStore
