
import Link from 'next/link';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '@/dataBase/firebaseConfig';

import ProductActions from '@/components/ProductActions';


export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, "shoes"));
  
  // Берем id документов прямо из Firebase Firestore
  return querySnapshot.docs.map((doc) => ({
    id: doc.id, 
  }));
}
 
const ProductPage = async ({ params }: any) => {
 

  const resolvedParams = await params;
  const currentId = resolvedParams.id;


const docRef = doc(db, "shoes", currentId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Упс, такой кроссовок не найден 😢</h1>
        <Link href="/" className="text-blue-500 hover:underline">Вернуться на главную</Link>
      </div>
    );
  }
  
  const product = { id: docSnap.id, ...docSnap.data() } as any;
  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link href="/catalog" className="text-gray-500 hover:text-black mb-6 inline-block">
        ← Назад в каталог
      </Link>
      
      <div className="grid grid-cols-2 gap-8 items-start">
        {/* Картинка */}
        <div className="bg-[#F8F9FA] rounded-[24px] p-8 flex items-center justify-center">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Информация */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-400 mb-2">Артикул: {product.id}</p>
          <h1 className="text-3xl font-bold uppercase text-gray-900 mb-4">
            {product.name}
          </h1>
          
          <div className="text-2xl font-extrabold text-gray-900 mb-6">
            {product.price.toLocaleString('uk-UA')} 
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-400">★</span>
            <span className="font-bold">{product.rating}</span>
          </div>

          <div>
           
           
          </div>
          <ProductActions product={product} />
        
        </div>
      </div>
    </div>
  );
};

export default ProductPage;