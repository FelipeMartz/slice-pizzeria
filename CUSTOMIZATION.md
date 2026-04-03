# Guía de Personalización Avanzada

Esta guía te muestra cómo personalizar la landing page de Slice para adaptarla a diferentes necesidades.

## 🎨 Personalización de Colores

### Modificar la paleta de colores

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Cambia estos valores
      'slice-black': '#0a0a0a',      // Fondo principal
      'slice-wine': '#1a0a0a',       // Hover states (tinto oscuro)
      'slice-cream': '#f5f5f0',      // Texto alternativo
      'slice-gold': '#c9a959',       // Color acento premium (oro)
      'slice-burgundy': '#6b0f1a',   // Tinto para gradientes
    },
  },
}
```

### Esquemas de color alternativos

**Esquema azul tecnológico:**
```javascript
'slice-gold': '#00d4ff',        // Cyan brillante
'slice-burgundy': '#0099cc',   // Azul profundo
'slice-black': '#050510',      // Negro con azul
```

**Esquema rojo pasión:**
```javascript
'slice-gold': '#ff6b35',       // Naranja intenso
'slice-burgundy': '#d32f2f',   // Rojo fuego
'slice-black': '#0a0000',      // Negro rojizo
```

## ⚡ Ajuste de Animaciones

### Controlar la velocidad de animación

En `LandingPage.tsx`, todas las animaciones usan `spring` con `damping` y `stiffness`:

```typescript
// Más elástico/suave (más low damping, menos stiffness)
transition={{
  type: 'spring',
  damping: 30,    // Rango: 10-30 (más alto = menos elástico)
  stiffness: 80,  // Rango: 50-200 (más bajo = más lento)
}}

// Más rápido/responsivo
transition={{
  type: 'spring',
  damping: 15,    // Más elástico
  stiffness: 150, // Más rápido
}}
```

### Cambiar el stagger delay (animaciones secuenciales)

```typescript
// En FeaturesSection - menos delay entre elementos
transition={{
  staggerChildren: 0.08,  // Default: 0.15
  delayChildren: 0.1,     // Default: 0.2
}}

// En MenuSection - más rápido
staggerChildren: 0.05  // Muy rápido
```

### Desactivar efectos 3D

Si prefieres un diseño plano, cambia en `PizzaCard`:

```typescript
// Desactivar transformaciones 3D
style={{
  rotateX: 0,      // <-- Comenta o elimina
  rotateY: 0,      // <-- Comenta o elimina
  scale: 1,        // <-- Sin escala en hover
}}

// Reducir sombras
boxShadow: `0 ${isHovered ? 20 : 10}px ${isHovered ? 40 : 20}px -8px rgba(0,0,0,0.5)`
```

## 📱 Responsive Breakpoints

Los breakpoints usados (Tailwind defaults):

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

### Cambiar el layout en diferentes tamaños

```javascript
// En MenuSection - cambiar columnas
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//                                     ↑ Más columnas en desktop

// En FeaturesSection Bento Grid
className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2"
// Cambia a md:grid-cols-5 para más variedad
```

## 🎯 Personalizar el Contenido

### Agregar/quitar pizzas

Edita el array `pizzas` en `LandingPage.tsx`:

```typescript
const pizzas: Pizza[] = [
  {
    id: 'nueva-pizza',
    name: 'Mi Pizza',
    description: 'Descripción deliciosa',
    price: '19',
    category: 'Premium', // Debe coincidir con una categoría existente
    image: 'URL de la imagen',
  },
  // ... más pizzas
]
```

### Cambiar categorías

En `MenuSection`, modifica:

```typescript
const categories = ['Todas', 'Clásicas', 'Premium', 'Especiales', 'Nueva Categoría']
```

### Modificar texto y enlaces

- **Title/Description:** `app/layout.tsx` → `metadata`
- **Hero text:** `LandingPage.tsx` → `<HeroSection>`
- **Footer:** `LandingPage.tsx` → `<FooterSection>`
- **Botones:** Buscar "Ver Menú" o "Reservar Mesa"

## 🖼️ Gestión de Imágenes

### Usar imágenes locales

1. Coloca imágenes en `/public/images/pizzas/`
2. Cambia las URLs en `LandingPage.tsx`:

```typescript
// Antes (online):
image: 'https://images.unsplash.com/photo-...'

// Después (local):
image: '/images/pizzas/margherita.jpg',
```

### Optimizar imágenes para producción

```javascript
// next.config.js
images: {
  formats: ['image/webp', 'image/avif'], // Ya configurado
  minimumCacheTTL: 60 * 60 * 24 * 365, // Cache por 1 año
}
```

## 🎭 Efectos de Hover Avanzados

### Cambiar color de fondo al hacer hover (efecto solicitado)

En `PizzaCard`, agrega este efecto al `motion.div` principal:

```typescript
<motion.div
  animate={{
    backgroundColor: isHovered ? '#1a0a0a' : '#0a0a0a', // ← Cambia aquí
  }}
  transition={{ duration: 0.4 }}
  // ... resto del código
