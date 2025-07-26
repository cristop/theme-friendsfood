@echo off
echo Iniciando servidor local para Friends Food...
echo.
echo El sitio estara disponible en: http://localhost:8000
echo.
echo Para cerrar el servidor, presiona Ctrl+C
echo.
python -m http.server 8000
pause 