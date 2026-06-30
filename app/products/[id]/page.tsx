
import Link from 'next/link';


import shoesData from '../../dataBase/shoe.json';


const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  
  
  const resolvedParams = await params;
  const currentId = resolvedParams.id;


  const product = shoesData.find((shoe) => String(shoe.id) === String(currentId));

 
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Упс, такой кроссовок не найден 😢</h1>
        <Link href="/" className="text-blue-500 hover:underline">Вернуться на главную</Link>
      </div>
    );
  }

  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link href="/" className="text-gray-500 hover:text-black mb-6 inline-block">
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
            {product.price.toLocaleString('ru-RU')} ₽
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-400">★</span>
            <span className="font-bold">{product.rating}</span>
          </div>

          <div>
            <h3 className="font-bold mb-2">Доступные размеры:</h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <span key={size} className="border border-gray-300 rounded-lg px-4 py-2 hover:border-black cursor-pointer">
                  {size}
                </span>
              ))}
            </div>
          </div>
          
          <button className="mt-8 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;