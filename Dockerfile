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

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Use next start for production
CMD ["npm", "start"]