"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/dataBase/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import AddProductForm from "./FireStore/addProductForm";
import CartUiComponent from "./CartUiComponent";
import FavoriteItem from "./FavoriteItem";
import useFavoriteStore from "./store/useFavoriteStore";
import { ShoppingBag, Heart, User, ShieldCheck } from "lucide-react";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { favorites, fetchFavorites, removeFavorite } = useFavoriteStore();
  
  const [paidOrders, setPaidOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        fetchFavorites();

        try {
          const docSnap = await getDoc(doc(db, "users", uid));
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Ошибка при получении данных:", error);
        } finally {
          setLoading(false);
        }
      
        try {
          setLoadingOrders(true);
          const ordersRef = collection(db, "orders");
          const q = query(
            ordersRef,
            where("userId", "==", uid),
            where("status", "==", "paid")
          );
          const orderSnap = await getDocs(q);
          setPaidOrders(
            orderSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        } catch (error) {
          console.error("Ошибка при получении заказов:", error);
        } finally {
          setLoadingOrders(false);
        }
      } else {
        router.push("/authorisation");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, fetchFavorites]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/authorisation");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f6f8] p-5 md:p-8 lg:p-12 text-[#333] font-sans pb-20">
      

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
       
        <aside className="w-full lg:w-[380px] flex-shrink-0 flex flex-col gap-6 lg:sticky lg:top-8">
          
          
          <div className="bg-white rounded-[30px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#f0f2f5]">
            <div className="flex items-center gap-4 mb-8 border-b pb-6">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={28} className="text-gray-400" />
              </div>
              <div>
                <h1 className="text-[22px] font-bold text-[#222]">
                  Мой профиль
                </h1>
                <p className="text-[#888] text-[14px]">Личный кабинет</p>
              </div>
            </div>

            {userData ? (
              <div className="flex flex-col gap-3 mb-8">
                <div className="bg-[#f8f9fa] p-4 rounded-2xl">
                  <span className="block text-[#888] text-[12px] uppercase tracking-wide font-semibold mb-1">Имя</span>
                  <span className="font-semibold text-[16px] text-[#222]">{userData.name}</span>
                </div>

                <div className="bg-[#f8f9fa] p-4 rounded-2xl">
                  <span className="block text-[#888] text-[12px] uppercase tracking-wide font-semibold mb-1">Email</span>
                  <span className="font-semibold text-[16px] text-[#222]">
                    {userData.email}
                  </span>
                </div>
              </div>
            ) : (
              <div className="animate-pulse flex flex-col gap-4 mb-8">
                <div className="h-16 bg-gray-100 rounded-2xl w-full"></div>
                <div className="h-16 bg-gray-100 rounded-2xl w-full"></div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full px-5 py-4 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-100 hover:border-red-500 rounded-2xl text-[16px] font-semibold transition-all duration-300"
            >
              Выйти из аккаунта
            </button>
          </div>

        
          {userData?.role === "admin" ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-[30px] shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="text-green-600" size={24} />
                <h2 className="font-bold text-green-800 text-lg">
                  Панель управления
                </h2>
              </div>
              <p className="text-sm text-green-700 mb-6">
                Вы вошли как администратор. Добавление новых товаров доступно ниже.
              </p>
              <div className="bg-white p-4 rounded-2xl border border-green-100">
                <AddProductForm />
              </div>
            </div>
          ) : (
            <div className="p-6 bg-[#222] text-white rounded-[30px] shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-bold text-[18px] mb-2">Добро пожаловать!</h2>
                <p className="text-[14px] text-gray-300">
                  Здесь хранится вся информация о ваших покупках и избранных кроссовках.
                </p>
              </div>
              
              <div className="absolute -right-8 -bottom-8 text-white/5">
                <ShoppingBag size={120} />
              </div>
            </div>
          )}
        </aside>

        
        <main className="flex-1 flex flex-col gap-12 w-full">
          
        
          <section className="bg-white p-6 md:p-10 rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-[#f0f2f5]">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gray-100 rounded-2xl">
                <ShoppingBag className="text-[#222]" size={26} />
              </div>
              <h2 className="text-[26px] font-bold text-[#222]">
                История покупок
              </h2>
            </div>

            {loadingOrders ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#222]"></div>
              </div>
            ) : paidOrders.length === 0 ? (
              <div className="bg-[#f8f9fa] rounded-[24px] py-16 px-6 text-center border border-dashed border-gray-300">
                <div className="text-[56px] mb-4 opacity-80">🛍️</div>
                <p className="text-[#222] text-[20px] font-bold mb-2">
                  Вы еще ничего не заказали
                </p>
                <p className="text-[#888] text-[16px] max-w-[400px] mx-auto">
                  Сделайте свою первую покупку, и информация о ней появится в этом разделе.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {paidOrders.map((order) => (
                  <div key={order.id} className="transition-transform duration-300 hover:-translate-y-1">
                    <CartUiComponent order={order} />
                  </div>
                ))}
              </div>
            )}
          </section>

          
          <section className="bg-white p-6 md:p-10 rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-[#f0f2f5]">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-50 rounded-2xl">
                <Heart className="text-red-500 fill-red-500" size={26} />
              </div>
              <div className="flex items-center gap-3">
                <h2 className="text-[26px] font-bold text-[#222]">
                  Избранное
                </h2>
                {favorites.length > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    {favorites.length}
                  </span>
                )}
              </div>
            </div>

            {favorites.length === 0 ? (
              <div className="bg-[#f8f9fa] rounded-[24px] py-16 px-6 text-center border border-dashed border-gray-300">
                <div className="text-[56px] mb-4 opacity-80">🤍</div>
                <p className="text-[#222] text-[20px] font-bold mb-2">
                  В избранном пока пусто
                </p>
                <p className="text-[#888] text-[16px] max-w-[400px] mx-auto">
                  Сохраняйте понравившиеся кроссовки, чтобы не потерять их и вернуться к покупке позже.
                </p>
              </div>
            ) : (
             
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {favorites.map((f) => (
                  <FavoriteItem
                  cart={true}
                    rating={f.rating}
                    size={f.size}
                    onRemove={() => removeFavorite(f)}
                    key={f.id + f.size}
                    product={f}
                  />
                ))}
              </div>
            )}
          </section>
          
        </main>
      </div>
    </div>
  );
};

export default Profile;