>
```

O aplica color a sección completa en `MenuSection`:

```typescript
const MenuSection = () => {
  const [hoverColor, setHoverColor] = useState('#0a0a0a')

  return (
    <motion.section
      animate={{ backgroundColor: hoverColor }}
      transition={{ duration: 0.6 }}
      className="py-32 ..."
      onMouseEnter={() => setHoverColor('#1a0505')}
      onMouseLeave={() => setHoverColor('#0a0a0a')}
    >
      {/* Contenido */}
    </motion.section>
  )
}
```

### Intensidad de sombra dinámica

```typescript
// Variable según hover
const shadowIntensity = isHovered ? 80 : 40
const shadowOpacity = isHovered ? 0.8 : 0.5

style={{
  boxShadow: `0 20px ${shadowIntensity}px -15px rgba(0,0,0,${shadowOpacity})`,
}}
```

## 🔧 Modificación de Layout Bento

### Cambiar el tamaño de las tarjetas Features

```typescript
// En featuresSection, modifica el objeto feature:
{
  icon: '🔥',
  title: 'Horno de Pizza',
  description: '...',
  size: 'lg' as const, // 'sm', 'md', 'lg'
}

// getGridClasses controla:
// 'sm' → 1x1 (default)
// 'md' → 2x1 (span-2 columnas)
// 'lg' → 2x2 (span-2 col y 2 row)
```

### Grid personalizado

```javascript
// Cambia la estructura del grid
className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"

// O usa masonry pattern si quieres variación de alturas
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(100px,auto)]"
```

## 🎵 Curvas de animación (Easing)

Usamos `[0.23, 1, 0.32, 1]` - una curva suave similar a iOS.

Alternativas:

```typescript
// Browser default ease
ease: 'ease'

// Ease in-out
ease: 'easeInOut'

// Custom cubic bezier
ease: [0.4, 0, 0.2, 1]          // Material Design
ease: [0.25, 0.1, 0.25, 1]      // Tailwind's ease-out
ease: [0.8, 0, 0.2, 1]          // Fuerte entrada

// Otras funciones
ease: 'anticipate'               // Anticipación
ease: 'circInOut'                // Circular
```

## 📦 Integración en otro proyecto

### Como componente aislado

```tsx
// En tu app
import LandingPage from '@/components/LandingPage'

export default function Home() {
  return <LandingPage />
}
```

### Con layout personalizado

```tsx
export default function CustomLayout() {
  return (
    <div className="bg-gray-900">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  )
}
```

### Extraer solo una sección

```tsx
import { HeroSection } from '@/components/LandingPage'

// Pero necesitas modificar LandingPage.tsx para exportar cada sección
// O copia la sección deseada a un nuevo componente
```

## 🚀 Optimización de Performance

### Reducir partículas (HeroSection)

```typescript
{/* Cambia de 20 a 8 */}
{[...Array(8)].map((_, i) => (  // ← Menos partículas
  <motion.div ... />
))}
```

### Lazy load de imágenes

Ya implementado con `next/image`. Para más control:

```typescript
<Image
  loading="lazy"    // Default
  placeholder="blur" // Blur hasta cargar
  blurDataURL="data:image/jpeg;base64,..." // Placeholder base64
/>
```

### Reducir re-renders

Wraps con `useMemo` para datos estáticos:

```typescript
const pizzas = useMemo<Pizza[]>(() => [...], [])
const categories = useMemo(() => ['Todas', ...], [])
```

## 🔄 Traducción / I18n

Modifica el array `pizzas` en `LandingPage.tsx`:

```typescript
const pizzas: Pizza[] = [
  {
    name: 'Margherita', // <- Cambiar a otro idioma
    description: 'Descripción en nuevo idioma',
    // ...
  },
]
```

Para multi-idioma real, integra `next-i18next` o `react-intl`.

## 🎯 A/B Testing

Agrega experimentos env-based:

```typescript
const isVariantA = process.env.NEXT_PUBLIC_VARIANT === 'A'

<motion.div
  initial={isVariantA ? { opacity: 0 } : { opacity: 1 }}
  // ...
>
```

---

## Checklist de Deployment

- [ ] Cambia `metadata.title` y `description` en `layout.tsx`
- [ ] Actualiza imágenes con las tuyas propias
- [ ] Modifica colores en `tailwind.config.js`
- [ ] Actualiza información de contacto en Footer
- [ ] Configura `next.config.js` para tu dominio
- [ ] Testea en dispositivos móviles reales
- [ ] Optimiza imágenes (compresión, WebP)
- [ ] Verifica accessibility (tab navigation, ARIA labels)
- [ ] Añade Google Analytics/Plausible (opcional)
- [ ] Configura SSL证书 y CDN (Vercel/Netlify)
