'use client' // Обязательно, так как используем библиотеку анимации

import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { CheckCircle2Icon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion' // Импортируем магию анимации

interface AlertComponentProps {
  title: string;
  description: string;
  isVisible: boolean; 
}

const AlertComponent = ({ title, description, isVisible }: AlertComponentProps) => {
  return (
    // AnimatePresence следит за тем, когда компонент 'выходит' из DOM,
    // чтобы запустить анимацию exit.
    <AnimatePresence>
      {isVisible && (
        // Заменяем обычный div на motion.div.
        // Теперь мы можем передавать ему пропсы анимации.
        <motion.div
          // 1. Начальное состояние (за кадром, прозрачное)
          initial={{ 
            opacity: 0,       // Полностью прозрачный
            y: 50,           // Смещен на 50px вниз
            scale: 0.3       // Уменьшен
          }}
          
          // 2. Состояние при появлении (в кадре, непрозрачное)
          animate={{ 
            opacity: 1,       // Полностью видимый
            y: 0,            // В своей нормальной позиции
            scale: 1,         // Обычный размер
            transition: {
              // Настройки самой анимации появления
              type: "spring", // Тип 'пружина' (для более 'живого' эффекта)
              stiffness: 300, // Жесткость пружины
              damping: 20,    // Затухание (чтобы не прыгал вечно)
            }
          }}
          
          // 3. Состояние при исчезновении (когда isVisible становится false)
          exit={{ 
            opacity: 0,       // Снова прозрачный
            scale: 0.5,       // Уменьшается при уходе
            transition: { 
              duration: 0.2, // Быстрое исчезновение
              ease: "easeIn" // Плавное ускорение при уходе
            }
          }}
          
          // Tailwind классы оставляем те же, только добавляем pointer-events-none,
          // чтобы он не мешал кликам, пока исчезает.
          className="fixed bottom-4 left-4 z-50 pointer-events-none"
        >
          {/* Внутренний контейнер с shadow и max-width */}
          <div className="grid w-full max-w-md items-start gap-4 shadow-2xl rounded-lg bg-white pointer-events-auto">
            <Alert>
              <CheckCircle2Icon className="h-4 w-4" />
              <AlertTitle>{title}</AlertTitle>
              <AlertDescription>
                {description}
              </AlertDescription>
            </Alert>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AlertComponent;