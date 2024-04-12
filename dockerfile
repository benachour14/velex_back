# Utiliser l'image Node.js 21 comme base
FROM node:21-alpine AS builder

# Définir le répertoire de travail
WORKDIR /build

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install


# Copier le reste des fichiers de l'application
COPY ./ /build

RUN ls
# Construire l'application AdonisJS avec les variables d'environnement
RUN npm run build


FROM node:21-alpine as app

COPY --from=builder /build/package.json /app/package.json
COPY --from=builder /build/package-lock.json /app/package-lock.json
WORKDIR /app
COPY --from=builder /build/build /app
RUN npm ci --omit="dev"

WORKDIR /app

# Exposer le port 3333 pour le service HTTP
EXPOSE 3333

# Définir la commande à exécuter lors du démarrage du conteneur
CMD ["node","bin/server.js"]