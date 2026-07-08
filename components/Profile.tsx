'use client'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { auth, db } from '@/dataBase/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import AddProductForm from './FireStore/addProductForm';
import DisplayCard from './CartUiComponent';
import CartUiComponent from './CartUiComponent';
import FavoriteItem from './FavoriteItem';
import useFavoriteStore from './store/useFavoriteStore';
import { get } from 'http';




const Profile = () => {
const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const removeFavorite = useFavoriteStore((state) => state.removeFavorite)
    const [favorite, setFavorite] = useState<any[]>([]);
    const [paidOrders, setPaidOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    
   useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      const uid = currentUser.uid;
     
     
      try {
        const favSnap = await getDoc(doc(db, 'favorites', uid));
        if (favSnap.exists()){
         setFavorite(favSnap.data().items || []);
        }
        const docSnap = await getDoc(doc(db, "users", uid));
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("Документ не найден!");
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
      
      try {
        setLoadingOrders(true);
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', uid), 
          where('status', '==', 'paid')  
        );
        
        const orderSnap = await getDocs(q);
        setPaidOrders(orderSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Ошибка при получении оплаченных заказов:", error);
      } finally {
        setLoadingOrders(false);
      }

    } else {
      // Пользователь не авторизован
      router.push('/authorisation');
      setLoading(false);
    }
  });

  // Очистка подписки при размонтировании
  return () => unsubscribe();
}, [router]);

const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/authorisation');
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

const handleRemoveFavorite = async (itemToRemove: any) => {
        // 1. Оптимистичное обновление UI (сразу убираем с экрана)
        const updatedFavorites = favorite.filter(
            (f) => !(f.id === itemToRemove.id && f.size === itemToRemove.size)
        );
        setFavorite(updatedFavorites);

        // 2. Обновляем Zustand, чтобы иконки обновились в других компонентах
        removeFavorite(itemToRemove);

        // 3. Обновляем Firebase
        const user = auth.currentUser;
        if (user) {
            try {
                const favRef = doc(db, 'favorites', user.uid);
                await updateDoc(favRef, {
                    items: updatedFavorites
                });
            } catch (error) {
                console.error("Ошибка при удалении из Firebase:", error);
                // Если произошла ошибка, по-хорошему тут надо вернуть товар обратно в setFavorite
            }
        }
    };
 return (
    <div className="min-h-screen w-full bg-[#f5f6f8] p-5 text-[#333] font-sans">
      <div className="max-w-[600px] mx-auto bg-white rounded-[30px] p-[40px] shadow-[0_15px_35px_rgba(0,0,0,0.04)] mt-10">
        
        <h1 className="text-[24px] font-semibold text-[#222] mb-6 border-b pb-4">
          Личный кабинет
        </h1>
        
        {userData ? (
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex justify-between items-center bg-[#f0f2f5] p-4 rounded-xl">
              <span className="text-[#888] text-[14px]">Имя:</span>
              <span className="font-semibold text-[16px]">{userData.name}</span>
            </div>
            
            <div className="flex justify-between items-center bg-[#f0f2f5] p-4 rounded-xl">
              <span className="text-[#888] text-[14px]">Email:</span>
              <span className="font-semibold text-[16px]">{userData.email}</span>
            </div>
            
            <div className="flex justify-between items-center bg-[#f0f2f5] p-4 rounded-xl">
              <span className="text-[#888] text-[14px]">Роль:</span>
              <span className="font-semibold text-[16px] uppercase text-[#5a6258]">
                {userData.role}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-center text-[#888]">Нет данных для отображения</p>
        )}

        <button
          onClick={handleLogout}
          className="w-full px-5 py-4 bg-red-50 text-red-600 border border-red-200 rounded-full text-[16px] font-semibold cursor-pointer transition-all duration-300 hover:bg-red-100"
        >
          Выйти из аккаунта
        </button>
      </div>

      {userData?.role === 'admin' ? (
          <div className="p-5 mt-4 bg-green-50 border border-green-200 rounded-2xl">
            <h2 className="font-bold text-green-800 text-lg">Панель администратора</h2>
            <p className="text-sm text-green-700 mb-2">
              Тебе доступны функции управления магазином.
            </p>
            
            {/* Вызываем нашу новую форму! */}
            <AddProductForm />
            
          </div>
        ) : (
          <div className="p-5 mt-4 bg-blue-50 border border-blue-200 rounded-2xl">
            <h2 className="font-bold text-blue-800 mb-2">Мои заказы</h2>
            <p className="text-sm text-blue-600">
              Здесь будут отображаться купленные кроссовки.
            </p>
          </div>
        )}
       <div className="w-full max-w-[850px] mt-10"> {/* Убрали mx-auto и сделали шире */}
  <h2 className="text-[22px] font-semibold text-[#222] mb-5 pl-2">
    История покупок
  </h2>

  {loadingOrders ? (
    // Индикатор загрузки (теперь слева)
    <div className="flex justify-start items-center py-10 pl-2">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5a6258]"></div>
    </div>
  ) : paidOrders.length === 0 ? (
    // Заглушка, если заказов нет (тоже выровнена влево)
    <div className="bg-white rounded-[20px] p-8 text-left shadow-[0_5px_15px_rgba(0,0,0,0.02)] max-w-[600px]">
      <div className="text-[40px] mb-2">🛍️</div>
      <p className="text-[#888] text-[16px] font-medium">Вы еще ничего не купили</p>
      <p className="text-[#aaa] text-[14px] mt-1">Самое время порадовать себя новыми кроссовками!</p>
    </div>
  ) : (
    // Список заказов
    <div className="flex flex-col gap-5">
      {paidOrders.map((order) => (
       <CartUiComponent  key={order.id} order={order} />
      ))}
    </div>
  )}
</div>

       <h1>избраные</h1>
       <div className='flex'>
        
        {favorite.map((f) => (
          <FavoriteItem onRemove={() => handleRemoveFavorite(f)} key={f.id + f.size} product={f} />
        ))}


       </div>
    </div>  

  );
};

export default Profile;