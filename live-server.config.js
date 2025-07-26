module.exports = {
  port: 5500,
  host: "127.0.0.1",
  root: ".",
  open: "/index.html",
  file: "index.html",
  wait: 1000,
  mount: [],
  logLevel: 2,
  middleware: [
    function(req, res, next) {
      // Si la ruta no es un archivo estático y no es la raíz, redirigir a index.html
      if (req.url !== '/' && !req.url.includes('.') && !req.url.includes('/assets/') && !req.url.includes('/dist/') && !req.url.includes('/src/')) {
        req.url = '/index.html';
      }
      next();
    }
  ]
}; 