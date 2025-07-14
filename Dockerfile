FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the correct permissions
USER nextjs


EXPOSE 3000
ENV PORT 3000


CMD ["node", "server.js"]
