'use client'

import HeaderCart from './HeaderCart'

interface HeaderProps {
  cartItems: Array<{ pizza: any; quantity: number }>
  onRemoveItem: (pizzaId: string) => void
  onUpdateQuantity: (pizzaId: string, delta: number) => void
  onClearCart: () => void
  onSendOrder: (address: string) => Promise<void>
  isSending: boolean
}

export default function Header({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onSendOrder,
  isSending,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-white tracking-tighter">SLICE</span>
          </div>

          {/* Carrito */}
          <HeaderCart
            items={cartItems}
            onRemoveItem={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
            onClearCart={onClearCart}
            onSendOrder={onSendOrder}
            isSending={isSending}
          />
        </div>
      </div>
    </header>
  )
}
