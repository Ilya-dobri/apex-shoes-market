import React from 'react'

const InfoBadge = () => {
  return (
    // Обертка теперь имеет max-w-[1700px] (или w-full), чтобы соответствовать ширине контента сайта
    <div className="flex justify-center w-full px-4 md:px-8 py-6">
      <div className="  
        flex flex-col bg-[url('./img/firstImg.jpg')] bg-cover bg-center w-full p-6 rounded-2xl gap-8 h-auto
        md:flex-row md:justify-between md:items-center md:p-16 md:min-h-[600px] md:rounded-[48px] md:gap-12
      ">
        {/* ЛЕВАЯ ЧАСТЬ: Контент и кнопки */}
        <div className="flex flex-col justify-between flex-1 h-full">
          <div>
            {/* Тэг */}
            <div className="cursor-default inline-block px-4 py-2 bg-[#f4f3f0e5] rounded-full text-[#3d3a37] text-xs md:text-sm font-medium uppercase tracking-wide opacity-90 mb-4">
              ПРЕМИУМ КОЛЛЕКЦИЯ
            </div>
            
            {/* Заголовок */}
            <div className="bg-gradient-to-b from-zinc-900 via-zinc-600 to-zinc-900 bg-clip-text text-transparent font-bold tracking-tight leading-[1.1] uppercase">
              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl mb-1">Кроссовки</h1>
              <span className="block text-3xl sm:text-5xl md:text-6xl xl:text-7xl mb-1">Для ритма, комфорта</span>
              <span className="block text-3xl sm:text-5xl md:text-6xl xl:text-7xl">И движения по городу</span>
            </div>
            
            {/* Описание */}
            <div className="max-w-[400px] pt-4 md:pt-6">
              <h3 className="text-sm md:text-base text-zinc-800 font-medium leading-relaxed">
                Технологии, стиль и комфорт для каждого шага. Выбирай лучшее для себя и своего ритма.
              </h3>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex flex-wrap gap-4 pt-8 md:pt-12">
            <button className="flex justify-center items-center w-full sm:w-44 h-12 md:h-14 gap-2 bg-[#5A6052] rounded-full text-white hover:bg-[#4b5144] transition-colors cursor-pointer">
              <span className="text-sm font-medium">Каталог</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <button className="flex justify-center items-center w-full sm:w-44 h-12 md:h-14 gap-2 bg-gray-300/80 backdrop-blur-sm rounded-full border border-gray-100 text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-200 cursor-pointer">
              <span className="text-sm font-medium">Новинки</span>
            </button>
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: Карточки преимуществ */}
        {/* Изменено на md:w-[350px] xl:w-[400px] чтобы задать им четкую ширину на больших экранах */}
        <div className="flex items-center justify-center md:justify-end w-full md:w-[350px] xl:w-[400px] mt-6 md:mt-0">
          <div className="flex flex-col gap-4 w-full">
            
            {/* Карточка 1 */}
            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-[24px] md:rounded-[32px] p-5 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full">
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-zinc-100/80 rounded-full flex items-center justify-center text-zinc-700">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M10 17h4V5H2v12h3" />
                  <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h2" />
                  <circle cx="7.5" cy="17.5" r="2.5" />
                  <circle cx="17.5" cy="17.5" r="2.5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] md:text-[16px] font-bold text-zinc-900 leading-tight">
                  Бесплатная доставка
                </span>
                <span className="text-[12px] md:text-[13px] text-zinc-500 mt-0.5">
                  от 7 000 ₽
                </span>
              </div>
            </div>

            {/* Карточка 2 */}
            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-[24px] md:rounded-[32px] p-5 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full">
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-zinc-100/80 rounded-full flex items-center justify-center text-zinc-700">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 2v6h-6" />
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M3 22v-6h6" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] md:text-[16px] font-bold text-zinc-900 leading-tight">
                  Примерка перед оплатой
                </span>
                <span className="text-[12px] md:text-[13px] text-zinc-500 mt-0.5">
                  14 дней на возврат
                </span>
              </div>
            </div>

            {/* Карточка 3 */}
            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-[24px] md:rounded-[32px] p-5 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full">
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-zinc-100/80 rounded-full flex items-center justify-center text-zinc-700">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] md:text-[16px] font-bold text-zinc-900 leading-tight">
                  Оригинальная продукция
                </span>
                <span className="text-[12px] md:text-[13px] text-zinc-500 mt-0.5">
                  Гарантия качества
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default InfoBadge