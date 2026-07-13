# ─── Build stage ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

RUN npx prisma generate
RUN npm run build

# ─── Production stage ────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy Prisma schema and generate client for production
COPY prisma ./prisma
RUN npx prisma generate

# Copy built application
COPY --from=builder /app/dist ./dist

# Copy frontend files
COPY public ./public
COPY public ./dist/public

# Copy environment config
COPY .env.production ./.env.example

# Create necessary directories
RUN mkdir -p logs uploads && \
    addgroup -g 1001 -S vnidt && \
    adduser -S vnidt -u 1001 -G vnidt && \
    chown -R vnidt:vnidt /app

# Copy database if exists
COPY dev.db* ./

USER vnidt

# Initialize database
RUN npx prisma db push --accept-data-loss 2>/dev/null || true

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "dist/src/main.js"]
