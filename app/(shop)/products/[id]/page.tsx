import Link from 'next/link';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '@/dataBase/firebaseConfig';
import ProductCart from '@/components/ProductCart';

export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, "shoes"));
   
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
    // ВАЖНО: передаем данные о кроссовке внутрь компонента!
    <ProductCart product={product} />
  );
};

export default ProductPage;