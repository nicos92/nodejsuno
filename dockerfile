# Usa una imagen base de Node.js (se recomienda la versión LTS)
FROM node:lts-alpine

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json (o yarn.lock)
# y luego instala las dependencias. Esto es para aprovechar el cache de Docker.
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente al directorio de trabajo
COPY . .

# Expone el puerto que usa tu aplicación
EXPOSE 3000
