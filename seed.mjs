import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import fs from "fs";

// 1. Твои ключи от Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA7TiJjIF0Lo7Unrtrx4Co0qFFUGMfY20c",
  authDomain: "apex-store-for-shoes.firebaseapp.com",
  projectId: "apex-store-for-shoes",
  storageBucket: "apex-store-for-shoes.firebasestorage.app",
  messagingSenderId: "69047670255",
  appId: "1:69047670255:web:e0b9c61fa93c6986c1d21a"
};

// 2. Инициализация
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



async function clearCollection(collectionName) {
  console.log(`🗑️ Начинаю очистку коллекции: ${collectionName}...`);
  
  // Получаем все документы из указанной коллекции
  const querySnapshot = await getDocs(collection(db, collectionName));
  
  // Проходимся по каждому и удаляем
  for (const document of querySnapshot.docs) {
    await deleteDoc(doc(db, collectionName, document.id));
  }
  
  console.log(`✅ Коллекция ${collectionName} успешно очищена!`);
}



// 3. Читаем твой JSON-файл из папки dataBase


// 4. Функция загрузки
async function uploadData() {
const rawData = fs.readFileSync("./dataBase/shoe.json", "utf-8");
const shoesData = JSON.parse(rawData);
  
await clearCollection("shoes");

  for (let i = 0; i < shoesData.length; i++) {
    const shoe = shoesData[i];
    
    // Убираем старый ID, Firebase выдаст свой
    const { id, ...cleanData } = shoe;
    
    try {
      await addDoc(collection(db, "shoes"), cleanData);
     
    } catch (error) {
      console.error(`❌ Ошибка загрузки товара ${i + 1}:`, error);
    }
  }
  
  console.log("🎉 Готово! Все кроссовки успешно залиты в базу!");
  process.exit(); // Завершаем работу скрипта
}
async function uploadCategories() {
  const rawData = fs.readFileSync("./dataBase/categories.json", "utf-8");
  const categoriesData = JSON.parse(rawData);

  await clearCollection("categories");
 
    for (let i = 0; i < categoriesData.length; i++) {
      const category = categoriesData[i]
        const { id, ...cleanData } = category;z
        try {
            await addDoc(collection(db, "categories"), cleanData);
            } catch (error) {
      console.error(`❌ Ошибка загрузки товара ${i + 1}:`, error);
    }
}
 console.log("🎉 Готово! Все кроссовки успешно залиты в базу!");
  process.exit(); // Завершаем работу скрипта
  }
  


// Запускаем
//  uploadData();
uploadCategories();