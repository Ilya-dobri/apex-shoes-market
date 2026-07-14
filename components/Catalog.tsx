  import React from 'react'

  const Catalog = ({ product, title}: any) => {
    return (
      <div className="p-6 font-sans">
        {/* Хлебные крошки или название категории, куда перешел пользователь */}
        <div className="mb-6 bg-gray-50 p-4 rounded-xl">
          <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Вы находитесь в категории:</span>
          <h1>{product?.[0]?.brand || title}</h1>
  <h1>{product?.[0]?.collection || ""}</h1>
        </div>

        {/* Список товаров в этой категории */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.length > 0 ? (
            product.map((item: any) => (
              <div key={item.id} className="border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                {item.imageUrl && (
                  <img src={item.imageUrl[0]} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-3" />
                )}
                <h2 className="font-semibold text-gray-800 text-lg">{item.name}</h2>
                <p className="text-gray-500 font-medium mt-1">{item.price} $</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-full py-10 text-center">В этой категории пока нет товаров.</p>
          )}
        </div>
      </div>
    );
  };

  export default Catalog
