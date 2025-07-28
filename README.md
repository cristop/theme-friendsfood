# 🍽️ Friends Food - Sitio Web Corporativo

Sitio web moderno y responsive para Friends Food, desarrollado con **HTML5**, **Tailwind CSS** y **JavaScript vanilla**. El sitio incluye navegación dinámica, animaciones AOS y un diseño completamente responsive.

## 📋 Características Principales

- ✅ **Diseño completamente responsive** (Mobile-first)
- ✅ **Navegación dinámica** con carga de secciones via AJAX
- ✅ **Animaciones AOS** (Animate On Scroll)
- ✅ **Tailwind CSS** compilado localmente
- ✅ **JavaScript moderno** (ES6+) sin dependencias externas
- ✅ **Optimización de imágenes** (formato WebP)
- ✅ **Header inteligente** con cambios de estilo al scroll
- ✅ **Sistema de preload** con spinner personalizado
- ✅ **Botón scroll-to-top** flotante

## 🚀 Inicio Rápido

### Para Desarrollo Local

**Windows:**
```bash
# Hacer doble clic en "iniciar-sitio.bat"
# O desde terminal:
npm install
npm run dev
```

**Mac/Linux:**
```bash
# Hacer doble clic en "iniciar-sitio.py"
# O desde terminal:
npm install
npm run dev
```

### Para Producción

```bash
# Compilar CSS optimizado
npm run build

# Los archivos listos para subir estarán en:
# - index.html
# - dist/output.css
# - assets/
# - pages/
# - partials/
```

## 📁 Estructura del Proyecto

```
theme-friendsfood/
├── 📄 index.html              # Página principal
├── 📁 src/
│   └── 📄 index.css           # Estilos de entrada (Tailwind)
├── 📁 dist/
│   └── 📄 output.css          # CSS compilado (generado)
├── 📁 assets/
│   ├── 📁 img/                # Imágenes optimizadas
│   └── 📁 js/
│       └── 📄 main.js         # JavaScript principal
├── 📁 pages/                  # Secciones dinámicas
│   ├── 📄 home.html
│   ├── 📄 empresa.html
│   ├── 📄 servicios.html
│   └── ...
├── 📁 partials/               # Componentes reutilizables
│   └── 📄 contact-block.html
├── 📄 tailwind.config.js      # Configuración de Tailwind
└── 📄 package.json            # Dependencias y scripts
```

## 🛠️ Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instalar dependencias |
| `npm run dev` | Desarrollo con watch automático |
| `npm run build` | Compilar para producción |
| `npm run serve` | Servidor local con live-server |

## 🌐 Despliegue en Producción

### Opción 1: Hosting Tradicional
1. Ejecutar `npm run build`
2. Subir estos archivos al servidor:
   - `index.html`
   - `dist/output.css`
   - `assets/` (carpeta completa)
   - `pages/` (carpeta completa)
   - `partials/` (carpeta completa)

### Opción 2: Plataformas Modernas

**Netlify (Recomendado):**
1. Conectar repositorio Git
2. Configurar build command: `npm run build`
3. Configurar publish directory: `.`
4. ¡Listo! Despliegue automático

**Vercel:**
1. Importar proyecto desde Git
2. Configurar framework: "Other"
3. Build command: `npm run build`
4. Output directory: `.`

**GitHub Pages:**
1. Subir código a GitHub
2. Activar GitHub Pages en Settings
3. Seleccionar branch main
4. ¡Listo!

## 🎨 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **Tailwind CSS** - Framework de utilidades
- **JavaScript ES6+** - Funcionalidad dinámica
- **AOS** - Animaciones al scroll
- **Font Awesome** - Iconografía
- **Google Fonts** - Tipografías

## 📱 Características Responsive

- **Mobile-first** design
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid system** adaptativo
- **Navegación móvil** con menú hamburguesa
- **Touch-friendly** interfaces

## ⚡ Optimizaciones Incluidas

- **Imágenes WebP** para mejor rendimiento
- **CSS minificado** en producción
- **Lazy loading** de imágenes
- **Preload de secciones** con spinner
- **Animaciones optimizadas** con AOS
- **Código JavaScript** moderno y eficiente

## 🔧 Configuración Personalizada

### Colores del Tema
```css
/* En tailwind.config.js */
colors: {
  'celeste': '#003399',
  'pink': '#E94A8B', 
  'brand': '#F5D547'
}
```

### Fuentes
```css
fontFamily: {
  'comfortaa': ['Comfortaa', 'sans-serif'],
  'poppins': ['Poppins', 'sans-serif']
}
```

## 📞 Soporte

Para problemas técnicos o consultas sobre el desarrollo:
- Revisar la documentación de Tailwind CSS
- Verificar la consola del navegador para errores
- Comprobar que todas las dependencias estén instaladas

## 📄 Licencia

Este proyecto es propiedad de Friends Food. Todos los derechos reservados.

---

**Desarrollado con ❤️ para Friends Food** 