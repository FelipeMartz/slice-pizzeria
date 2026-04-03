import { NextRequest, NextResponse } from 'next/server'
import { CartItem } from '@/types/pizza'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, name, address } = body as { items: CartItem[]; name?: string; address?: string }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 })
    }

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 })
    }

    if (!address || !address.trim()) {
      return NextResponse.json({ error: 'Dirección de entrega requerida' }, { status: 400 })
    }

    const botToken = process.env.BOT_TOKEN
    const chatId = process.env.CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json({ error: 'Configuración de Telegram incompleta' }, { status: 500 })
    }

    // Calcular total
    const total = items.reduce((sum, item) => sum + (parseInt(item.pizza.price) * item.quantity), 0)

    // Formatear mensaje para Telegram
    let message = `🍕 *NUEVO PEDIDO - Slice Pizzeria*\n`
    message += `📍 San José de Mayo, Uruguay\n\n`
    message += `👤 *Cliente:* ${name.trim()}\n\n`
    message += `📋 *Productos:*\n`

    items.forEach((item, index) => {
      const subtotal = parseInt(item.pizza.price) * item.quantity
      message += `${index + 1}. ${item.pizza.name} x${item.quantity} - $${subtotal}\n`
    })

    message += `\n💰 *Total: $${total}*\n`
    message += `📍 *Dirección:* ${address.trim()}\n`
    message += `⏰ ${new Date().toLocaleString('es-UY')}`

    // Enviar mensaje a Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Telegram API error:', errorData)
      return NextResponse.json({ error: 'Error enviando a Telegram' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send order error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
