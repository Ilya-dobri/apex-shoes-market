'use client'


import useCartStore from '@/store/useCartStore';
import Link from 'next/link'
import React from 'react'

const page = () => {
 const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
 return (
    <div>
      <h2>Корзина</h2>
      {items.length === 0 ? <p>Пусто</p> : null}
      
      <ul>
        {items.map((item) => (
          <li key={`${item.id}-${item.size}`}>
            {item.name}, {item.size} — {item.quantity} -  шт. 
            <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>-</button>
            <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
            <button onClick={() => removeItem(item.id, item.size)}>Удалить</button>
          </li>
        ))}
      </ul>

      <h3>Итого: {totalPrice} ₴</h3>
    </div>
  );
};


export default page
