'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CartItem } from '@/types/pizza'

interface HeaderCartProps {
  items: CartItem[]
  onRemoveItem: (pizzaId: string) => void
  onUpdateQuantity: (pizzaId: string, delta: number) => void
  onClearCart: () => void
  onSendOrder: (address: string) => Promise<void>
  isSending: boolean
}

export default function HeaderCart({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onSendOrder,
  isSending,
}: HeaderCartProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [address, setAddress] = useState('')

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (parseInt(item.pizza.price) * item.quantity), 0)

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.header-cart-container')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSend = async () => {
    if (!address.trim()) {
      alert('Por favor ingresa tu dirección')
      return
    }
    await onSendOrder(address)
    setAddress('')
    setIsOpen(false)
  }

  return (
    <div className="header-cart-container relative">
      {/* Botón del carrito */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-[#c9a959] transition-colors"
        aria-label="Carrito de compras"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>

        {/* Badge con cantidad */}
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-[#c9a959] text-black text-[10px] font-bold rounded-full flex items-center justify-center"
          >
            {totalItems}
          </motion.span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-[#0a0a0a] to-[#111]">
              <h3 className="text-white font-bold text-lg">Tu Pedido</h3>
              <p className="text-gray-400 text-xs mt-1">{totalItems} producto{totalItems !== 1 ? 's' : ''}</p>
            </div>

            {/* Lista de items */}
            <div className="max-h-64 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">El carrito está vacío</p>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.pizza.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                  >
                    <img
                      src={item.pizza.image}
                      alt={item.pizza.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-semibold truncate">{item.pizza.name}</h4>
                      <p className="text-[#c9a959] text-xs">${item.pizza.price}</p>
                    </div>

                    {/* Controls de cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.pizza.id, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded text-white text-sm transition-colors"
                      >
                        -
                      </button>
                      <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.pizza.id, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded text-white text-sm transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal y eliminar */}
                    <div className="flex flex-col items-end">
                      <span className="text-white text-xs font-semibold">
                        ${(parseInt(item.pizza.price) * item.quantity)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.pizza.id)}
                        className="text-red-400 hover:text-red-300 text-xs mt-1"
                      >
                        ✕
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer con total y acciones */}
            {items.length > 0 && (
              <div className="p-4 border-t border-white/5 bg-gradient-to-r from-[#0a0a0a] to-[#111]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm">Total</span>
                  <span className="text-white text-2xl font-bold text-[#c9a959]">
                    ${totalPrice}
                  </span>
                </div>

                {/* Campo dirección */}
                <div className="mb-4">
                  <label className="block text-gray-400 text-xs mb-2">Dirección de entrega</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej: Av. Principal 123, San José de Mayo"
                    rows={2}
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#c9a959] resize-none"
                  />
                </div>

                <motion.button
                  onClick={handleSend}
                  disabled={isSending || items.length === 0 || !address.trim()}
                  whileHover={{ scale: (items.length > 0 && address.trim()) ? 1.02 : 1 }}
                  whileTap={{ scale: (items.length > 0 && address.trim()) ? 0.98 : 1 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#c9a959] to-[#e6c87a] text-black font-bold text-sm rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? 'Enviando...' : items.length === 0 || !address.trim() ? 'Completa la dirección' : '🚀 Enviar Pedido'}
                </motion.button>

                <button
                  onClick={onClearCart}
                  className="w-full mt-2 py-2 text-gray-400 hover:text-white text-xs transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
