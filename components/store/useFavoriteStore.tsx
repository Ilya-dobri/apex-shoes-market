import { create } from "zustand";
import { CartItem } from "./useCartStore";


type FavoriteState = {
	favorites: CartItem[];
	// addFavorite: (newFavorite: Omit<CartItem, 'quantity'>) => void;
	// removeFavorite: (id: string, size: string, ) => void;
    toggleFavorite: (item: Omit<CartItem, 'quantity'>) => void;
    removeFavorite: (item: Omit<CartItem, 'quantity'>) => void;
};

const useFavoriteStore = create<FavoriteState>((set) => ({
	favorites: [],
      
    toggleFavorite: (item) => set((state) => {
    const exists = state.favorites.some(
        (fav) => fav.id === item.id && fav.size === item.size
    );

    if (exists) {
        // Если уже есть — удаляем
        return {
            favorites: state.favorites.filter(
                (fav) => !(fav.id === item.id && fav.size === item.size)
            )
        };
    } else {
        // Если нет — добавляем
        return {
            favorites: [...state.favorites, { ...item, quantity: 1 }]
        };
    }
}),
removeFavorite: (item) => set((state) => ({
    favorites: state.favorites.filter(
        (fav) => !(fav.id === item.id && fav.size === item.size)
    ),
    
}))

}));    


export default useFavoriteStore;

