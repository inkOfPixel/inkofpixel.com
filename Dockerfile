# syntax=docker/dockerfile:1

# Production image: builds the static site, then serves it with Caddy.
# A small Node process (server/main.mjs) starts Caddy and handles the contact form.
#   docker build -t inkofpixel . && docker run --rm -p 8080:80 inkofpixel

FROM node:24-alpine AS build
WORKDIR /site
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
# Images rarely change: moved aside so they get a layer of their own below.
RUN mv dist/assets /site-assets
# Keep only what the contact form needs at runtime.
RUN npm prune --omit=dev

FROM caddy:2-alpine
RUN apk add --no-cache nodejs
# Images first: this large layer is reused until an image changes.
COPY --from=build /site-assets /srv/assets
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /site/node_modules ./node_modules
COPY package.json ./
COPY server ./server
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /site/.build/redirects.caddy /etc/caddy/redirects.caddy
COPY --from=build /site/dist /srv
EXPOSE 80
CMD ["node", "server/main.mjs"]
