# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy project files
COPY . .

# Build Next.js app
RUN npm run build

# ---------- Run Stage ----------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy required files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Only copy next.config.js if it exists
# COPY --from=builder /app/next.config.js ./ || true

EXPOSE 3000
CMD ["npm", "start"]
