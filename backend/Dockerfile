# ---- Stage 0: builder ----
FROM node:22-bullseye-slim AS builder

# Install build tools for native modules (bcrypt etc.)
RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential python3 git ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install all deps (dev + prod) to build native modules
RUN npm ci

# Copy source code
COPY . .

# Build project and generate Prisma client
RUN npx prisma generate
RUN npm run build

# Remove dev deps, keep production deps
RUN npm prune --production

# ---- Stage 1: runtime ----
FROM node:22-bullseye-slim AS runner

# Install g++ for runtime compilation of user C++ files
RUN apt-get update \
  && apt-get install -y --no-install-recommends g++ \
  && rm -rf /var/lib/apt/lists/*


# Create non-root user
RUN groupadd -r app && useradd -r -g app app

WORKDIR /app

# Copy production node_modules and built files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Create upload and logs directories (mounted as volumes at runtime)
RUN mkdir -p /app/uploads/icons /app/uploads/executables /app/logs \
  && chown -R app:app /app/uploads /app/logs

ENV PORT=3333
EXPOSE 3333

# Use non-root user
USER app

# Healthcheck (adjust path if needed)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3333/api/v1/health/liveness', r => process.exit(r.statusCode===200?0:1)).on('error', () => process.exit(1))"

# Start the app, loading tsconfig-paths in case path aliases remain
CMD ["node", "dist/main.js"]
