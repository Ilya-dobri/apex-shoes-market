'use client'


import { Categories } from '@/types/types'
import React from 'react'
import { motion } from 'framer-motion'

const CategoriesUnderShoes = ({ title, description, image }: Categories) => {


   return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative w-full max-w-[800px] h-[150px] sm:h-[400px] rounded-[2rem] overflow-hidden shadow-lg group odd:self-start even:self-end"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-right"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fa] via-[#f8f9fa]/90 to-transparent w-full md:w-3/4"></div>

      <div className="relative z-10 h-full flex flex-col justify-center p-10 sm:p-14 w-full md:w-[60%]">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-wide uppercase">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-gray-500 md:mb-10 max-w-xs leading-relaxed">
          {description}
        </p>

        <div>
          <a href="#" className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-500 hover:text-gray-900 transition-colors">
            Смотреть
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default CategoriesUnderShoes