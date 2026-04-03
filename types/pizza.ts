export interface Pizza {
  id: string
  name: string
  description: string
  longDescription?: string
  price: string
  category: 'Clásicas' | 'Premium' | 'Especiales'
  image: string
  featured?: boolean
}

export interface CartItem {
  pizza: Pizza
  quantity: number
}

export interface Feature {
  icon: string
  title: string
  description: string
  size: 'sm' | 'md' | 'lg'
}
