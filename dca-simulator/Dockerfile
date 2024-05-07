# Usa una imagen base que contenga Node.js
FROM node:16-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y yarn.lock para instalar las dependencias
COPY package.json yarn.lock ./

# Instala las dependencias utilizando Yarn
RUN yarn install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Compila la aplicación React
RUN yarn build

# Expone el puerto 3000 en el contenedor
EXPOSE 3000

# Comando para iniciar la aplicación React
CMD ["yarn", "start"]