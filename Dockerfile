# Multi-stage build for production
FROM node:18-alpine AS dependencies
WORKDIR /app
RUN npm install -g pnpm
COPY pnpm-lock.yaml .
RUN pnpm fetch

FROM node:18-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm run prebuild && pnpm build

FROM node:18-alpine AS runtime
WORKDIR /app
RUN npm install -g pnpm
ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
