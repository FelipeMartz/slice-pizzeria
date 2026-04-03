# Optimizaciones y Nuevas Funcionalidades

## 🚀 Optimizaciones de Performance

### 1. Eliminada imagen del Hero
- La pesada imagen flotante de pizza ha sido removida
- Hero ahora es minimalista con solo texto y gradientes
- Mejora drástica en tiempo de carga y fluidez

### 2. Reducción de partículas
- De 20 partículas → 8 partículas
- Animaciones más livianas sin sacrificar estética

### 3. Uso de `useMemo` y `useCallback`
- Datos estáticos memorizados
- Funciones estabilizadas
- Reduce re-renders innecesarios

### 4. Animaciones simplificadas
- Eliminados `useTransform` costosos
- Uso directo de `animate` en elementos
- Transiciones `spring` optimizadas

### 5. Grid más pequeño
- FeaturesGrid: `md:grid-cols-3` en vez de 4
- Padding reducido: `py-20` vs `py-32`
- Espaciado consistente y más compacto

### 6. Prioridad de imágenes controlada
- Solo primera imagen del menú usa `priority`
- Resto usa lazy loading nativo de Next.js

## 🎯 Nuevas Funcionalidades

### Botón "Ver Menú" → Scroll Suave
```tsx
onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
```
- Animación nativa de scroll
- Enfoca al usuario en el menú inmediatamente

### Modal de Pizza Interactivo
- Click en cualquier tarjeta de pizza → se expande
- Muestra:
  - Imagen completa
  - Descripción corta y larga
  - Lista de ingredientes destacados
  - Botón "Añadir al Pedido"
- Animación suave con `AnimatePresence`
- Cerrar con clic fuera o botón X

### Botón de Reserva → Llamada Telefónica
```tsx
onClick={() => window.location.href = 'tel:+50622223333'}
```
- Texto: "¿Llamamos? 📞"
- Abre la app de teléfono directamente
- Número de ejemplo: `+506 2222 3333`

## 📁 Archivos Modificados

1. `components/LandingPage.tsx` - Reescrito casi completo
2. `components/PizzaCard.tsx` - Ya correcto (sin cambios)
3. `types/pizza.ts` - Añadido `longDescription?: string`

## 🎨 Imágenes por Pizza (Todas con longDescription)

| Pizza | Descripción corta | Descripción larga |
|-------|------------------|-------------------|
| Margherita | Tradicional con albahaca | Detalles sobre San Marzano, bufala, etc. |
| Prosciutto | Prosciutto di Parma + rúcula | Explicación completa de ingredientes premium |
| Speciale | Setas porcini + trufa negra | Edición limitada, ingredientes exclusivos |
| Quattro Formaggi | 4 quesos italianos | Descripción de cada queso y miel de romero |
| Diavola | Nduja picante + pepperoni | Sabor audaz, chile seco, ajo confitado |
| Vegetariana | Verduras asadas | Alcachofas, aceitunas, berenjenas, pimientos |

## 🧪 Testing Checklist

- [x] Hero carga rápido (sin imagen pesada)
- [x] Scroll suave al hacer clic en "Ver Menú"
- [x] Click en pizza abre modal
- [x] Modal muestra descripción completa
- [x] Click fuera del modal lo cierra
- [x] Botón "¿Llamamos?" abre app de teléfono
- [x] Animaciones fluidas (no laggy)
- [x] Responsive en móvil/tablet/desktop

## 🔧 Personalización del Número de Teléfono

Cambia en `LandingPage.tsx` (línea ~188):

```tsx
onClick={() => window.location.href = 'tel:+506TU_NUMERO'}
```

O usa variables de entorno:

```tsx
onClick={() => window.location.href = `tel:${process.env.NEXT_PUBLIC_PHONE}`}
```

## 📱 Notas Mobile

- Modal: ocupa pantalla completa en móvil
- Botones: tamaño táctil suficiente (44px+)
- Scroll: funciona con touch
- Imágenes: responsive con `object-cover`

---

**Resultado**: Página mucho más rápida, sin lag, con nuevas interacciones y mejor UX.
