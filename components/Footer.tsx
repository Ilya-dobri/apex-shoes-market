import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Верхняя часть с колонками */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* 1. Лого и описание */}
          <div className="col-span-1 md:col-span-1">
           <div className="flex">
             <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-4">
              Apex
            </h2>
            <h2 className=" text-3xl font-extrabold uppercase tracking-tight mb-4 text-gray-500">Store</h2>
           </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Оригинальные кроссовки с доставкой. Твой стиль начинается здесь. 
            </p>
          </div>

          {/* 2. Каталог */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wide">Каталог</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Новинки</Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">Мужская обувь</Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">Женская обувь</Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">Скидки (Sale)</Link>
              </li>
            </ul>
          </div>

          {/* 3. Покупателям */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wide">Помощь</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Доставка и оплата</Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">Условия возврата</Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">Таблица размеров</Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">Контакты</Link>
              </li>
            </ul>
          </div>

          {/* 4. Контакты и соцсети */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wide">Связь с нами</h3>
            <ul className="space-y-3 text-sm text-gray-400 mb-6">
              <li>8 (800) 123-45-67</li>
              <li>hello@kicksstore.ru</li>
              <li>Ежедневно 10:00 - 22:00</li>
            </ul>
          </div>
          
        </div>

        {/* Нижняя полоса с копирайтом */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} KicksStore. Все права защищены.</p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Договор оферты
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;