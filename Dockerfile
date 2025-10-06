# ---------- Build Stage ----------
FROM node:20-alpine AS builder

# Optional: Keep non-secret ARG if needed (e.g., for public URLs)
ARG NEXTAUTH_URL

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy project files
COPY . .

# Build Next.js app (mount secrets as temp files and export to ENV)
RUN --mount=type=secret,id=oidc_client_id \
    --mount=type=secret,id=oidc_client_secret \
    --mount=type=secret,id=oidc_issuer \
    --mount=type=secret,id=nextauth_secret \
    export OIDC_CLIENT_ID=$(cat /run/secrets/oidc_client_id) && \
    export OIDC_CLIENT_SECRET=$(cat /run/secrets/oidc_client_secret) && \
    export OIDC_ISSUER=$(cat /run/secrets/oidc_issuer) && \
    export NEXTAUTH_SECRET=$(cat /run/secrets/nextauth_secret) && \
    export NEXTAUTH_URL=${NEXTAUTH_URL:-"http://localhost:3000"} && \
    npm run build

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