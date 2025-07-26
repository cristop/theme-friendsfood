#!/bin/bash

echo "========================================"
echo "    FRIENDS FOOD - SERVIDOR LOCAL"
echo "========================================"
echo ""
echo "Iniciando servidor..."
echo ""

# Verificar si Node.js está instalado
if command -v node &> /dev/null; then
    echo "✅ Node.js encontrado, iniciando servidor..."
    node start-server.js
elif command -v python3 &> /dev/null; then
    echo "✅ Python3 encontrado, iniciando servidor..."
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python encontrado, iniciando servidor..."
    python -m http.server 8000
else
    echo "❌ Error: No se encontró Node.js ni Python instalado"
    echo ""
    echo "Para instalar Node.js:"
    echo "  - Mac: brew install node"
    echo "  - Linux: sudo apt install nodejs"
    echo ""
    echo "Para instalar Python:"
    echo "  - Mac: brew install python"
    echo "  - Linux: sudo apt install python3"
    echo ""
    read -p "Presiona Enter para salir..."
    exit 1
fi 