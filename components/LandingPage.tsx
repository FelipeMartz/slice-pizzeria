'use client'

import { useState, useRef, useMemo, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion'
import { Pizza, CartItem } from '@/types/pizza'
import PizzaCardComponent from '@/components/PizzaCard'
import Header from '@/components/Header'

// Tipos
interface PizzaModalProps {
  pizza: Pizza | null
  isOpen: boolean
  onClose: () => void
}

// Datos de las pizzas (useMemo para optimización)
const pizzasData: Pizza[] = [
  {
    id: 'margherita',
    name: 'Margherita',
    description: 'Tomate San Marzano, mozzarella di bufala y albahaca fresca. Clásica y sencilla.',
    longDescription: 'Salsa de tomate San Marzano, mozzarella di bufala, albahaca fresca, aceite de oliva virgen extra',
    price: '12',
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=90&w=1200&auto=format&fit=crop',
  },
  {
    id: 'prosciutto',
    name: 'Prosciutto',
    description: 'Mozzarella, prosciutto di Parma, rúcula y parmesano. Sabores italianos auténticos.',
    longDescription: 'Mozzarella, prosciutto di Parma, rúcula, parmesano, glaseado de balsámico',
    price: '16',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=90&w=1200&auto=format&fit=crop',
  },
  {
    id: 'speciale',
    name: 'Speciale',
    description: 'Setas porcini, trufa negra y burrata. Nuestra pizza gourmet más exclusiva.',
    longDescription: 'Setas porcini salvajes de Italia, trufa negra de Périgord en temporada, burrata cremosa de Puglia, un toque de aceite de trufa blanco y hierbas aromáticas frescas. Una experiencia culinaria que redefine el lujo en una pizza.',
    price: '22',
    category: 'Especiales',
    featured: true,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=90&w=1200&auto=format&fit=crop',
  },
  {
    id: 'quattro-formaggi',
    name: 'Quattro Formaggi',
    description: 'Cuatro quesos italianos: mozzarella, gorgonzola, parmesano y Pecorino con miel.',
    longDescription: 'Mozzarella, gorgonzola, parmesano, Pecorino Romano, miel de romero',
    price: '18',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=90&w=1200&auto=format&fit=crop',
  },
  {
    id: 'diavola',
    name: 'Diavola',
    description: 'Picante nduja, pepperoni, chile seco y ajo confitado. Sabor audaz e intenso.',
    longDescription: 'Salsa picante de nduja, pepperoni, chile seco, ajo confitado, mozzarella',
    price: '15',
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=90&w=1200&auto=format&fit=crop',
  },
  {
    id: 'vegetariana',
    name: 'Vegetariana',
    description: 'Verduras asadas frescas: alcachofas, aceitunas, berenjenas y pimientos.',
    price: '14',
    category: 'Clásicas',
    image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?q=90&w=1200&auto=format&fit=crop',
  },
]

// Hero Section optimizado (sin imagen pesada)
const HeroSection = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.5])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Fondo gradiente */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a0a] via-[#0a0a0a] to-[#0f0505]" />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-radial from-[#6b0f1a]/20 via-transparent to-transparent opacity-30"
          style={{ backgroundSize: '200% 200%' }}
        />
      </div>

      {/* Pocas partículas (optimizado) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
            className="absolute w-1.5 h-1.5 bg-[#c9a959] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 border border-[#c9a959]/40 rounded-full text-[#c9a959] text-sm uppercase tracking-[0.2em] font-semibold">
              Premium Pizzeria
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter text-white mb-8 leading-[0.9]"
          >
            <span className="block">SLICE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12 font-light"
          >
            La verdadera pizza italiana en San José de Mayo, Uruguay.
            <br className="hidden sm:block" />
            Tradición, calidad y pasión en cada bocado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={onMenuClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 py-4 bg-gradient-to-r from-[#c9a959] to-[#e6c87a] text-black font-bold text-lg rounded-full overflow-hidden shadow-lg"
            >
              <span className="relative z-10">Ver Menú</span>
              <motion.div
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-r from-[#e6c87a] to-[#c8b848]"
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = 'tel:+50622223333'}
              className="px-8 py-4 border-2 border-[#c9a959] text-[#c9a959] font-bold text-lg rounded-full hover:bg-[#c9a959] hover:text-black transition-all"
            >
              📞 Reservar por Teléfono
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  )
}

// Features Bento Grid (optimizado)
const FeaturesSection = () => {
  const features = useMemo(() => [
    {
      icon: '🔥',
      title: 'Horno de Pizza',
      description: 'Cocido a 500°C en nuestro horno de leña italiano importado. Auténtico estilo napolitano.',
      size: 'lg' as const,
    },
    {
      icon: '🌿',
      title: 'Ingredientes Frescos',
      description: 'Mozzarella di bufala, tomates San Marzano DOP y hierbas orgánicas',
      size: 'md' as const,
    },
    {
      icon: '⏳',
      title: '48h Fermentación',
      description: 'Masa madre natural con fermentación lenta para mejor digestibilidad',
      size: 'sm' as const,
    },
    {
      icon: '👨‍🍳',
      title: 'Maestros Pizzeros',
      description: 'Formación en la AVPN - Asociación Verace Pizza Napoletana',
      size: 'sm' as const,
    },
    {
      icon: '📍',
      title: 'San José de Mayo, Uruguay',
      description: 'En el corazón de la ciudad',
      size: 'sm' as const,
    },
    {
      icon: '🏆',
      title: 'Premiada 2024',
      description: 'La mejor pizza de San José de Mayo',
      size: 'md' as const,
    },
  ], [])

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }), [])

  const getGridClasses = (size: string) => {
    switch (size) {
      case 'lg':
        return 'md:col-span-2 md:row-span-2'
      case 'md':
        return 'md:col-span-2'
      default:
        return ''
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#c9a959] text-sm uppercase tracking-wider font-semibold">
            La Diferencia Slice
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 tracking-tight">
            Por qué elegirnos
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 auto-rows-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                },
              }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`group relative bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-white/5 hover:border-[#c9a959]/40 rounded-2xl p-6 md:p-7 transition-all duration-300 ${getGridClasses(feature.size)}`}
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a959]/0 via-transparent to-[#6b0f1a]/0 group-hover:from-[#c9a959]/5 group-hover:to-[#6b0f1a]/5 transition-all duration-500 rounded-2xl" />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                  className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#c9a959]/15 to-[#6b0f1a]/15 group-hover:from-[#c9a959]/25 group-hover:to-[#6b0f1a]/25 rounded-xl mb-5 transition-colors"
                >
                  <span className="text-4xl filter">{feature.icon}</span>
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Esquina decorativa */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-[#c9a959]/20 to-transparent transform rotate-45 origin-bottom-left" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

// Modal de pizza detallada
const PizzaModal = ({ pizza, isOpen, onClose }: PizzaModalProps) => {
  if (!pizza) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-4xl w-full bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con imagen */}
            <div className="relative h-80 md:h-96 overflow-hidden">
              <motion.img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: 1.03 }}
                transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

              {/* Botón cerrar */}
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(201, 169, 89, 0.9)' }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:text-black transition-all"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Título y categoría */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-[#c9a959]/90 text-black text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                  {pizza.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {pizza.name}
                </h2>
                <p className="text-[#c9a959] text-xl font-semibold mt-2">
                  ${pizza.price}
                </p>
              </div>
            </div>

            {/* Contenido con scroll en móviles */}
            <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-3 tracking-wide">
                    Descripción
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {pizza.description}
                  </p>
                  <h3 className="text-white text-lg font-semibold mb-3 tracking-wide">
                    Detalles
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {pizza.longDescription || pizza.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-lg font-semibold mb-4 tracking-wide">
                    Ingredientes Destacados
                  </h3>
                  <ul className="space-y-3">
                    {pizza.description.split(', ').map((ing, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center text-gray-300 text-sm"
                      >
                        <span className="w-2 h-2 bg-[#c9a959] rounded-full mr-3" />
                        {ing}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-8 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#c9a959] to-[#e6c87a] text-black font-bold text-lg shadow-lg"
                  >
                    Añadir al Pedido - ${pizza.price}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Menu Section con scroll suave
const MenuSection = ({
  pizzas,
  selectedPizza,
  setSelectedPizza,
  isModalOpen,
  setIsModalOpen,
  onAddToCart
}: {
  pizzas: Pizza[]
  selectedPizza: Pizza | null
  setSelectedPizza: (p: Pizza | null) => void
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  onAddToCart: (pizza: Pizza) => void
}) => {
  const [activeCategory, setActiveCategory] = useState('Todas')

  const categories = useMemo(() => ['Todas', 'Clásicas', 'Premium', 'Especiales'], [])

  const filteredPizzas = useMemo(() =>
    activeCategory === 'Todas'
      ? pizzas
      : pizzas.filter(p => p.category === activeCategory)
  , [activeCategory, pizzas])

  const handlePizzaClick = useCallback((pizza: Pizza) => {
    setSelectedPizza(pizza)
    setIsModalOpen(true)
  }, [setSelectedPizza, setIsModalOpen])

  const menuVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  }), [])

  return (
    <section
      id="menu"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#0f0505]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#c9a959] text-sm uppercase tracking-wider font-semibold">
            Nuestro Menú
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 tracking-tight">
            Pizza Artesanal
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm">
            Cada pizza es elaborada a mano con ingredientes importados
          </p>
        </motion.div>

        {/* Categorías */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#c9a959] to-[#e6c87a] text-black shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid de pizzas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {filteredPizzas.map((pizza, index) => (
              <PizzaCardComponent
                key={pizza.id}
                pizza={pizza}
                index={index}
                onAddToOrder={onAddToCart}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// Footer simple
const FooterSection = () => (
  <footer className="py-12 px-4 bg-[#0a0a0a] border-t border-white/5">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold text-white tracking-tighter mb-2">
          SLICE
        </h3>
        <p className="text-gray-500 text-sm">
          © 2024 Slice Pizzeria. Todos los derechos reservados.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Hecho con ❤️ por <span className="text-[#c9a959]">feliwebdev</span>
        </p>
      </div>

      <div className="flex gap-6 items-center">
        <a href="tel:+50622223333" className="flex items-center gap-2 text-gray-400 hover:text-[#c9a959] transition-colors text-sm group">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          +506 2222 3333
        </a>
        <a href="mailto:hola@slice.cr" className="flex items-center gap-2 text-gray-400 hover:text-[#c9a959] transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          hola@slice.cr
        </a>
      </div>

      <div className="flex gap-4">
        <motion.a
          href="#"
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c9a959] hover:text-black transition-all"
          aria-label="Instagram"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </motion.a>
        <motion.a
          href="#"
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c9a959] hover:text-black transition-all"
          aria-label="Facebook"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
        </motion.a>
      </div>
    </div>
  </footer>
)

// Componente principal optimizado
const LandingPage = () => {
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isSending, setIsSending] = useState(false)

  const scrollToMenu = useCallback(() => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handlePizzaClick = useCallback((pizza: Pizza) => {
    setSelectedPizza(pizza)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedPizza(null), 300)
  }, [])

  // Carrito functions
  const addToCart = useCallback((pizza: Pizza) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.pizza.id === pizza.id)
      if (existing) {
        return prev.map(item =>
          item.pizza.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { pizza, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((pizzaId: string) => {
    setCartItems(prev => prev.filter(item => item.pizza.id !== pizzaId))
  }, [])

  const updateQuantity = useCallback((pizzaId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.pizza.id === pizzaId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const sendOrder = useCallback(async (address: string) => {
    if (cartItems.length === 0) return
    setIsSending(true)
    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, address }),
      })
      if (response.ok) {
        alert('¡Pedido enviado con éxito! 🎉')
        clearCart()
      } else {
        alert('Error al enviar el pedido. Intenta de nuevo.')
      }
    } catch (error) {
      console.error('Send order error:', error)
      alert('Error de conexión. Intenta de nuevo.')
    } finally {
      setIsSending(false)
    }
  }, [cartItems, clearCart])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header fijo */}
      <Header
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
        onSendOrder={sendOrder}
        isSending={isSending}
      />

      {/* Contenido con padding para header */}
      <div className="pt-16">
        <HeroSection onMenuClick={scrollToMenu} />

        <FeaturesSection />

        <MenuSection
          pizzas={pizzasData}
          selectedPizza={selectedPizza}
          setSelectedPizza={setSelectedPizza}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onAddToCart={addToCart}
        />

        <FooterSection />

        {/* Modal */}
        <PizzaModal
          pizza={selectedPizza}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  )
}

export default LandingPage
