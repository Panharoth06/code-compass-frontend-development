# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Define build-time environment variables (for Next.js build)
ARG OIDC_CLIENT_ID
ARG OIDC_CLIENT_SECRET
ARG OIDC_ISSUER
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG BASE_URL_CODE_COMPASS
ARG NEXT_PUBLIC_BASE_URL_CODE_COMPASS
ARG CCP_GITHUB_CLIENT_ID
ARG CCP_GITHUB_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET

# Make them available to Next.js build
ENV OIDC_CLIENT_ID=${OIDC_CLIENT_ID}
ENV OIDC_CLIENT_SECRET=${OIDC_CLIENT_SECRET}
ENV OIDC_ISSUER=${OIDC_ISSUER}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV BASE_URL_CODE_COMPASS=${BASE_URL_CODE_COMPASS}
ENV NEXT_PUBLIC_BASE_URL_CODE_COMPASS=${NEXT_PUBLIC_BASE_URL_CODE_COMPASS}
ENV CCP_GITHUB_CLIENT_ID=${CCP_GITHUB_CLIENT_ID}
ENV CCP_GITHUB_CLIENT_SECRET=${CCP_GITHUB_CLIENT_SECRET}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}

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

# Expose port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]
