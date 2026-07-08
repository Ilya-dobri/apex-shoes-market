type CartUiComponentType = {
  order: {
    id: string;

    updatedAt?: { seconds: number };

    products?: Array<{ imageUrl: string }>;

    totalAmount?: number;
  };
};

const CartUiComponent = ({ order }: CartUiComponentType) => {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_5px_15px_rgba(0,0,0,0.03)] border border-[#f0f2f5] transition-transform duration-300 hover:-translate-y-1 w-full">
      {/* Шапка карточки: Дата и Статус */}

      <div className="flex justify-between items-center border-b border-[#f0f2f5] pb-4 mb-4">
        <div>
          <p className="text-[13px] text-[#888] mb-1 font-medium uppercase tracking-wider">
            {order.updatedAt?.seconds
              ? new Date(order.updatedAt.seconds * 1000).toLocaleDateString(
                  "ru-RU",
                  { day: "numeric", month: "long", year: "numeric" },
                )
              : "Дата неизвестна"}
          </p>

          <p className="font-semibold text-[18px] text-[#222]">
            Заказ № {order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>

        <span className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-[13px] font-bold tracking-wide">
          ОПЛАЧЕН
        </span>
      </div>

      {/* Тело карточки: Информация о товарах */}

      <div className="mb-5 px-1">
        <p className="text-[15px] text-[#555]">
          {order.products
            ? `Количество товаров: ${order.products.length}`
            : "Кроссовки (детали в базе)"}
        </p>

        {order.products && order.products[0]?.imageUrl && (
          <div className="mt-4">
            <img
              src={order.products[0].imageUrl}
              alt="Фото товара"
              className="w-24 h-24 object-cover rounded-2xl border border-gray-200 shadow-sm"
            />
          </div>
        )}
      </div>

      {/* Подвал карточки: Итог */}

      <div className="flex justify-between items-center bg-[#f9fafb] p-4 rounded-xl border border-[#f0f2f5]">
        <span className="text-[15px] text-[#888] font-medium">
          Сумма заказа:
        </span>

        <span className="font-bold text-[20px] text-[#222]">
          {order.totalAmount
            ? `${order.totalAmount.toLocaleString("ru-RU")} ₽`
            : "---"}
        </span>
      </div>
      
    </div>
  );
};

export default CartUiComponent;