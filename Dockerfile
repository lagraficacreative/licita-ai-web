# Web comercial Licita.AI — sitio estático servido con nginx
FROM nginx:1.27-alpine

# Copia la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos del sitio (html, css). Excluidos en .dockerignore: Dockerfile, nginx.conf, etc.
COPY . /usr/share/nginx/html

EXPOSE 80
