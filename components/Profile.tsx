
'use client'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { auth, db } from '@/dataBase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import AddProductForm from './FireStore/addProductForm';
const Profile = () => {
const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    // onAuthStateChanged следит за тем, авторизован ли пользователь
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Пользователь вошел! Берем его uid
        const uid = currentUser.uid;
        
        try {
          // Делаем запрос к коллекции "users", ищем документ с ID = uid
          
          const docSnap = await getDoc(doc(db, "users", uid));

          if (docSnap.exists()) {
            // Данные найдены! Сохраняем их в состояние
            setUserData(docSnap.data());
          } else {
            console.log("Документ не найден!");
          }
        } catch (error) {
          console.error("Ошибка при получении данных:", error);
        } finally {
          setLoading(false); // Выключаем загрузку
        }
      } else {
        // Если пользователь не авторизован, перекидываем на страницу входа
        router.push('/authorisation');
        setLoading(false);
      }
    });

    // Очистка подписки при размонтировании
    return () => unsubscribe();
  }, []);
const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/authorisation');
    } catch (error) {
      console.error("Ошибка при выходе:", error);
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
    </div>
  );
};

export default Profile;