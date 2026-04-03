'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Pizza } from '@/types/pizza'

interface PizzaCardProps {
  pizza: Pizza
  index: number
  onAddToOrder?: (pizza: Pizza) => void
}

const PizzaCard = ({ pizza, index, onAddToOrder }: PizzaCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1]
      }}
      className="group relative cursor-pointer"
      onClick={() => onAddToOrder?.(pizza)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor principal con efectos 3D */}
      <motion.div
        animate={{
          rotateX: isHovered ? -3 : 0,
          rotateY: isHovered ? 3 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 18,
          stiffness: 120,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {/* Sombra dinámica */}
        <motion.div
          animate={{
            y: isHovered ? 30 : 15,
            scale: isHovered ? 1.15 : 1,
            opacity: isHovered ? 0.7 : 0.4,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 80 }}
          className="absolute inset-0 bg-gradient-to-br from-[#c9a959]/15 to-[#6b0f1a]/15 rounded-3xl blur-xl -z-10"
        />

        {/* Tarjeta principal */}
        <motion.div
          animate={{
            boxShadow: isHovered
              ? '0 30px 60px -12px rgba(0, 0, 0, 0.75), 0 0 80px rgba(201, 169, 89, 0.12)'
              : '0 15px 30px -10px rgba(0, 0, 0, 0.5)',
          }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 hover:border-[#c9a959]/30 transition-colors h-full flex flex-col"
        >
          {/* Imagen */}
          <div className="relative h-64 md:h-72 overflow-hidden">
            <motion.div
              animate={{
                y: isHovered ? -8 : 0,
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{
                type: 'spring',
                damping: 22,
                stiffness: 100,
              }}
              className="relative w-full h-full"
            >
              <Image
                src={pizza.image}
                alt={pizza.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            </motion.div>

            {/* Badge categoría */}
            <motion.div
              animate={{
                x: isHovered ? 0 : -16,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.25 }}
              className="absolute top-3 left-3"
            >
              <span className="px-3 py-1.5 bg-[#c9a959]/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-black">
                {pizza.category}
              </span>
            </motion.div>

            {/* Precio */}
            <motion.div
              animate={{
                y: isHovered ? 0 : 16,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.25, delay: 0.08 }}
              className="absolute top-3 right-3"
            >
              <span className="px-3 py-1.5 bg-black/40 backdrop-blur-sm border border-white/15 rounded-full text-[#c9a959] font-bold text-base">
                ${pizza.price}
              </span>
            </motion.div>
          </div>

          {/* Contenido de la tarjeta */}
          <div className="p-5 relative bg-[#0a0a0a] flex flex-col flex-grow">
            <div className="relative z-10 flex-grow">
              <motion.h3
                animate={{
                  letterSpacing: isHovered ? '0.12em' : '0.08em',
                }}
                transition={{ duration: 0.25 }}
                className="text-xl font-bold text-white mb-2 tracking-tight"
              >
                {pizza.name}
              </motion.h3>

              <motion.p
                animate={{
                  opacity: isHovered ? 1 : 0.65,
                }}
                transition={{ duration: 0.25 }}
                className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2"
              >
                {pizza.description}
              </motion.p>
            </div>

            {/* Icono de carrito - hover en esquina inferior derecha */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation()
                onAddToOrder?.(pizza)
              }}
              className="absolute bottom-3 right-3 w-10 h-10 bg-[#c9a959] hover:bg-[#e6c87a] text-black rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Agregar al carrito"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </motion.button>
          </div>

          {/* Anillo de hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 pointer-events-none rounded-2xl ring-1.5 ring-[#c9a959]/40"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default PizzaCard
