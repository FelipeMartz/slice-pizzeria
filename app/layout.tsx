import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Slice | Premium Pizzeria San José de Mayo',
  description: 'La mejor pizza artesanal de San José de Mayo, Uruguay. Ingredientes premium, tradición italiana y un toque moderno.',
  keywords: ['pizza', 'pizzeria', 'san jose de mayo', 'uruguay', 'italiana', 'artesanal', 'premium'],
  openGraph: {
    title: 'Slice | Premium Pizzeria San José de Mayo',
    description: 'Descubre la verdadera pizza italiana en San José de Mayo, Uruguay',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
