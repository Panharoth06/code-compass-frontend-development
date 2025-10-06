# ---------- Build Stage ----------
FROM node:20-alpine AS builder

# Build args for auth env vars (passed via CLI/secrets)
ARG OIDC_CLIENT_ID
ARG OIDC_CLIENT_SECRET
ARG OIDC_ISSUER
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL  # Proactive: If your auth config checks this at build time

# Set as ENV for build process
ENV OIDC_CLIENT_ID=$OIDC_CLIENT_ID
ENV OIDC_CLIENT_SECRET=$OIDC_CLIENT_SECRET
ENV OIDC_ISSUER=$OIDC_ISSUER
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

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