# Friends Food - Sitio Web

## 🚀 Inicio Rápido

### Windows
```bash
# Doble clic en:
iniciar-sitio.bat
```

### macOS / Linux
```bash
# Opción 1: Doble clic en:
iniciar-sitio.py

# Opción 2: Desde terminal:
chmod +x iniciar-sitio.sh
./iniciar-sitio.sh

# Opción 3: Manual:
python iniciar-sitio.py
```

## 📋 Requisitos

- **Python 3.6+** (incluido en macOS y Linux)
- **Node.js** (opcional, para mejor experiencia)
- **Navegador web moderno**

## 🔧 Instalación de Dependencias

### Windows
```bash
# Python (si no está instalado):
# Descargar desde: https://python.org

# Node.js (opcional):
# Descargar desde: https://nodejs.org
```

### macOS
```bash
# Python:
brew install python

# Node.js (opcional):
brew install node
```

### Linux (Ubuntu/Debian)
```bash
# Python:
sudo apt update
sudo apt install python3

# Node.js (opcional):
sudo apt install nodejs npm
```

## 🌐 Uso

1. **Iniciar el servidor** usando uno de los métodos anteriores
2. **El navegador se abrirá automáticamente** en `http://localhost:8000`
3. **Navegar** por el sitio web
4. **Para cerrar**, cerrar la ventana/terminal del servidor

## 📁 Estructura del Proyecto

```
theme-friendsfood/
├── index.html              # Página principal
├── iniciar-sitio.bat       # Iniciador Windows
├── iniciar-sitio.py        # Iniciador multiplataforma
├── iniciar-sitio.sh        # Iniciador Mac/Linux
├── start-server.js         # Servidor Node.js
├── assets/                 # Recursos estáticos
│   ├── css/
│   ├── js/
│   └── img/
├── pages/                  # Páginas del sitio
└── partials/              # Componentes reutilizables
```

## 🛠️ Desarrollo

### Para desarrolladores:
```bash
# Instalar dependencias
npm install

# Compilar CSS
npm run build

# Servidor de desarrollo
npm run dev
```

## 📱 Características

- ✅ **Responsive design** - Funciona en móvil y desktop
- ✅ **Navegación dinámica** - Carga de contenido sin recargar página
- ✅ **Animaciones** - Efectos visuales con AOS
- ✅ **Menú móvil** - Navegación adaptativa
- ✅ **Scroll to top** - Botón para volver arriba
- ✅ **Loader** - Indicador de carga

## 🔍 Solución de Problemas

### Error: "No se encontró Node.js ni Python"
- Instalar Python desde https://python.org
- O instalar Node.js desde https://nodejs.org

### Error: "Puerto 8000 en uso"
- Cerrar otras aplicaciones que usen el puerto 8000
- O cambiar el puerto en `start-server.js`

### Error: "Permiso denegado" (Linux/Mac)
```bash
chmod +x iniciar-sitio.sh
chmod +x iniciar-sitio.py
```

## 📞 Soporte

Para problemas técnicos, revisar:
1. Que Python o Node.js estén instalados
2. Que el puerto 8000 esté libre
3. Que todos los archivos estén en la misma carpeta

## 📄 Licencia

© 2025 Friends Food. Todos los derechos reservados. 