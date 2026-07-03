import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../dataBase/firebaseConfig";

// Функция для добавления (её мы уже использовали)

// НОВАЯ ФУНКЦИЯ: Получение всех кроссовок
export const getShoesFromDB = async () => {
  try {
    // Делаем запрос к коллекции "shoes"
    const querySnapshot = await getDocs(collection(db, "categories"));
    
    // Создаем пустой массив, куда сложим готовые данные
    const shoesList: any[] = []; 

    // Перебираем каждый документ, который вернул Firebase
    querySnapshot.forEach((doc) => {
      // doc.data() — это твои поля (name, price и т.д.)
      // doc.id — это уникальный ключ Firebase
      shoesList.push({ id: doc.id, ...doc.data() });
    });

    return shoesList;
  } catch (error) {
    console.error("Ошибка при получении кроссовок:", error);
    return []; // Возвращаем пустой массив при ошибке, чтобы сайт не сломался
  }
};


export const getMasiveCategoriesFromDB = async () => {
  try {
    const querySnapshots = await getDocs(collection(db, `categories`));

    const categoriesList: any[] = [];

    querySnapshots.forEach((doc) =>{
      categoriesList.push({ id: doc.id, ...doc.data() });
    })
    return categoriesList;
  }catch (error) {
    console.error("Ошибка при получении категорий:", error);
    return []; // Возвращаем пустой массив при ошибке, чтобы сайт не сломался
}
}