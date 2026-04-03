# Slice Premium Pizzeria

Landing page de alta gama para una pizzería premium en San José, Costa Rica. Construida con Next.js, Tailwind CSS y Framer Motion.

## Características Técnicas

✨ **Framer Motion Avanzado**
- Animaciones con `staggerChildren` para entradas secuenciales
- `useSpring` con damping: 20, stiffness: 100 para transiciones orgánicas
- `useScroll` y `useTransform` para efectos de parallax
- Transiciones tipo `spring` para movimientos fluidos
- `AnimatePresence` para animaciones de montaje/desmontaje

🎨 **Diseño Moderno**
- Layout tipo "Bento Box" asimétrico con CSS Grid
- Efectos de profundidad 3D con transformaciones `rotateX/Y`
- Sombras dinámicas que reaccionan al hover
- Dark Mode absoluto (#0a0a0a)
- Tipografía Inter con spacing ajustado

📱 **Responsive Design**
- Mobile-first approach
- Adaptación completa para desktop
- Grid layouts responsivos (1 col → 2 cols → 3 cols)
- Imágenes optimizadas con Next.js Image

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
slais/
├── app/
│   ├── globals.css          # Estilos globales y custom CSS
│   ├── layout.tsx           # Layout principal
│   └── page.tsx            # Página principal
├── components/
│   └── LandingPage.tsx     # Componente principal de la landing
├── tailwind.config.js      # Configuración de Tailwind con colores personalizados
├── tsconfig.json           # Configuración TypeScript
├── package.json           # Dependencias
└── postcss.config.js      # Configuración PostCSS
```

## Paleta de Colores Personalizada

```javascript
slice-black: '#0a0a0a'     // Fondo oscuro
slice-wine: '#1a0a0a'      // Tinto oscuro (hover states)
slice-cream: '#f5f5f0'     // Texto alternativo
slice-gold: '#c9a959'      // Color de acento premium
slice-burgundy: '#6b0f1a'  // Tinto para gradientes
```

## Componentes Principales

### 1. HeroSection
- Parallax en scroll con `useTransform`
- Pizza principal flotante con animación infinita
- Botones con efecto de gradiente animado
- Partículas flotantes decorativas

### 2. FeaturesSection (Bento Grid)
- Grid asimétrico con `grid-cols-1 md:grid-cols-4 md:grid-rows-2`
- Tarjetas con hover effects y transformaciones 3D
- `staggerChildren` para animación secuencial
- Efectos de bordes y gradientes sutiles

### 3. MenuSection
- Filtrado por categorías con transiciones `AnimatePresence`
- Grid responsive de tarjetas de pizza
- Cada tarjeta incluye:
  - Transformaciones 3D en hover (rotateX/Y)
  - Cambio dinámico de sombra
  - Overlay informativo (precio, categoría)
  - Botón interactivo con micro-animación

### PizzaCard Component
```typescript
// Efectos 3D personalizados
const rotateX = useTransform(...)
const rotateY = useTransform(...)
const scale = useTransform(...)
const shadowOpacity = useTransform(...)
```

## Renderizado de Imágenes

El sitio usa `next/image` para optimización automática:
- Lazy loading
- WebP delivery
- Responsive sizing
- Placeholder blur

Nota: Las imágenes vienen de Unsplash. Para producción, reemplaza con tus propias imágenes optimizadas.

## Tecnologías Utilizadas

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS 3.4** - Framework de utilidades CSS
- **Framer Motion 11** - Biblioteca de animaciones
- **Next Image** - Optimización de imágenes

## Personalización

### Modificar colores
Edita `tailwind.config.js` en la sección `theme.extend.colors`.

### Cambiar imágenes
En `LandingPage.tsx`, modifica las URLs en el array `pizzas`.

### Ajustar animaciones
Los parámetros de spring están en cada componente:
```typescript
transition={{
  type: 'spring',
  damping: 20,     // Más bajo = más elástico
  stiffness: 100   // Más alto = más rápido
}}
```

## Performance

✅ Lazy loading de imágenes
✅ Animaciones aceleradas por GPU (`transform`, `opacity`)
✅ `will-change` automático de Framer Motion
✅ Optimización de re-renders con `useMemo` (implícito en Framer)
✅ Code splitting automático de Next.js

## Soporte de Navegadores

- Chrome/Edge (últimas 2 versiones)
- Firefox (última versión)
- Safari 14+
- Mobile Safari (iOS 14+)

## Créditos

Diseño inspirado por la estética Apple modern + Bento Grid patterns.
Construido con ❤️ por Claude Code.
