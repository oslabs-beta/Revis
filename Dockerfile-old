FROM node:current-alpine

WORKDIR /app

COPY package.json /app/package.json

COPY package-lock.json /app/package-lock.json

COPY tsconfig.json /app/tsconfig.json

RUN npm install

COPY . /app

RUN npm run build

COPY .next /app/.next

EXPOSE 3000

CMD ["npm", "start"]


# FROM node:current-alpine AS base
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY . .
# RUN npx tsc -p ./tsconfig.json

# FROM base AS build
# ENV NODE_ENV=production
# WORKDIR /build
# COPY --from=base /app ./
# RUN npm run build

# FROM node:current-alpine AS production
# ENV NODE_ENV=production
# WORKDIR /app
# COPY --from=build /build/package*.json ./
# COPY --from=build /build/.next ./.next
# RUN npm install next
# EXPOSE 3000
# CMD ["npm","run","start"]