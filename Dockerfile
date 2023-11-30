FROM node:18-alpine AS builder
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm i -f 
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/next-env.d.ts ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "run", "start"]