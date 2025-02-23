# Build stage
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine AS prod

# Allow Nginx user to access Nginx files
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/run/nginx 
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /var/run/nginx /etc/nginx /var/run/nginx.pid

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy Nginx config template
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

# Copy build
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html

# Copy start script
COPY --chown=nginx:nginx scripts/start.sh /scripts/start.sh

USER nginx

EXPOSE 80

ENTRYPOINT ["/scripts/start.sh"]