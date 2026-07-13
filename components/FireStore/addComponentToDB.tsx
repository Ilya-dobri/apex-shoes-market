import { collection, addDoc, getDocs, getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../dataBase/firebaseConfig";


// Функция для добавления (её мы уже использовали)
export const addShoeToDB = async (shoeData: any) => { 
  try {
    const docRef = await addDoc(collection(db, "shoes"), shoeData);
    return docRef.id;
  } catch (error) {
    console.error("Ошибка при добавлении в базу:", error);
    throw error;
  }
};

// НОВАЯ ФУНКЦИЯ: Получение всех кроссовок
export const getShoesFromDB = async () => {
  try {
    // Делаем запрос к коллекции "shoes"
    const querySnapshot = await getDocs(collection(db, "shoes"));
    
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
    querySnapshots.forEach((doc) => {
    
      categoriesList.push({ id: doc.id, ...doc.data() });
    });
    return categoriesList;
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    return [];
  }
};

export const getMasivePanelsFromDB = async () => {
  try {
    const querySnapshots = await getDocs(collection(db, `panels`));
    const categoriesList: any[] = [];
    querySnapshots.forEach((doc) => {
    
      categoriesList.push({ id: doc.id, ...doc.data() });
    });
    return categoriesList;
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    return [];
  }
};
  

export const saveReviewsToDB = async (userId: string, newReview: any) => {
  try{
    const docRef = doc(db, 'shoes', userId)
   await updateDoc(docRef, {
      reviews: arrayUnion(newReview)
    });
  }
   catch (error) {
    console.error("Ошибка при сохранении в БД:", error);
  }
}

export const saveFavoritesToDB = async (userId: string, currentFavorites: any[]) => {
  try {
    const docRef = doc(db, 'favorites', userId);

    // setDoc положит в базу актуальный массив. 
    // Если документа не было — он его создаст.
    await setDoc(docRef, {
      items: currentFavorites
    });
    
  } catch (error) {
    console.error("Ошибка при сохранении в БД:", error);
  }
};
