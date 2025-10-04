# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy project files
COPY . .

# Accept build arguments
ARG OIDC_CLIENT_ID
ARG OIDC_CLIENT_SECRET
ARG OIDC_ISSUER
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_BASE_URL_CODE_COMPASS
ARG BASE_URL_CODE_COMPASS
ARG CCP_GITHUB_CLIENT_ID
ARG CCP_GITHUB_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET

# Convert build args to environment variables for build
ENV OIDC_CLIENT_ID=$OIDC_CLIENT_ID
ENV OIDC_CLIENT_SECRET=$OIDC_CLIENT_SECRET
ENV OIDC_ISSUER=$OIDC_ISSUER
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXT_PUBLIC_BASE_URL_CODE_COMPASS=$NEXT_PUBLIC_BASE_URL_CODE_COMPASS
ENV BASE_URL_CODE_COMPASS=$BASE_URL_CODE_COMPASS
ENV CCP_GITHUB_CLIENT_ID=$CCP_GITHUB_CLIENT_ID
ENV CCP_GITHUB_CLIENT_SECRET=$CCP_GITHUB_CLIENT_SECRET
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET

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