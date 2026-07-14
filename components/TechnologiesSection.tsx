import React from 'react'

const TechnologiesSection = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto py-10 px-6">
  <h2 className="text-zinc-900 font-bold text-lg md:text-xl uppercase tracking-wide mb-6">
    Технологии для твоего движения
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
    
    
    <div className="flex flex-col items-center text-center bg-[#fafafa] rounded-[24px] p-6 hover:bg-[#f4f4f4] transition-colors">
      <div className="text-zinc-600 mb-4 h-12 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 16v-2.38C4 11.5 5.97 9 8.5 9h3M20 16v-2.5c0-1.5-1-3.5-3-3.5h-5.5" />
          <path d="M4 16h16v1.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V16z" />
          <path d="M14 5l1 1-1 1" />
        </svg>
      </div>
      <h3 className="text-zinc-900 font-bold text-[13px] uppercase tracking-wide mb-2">
        AERO FOAM
      </h3>
      <p className="text-zinc-500 text-[12px] leading-relaxed max-w-[140px]">
        Лёгкая пена для максимальной амортизации
      </p>
    </div>

    <div className="flex flex-col items-center text-center bg-[#fafafa] rounded-[24px] p-6 hover:bg-[#f4f4f4] transition-colors">
      <div className="text-zinc-600 mb-4 h-12 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10a8 8 0 0 1 16 0c0 4-4 10-8 10s-8-6-8-10z" />
          <path d="M12 14v.01" />
          <path d="M8 9l8 4" />
        </svg>
      </div>
      <h3 className="text-zinc-900 font-bold text-[13px] uppercase tracking-wide mb-2">
        FLEX MOTION
      </h3>
      <p className="text-zinc-500 text-[12px] leading-relaxed max-w-[140px]">
        Гибкие зоны для естественного движения стопы
      </p>
    </div>

   
    <div className="flex flex-col items-center text-center bg-[#fafafa] rounded-[24px] p-6 hover:bg-[#f4f4f4] transition-colors">
      <div className="text-zinc-600 mb-4 h-12 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 8l8 8" />
          <path d="M16 8l-8 8" />
          <path d="M12 4v16" />
          <path d="M4 12h16" />
        </svg>
      </div>
      <h3 className="text-zinc-900 font-bold text-[13px] uppercase tracking-wide mb-2">
        GRIP CONTROL
      </h3>
      <p className="text-zinc-500 text-[12px] leading-relaxed max-w-[140px]">
        Надёжное сцепление на любых поверхностях
      </p>
    </div>

    
    <div className="flex flex-col items-center text-center bg-[#fafafa] rounded-[24px] p-6 hover:bg-[#f4f4f4] transition-colors">
      <div className="text-zinc-600 mb-4 h-12 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 12h.01M12 12h.01M16 12h.01M8 16h8M12 8V4" />
          <path d="M10 6l2-2 2 2" />
          <path d="M4 14c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v4H4v-4z" />
        </svg>
      </div>
      <h3 className="text-zinc-900 font-bold text-[13px] uppercase tracking-wide mb-2">
        BREATH TECH
      </h3>
      <p className="text-zinc-500 text-[12px] leading-relaxed max-w-[140px]">
        Дышащие материалы для комфорта в любую погоду
      </p>
    </div>

    
    <div className="flex flex-col items-center text-center bg-[#fafafa] rounded-[24px] p-6 hover:bg-[#f4f4f4] transition-colors">
      <div className="text-zinc-600 mb-4 h-12 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 4v12a2 2 0 0 0 2 2h8" />
          <path d="M15 14h4v4h-4z" />
          <path d="M5 14v4" />
        </svg>
      </div>
      <h3 className="text-zinc-900 font-bold text-[13px] uppercase tracking-wide mb-2">
        HEEL SUPPORT
      </h3>
      <p className="text-zinc-500 text-[12px] leading-relaxed max-w-[140px]">
        Поддержка пятки для уверенности в каждом шаге
      </p>
    </div>

  
    <div className="flex flex-col items-center text-center bg-[#fafafa] rounded-[24px] p-6 hover:bg-[#f4f4f4] transition-colors">
      <div className="text-zinc-600 mb-4 h-12 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>
      <h3 className="text-zinc-900 font-bold text-[13px] uppercase tracking-wide mb-2">
        ECO MATERIALS
      </h3>
      <p className="text-zinc-500 text-[12px] leading-relaxed max-w-[140px]">
        Экологичные материалы для лучшего будущего планеты
      </p>
    </div>

  </div>
</div>
  )
}

export default TechnologiesSection
