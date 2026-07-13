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

  const entries = Object.values(categoriesData); // <-- вот это меняем

  for (let i = 0; i < entries.length; i++) {
    const category = entries[i];
    const { id, ...cleanData } = category;
    try {
      await addDoc(collection(db, "categories"), cleanData);
    } catch (error) {
      console.error(`❌ Ошибка загрузки товара ${i + 1}:`, error);
    }
  }

  console.log("🎉 Готово! Все кроссовки успешно залиты в базу!");
  process.exit();
}


async function uploadPanels() {
 const rowData = fs.readFileSync("dataBase/panels.json", "utf-8");
  const panelsData = JSON.parse(rowData)

  await clearCollection("panels")

  for (let i = 0; i < panelsData.length; ++i){
    const panels = panelsData[i]

    const { id, ...cleanData } = panels;

    try {
      await addDoc(collection(db, "panels"), cleanData);
     
    } catch (error) {
      console.error(`❌ Ошибка загрузки товара ${i + 1}:`, error);
    }
  
  }
}
  


// Запускаем
 uploadData();
// uploadCategories();
// uploadPanels()