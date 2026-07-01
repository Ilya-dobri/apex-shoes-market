import React from 'react'

const InfoBadge = () => {
  return (
    <div className="flex justify-center   w-1vh ">
        <div className="flex justify-between m-3 bg-[url(./img/firstImg.jpg)] w-[85%] min-h-190 bg-cover rounded-4xl">
          <div className="p-15  w-[40%]">
            <div className="cursor-default inline-block px-4 py-2 bg-[#f4f3f0e5] rounded-full text-[#3d3a37] text-sm font-medium uppercase tracking-wide opacity-90">
              ПРЕМИУМ КОЛЕКЦИЯ
            </div>
            <div className="w-fit bg-gradient-to-b pt-7  from-zinc-900 via-zinc-400 to-zinc-900 bg-clip-text text-transparent font-bold tracking-tight leading-none uppercase">
              <h1 className="text-6xl">Кроссовки</h1>
              <h1 className="text-7xl">Для ритма, комфорта</h1>
              <h1 className="text-7xl">И движения по городу</h1>
            </div>
            <div className="w-70 pt-6">
              <h3>
                Tехнологии, стиль и комфорт для каждого шага. Выбирай лучшее для
                себя и своего ритма
              </h3>
            </div>
            <div className="flex gap-5 pt-15">
              <button className="flex justify-center items-center  w-40 h-15 gap-2  bg-[#5A6052] rounded-full text-white hover:bg-[#4b5144] transition-colors">
                {/* <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path> */}

                <span className="text-sm font-medium">Каталог</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right-icon lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              <button className="flex justify-center items-center w-40 h-14 gap-2 curs bg-gray-300 rounded-full border border-gray-100 text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-200">
     
                <span className="text-sm font-medium">Новинки</span>
              </button>
            </div>
          </div>
          <div className=" flex justify-end   w-[30%]">
            <div>
              <div className="flex flex-col pt-30 px-10 gap-3 w-max">
               
                <div className="flex h-30 shadow-zinc-300 items-center gap-4 bg-white/90 backdrop-blur-md rounded-[32px] p-4 pr-12 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className=" flex-shrink-0 w-15 h-15 bg-zinc-100/80 rounded-full flex items-center justify-center text-zinc-700">
                    <svg
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 17h4V5H2v12h3" />
                      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h2" />
                      <circle cx="7.5" cy="17.5" r="2.5" />
                      <circle cx="17.5" cy="17.5" r="2.5" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-zinc-900 leading-tight">
                      Бесплатная доставка
                    </span>
                    <span className="text-[13px] text-zinc-500 mt-0.5">
                      от 7 000 ₽
                    </span>
                  </div>
                </div>

                
                <div className="flex items-center shadow-zinc-300 h-30 gap-4 bg-white/90 backdrop-blur-md rounded-[32px] p-4 pr-12 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="flex-shrink-0 w-[52px] h-[52px] bg-zinc-100/80 rounded-full flex items-center justify-center text-zinc-700">
                    <svg
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 2v6h-6" />
                      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                      <path d="M3 22v-6h6" />
                      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-zinc-900 leading-tight">
                      Примерка перед оплатой
                    </span>
                    <span className="text-[13px] text-zinc-500 mt-0.5">
                      14 дней на возврат
                    </span>
                  </div>
                </div>

              
                <div className="flex items-center gap-4 shadow-zinc-300 h-30 bg-white/90 backdrop-blur-md rounded-[32px] p-4 pr-12 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="flex-shrink-0 w-[52px] h-[52px] bg-zinc-100/80 rounded-full flex items-center justify-center text-zinc-700">
                    <svg
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-zinc-900 leading-tight">
                      Оригинальная продукция
                    </span>
                    <span className="text-[13px] text-zinc-500 mt-0.5">
                      Гарантия качества
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default InfoBadge
