#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import subprocess
import webbrowser
import time
import platform
from http.server import HTTPServer, SimpleHTTPRequestHandler
import threading

def print_banner():
    print("=" * 40)
    print("    FRIENDS FOOD - SERVIDOR LOCAL")
    print("=" * 40)
    print()
    print("Iniciando servidor...")
    print()

def check_node():
    """Verificar si Node.js está instalado"""
    try:
        result = subprocess.run(['node', '--version'], 
                              capture_output=True, text=True, timeout=5)
        return result.returncode == 0
    except:
        return False

def check_python():
    """Verificar si Python está disponible"""
    return True  # Ya estamos en Python

def start_node_server():
    """Iniciar servidor Node.js"""
    try:
        print("✅ Node.js encontrado, iniciando servidor...")
        print("📱 El sitio estará disponible en: http://localhost:8000")
        print()
        print("Para cerrar el servidor, presiona Ctrl+C")
        print()
        
        # Abrir navegador después de un pequeño delay
        def open_browser():
            time.sleep(2)
            webbrowser.open('http://localhost:8000')
        
        threading.Thread(target=open_browser, daemon=True).start()
        
        # Ejecutar servidor Node.js
        subprocess.run(['node', 'start-server.js'])
        
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido")
    except Exception as e:
        print(f"❌ Error al iniciar servidor Node.js: {e}")
        return False
    return True

def start_python_server():
    """Iniciar servidor Python"""
    try:
        print("✅ Python encontrado, iniciando servidor...")
        print("📱 El sitio estará disponible en: http://localhost:8000")
        print()
        print("Para cerrar el servidor, presiona Ctrl+C")
        print()
        
        # Abrir navegador después de un pequeño delay
        def open_browser():
            time.sleep(2)
            webbrowser.open('http://localhost:8000')
        
        threading.Thread(target=open_browser, daemon=True).start()
        
        # Cambiar al directorio del script
        script_dir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(script_dir)
        
        # Iniciar servidor HTTP
        server = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
        server.serve_forever()
        
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido")
    except Exception as e:
        print(f"❌ Error al iniciar servidor Python: {e}")
        return False
    return True

def show_install_instructions():
    """Mostrar instrucciones de instalación"""
    system = platform.system().lower()
    
    print("❌ No se encontró Node.js ni Python instalado")
    print()
    print("Para instalar Node.js:")
    if system == "darwin":  # macOS
        print("  - Mac: brew install node")
    elif system == "linux":
        print("  - Linux: sudo apt install nodejs")
    elif system == "windows":
        print("  - Windows: Descarga desde https://nodejs.org")
    print()
    print("Para instalar Python:")
    if system == "darwin":  # macOS
        print("  - Mac: brew install python")
    elif system == "linux":
        print("  - Linux: sudo apt install python3")
    elif system == "windows":
        print("  - Windows: Descarga desde https://python.org")
    print()
    input("Presiona Enter para salir...")

def main():
    print_banner()
    
    # Intentar usar Node.js primero (mejor experiencia)
    if check_node():
        if start_node_server():
            return
    
    # Si Node.js falla o no está disponible, usar Python
    if check_python():
        if start_python_server():
            return
    
    # Si ambos fallan, mostrar instrucciones
    show_install_instructions()

if __name__ == "__main__":
    main() 