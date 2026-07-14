import { create } from "zustand";
// Импортируем Firebase прямо в Zustand!
import { auth, db } from '@/dataBase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { CartItem } from "./useCartStore";
import { persist } from "zustand/middleware";

type FavoriteState = {
    favorites: CartItem[];
    fetchFavorites: () => Promise<void>; 
    toggleFavorite: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
    removeFavorite: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
};


const useFavoriteStore = create<FavoriteState>()(
    persist(
        (set, get) => ({
    
    favorites: [],
      
 
    fetchFavorites: async () => {
        const user = auth.currentUser; 
        if (!user) return;
        
        try {
            const favSnap = await getDoc(doc(db, 'favorites', user.uid));
            if (favSnap.exists()) {
                set({ favorites: favSnap.data().items || [] });
            }
        } catch (error) {
            console.error("Ошибка загрузки избранного:", error);
        }
    },

 
    removeFavorite: async (item) => {
        const user = auth.currentUser;
        
       
        const currentFavorites = get().favorites;
        
       
        const updatedFavorites = currentFavorites.filter(
            (fav) => !(fav.id === item.id && fav.size === item.size)
        );
        set({ favorites: updatedFavorites });


        if (user) {
            try {
                const favRef = doc(db, 'favorites', user.uid);
                await updateDoc(favRef, { items: updatedFavorites });
            } catch (error) {
                console.error("Ошибка при удалении из БД:", error);
            }
        }
    },
    
   
    toggleFavorite: async (item) => {
        const user = auth.currentUser;
        const currentFavorites = get().favorites;
        
        const exists = currentFavorites.some(
            (fav) => fav.id === item.id
        );

        let updatedFavorites;
        if (exists) {
            updatedFavorites = currentFavorites.filter(
                (fav) => !(fav.id === item.id )
            );
        } else {
            updatedFavorites = [...currentFavorites, { ...item, quantity: 1 }];
        }

        set({ favorites: updatedFavorites });

       
        if (user) {
            const favRef = doc(db, 'favorites', user.uid);
            await updateDoc(favRef, { items: updatedFavorites });
        }
    },
       
}),
 {
      name: "favorite-storage", 
    }
));      

export default useFavoriteStore;