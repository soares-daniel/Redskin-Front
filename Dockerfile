# ---- Base Node ----
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm ci

# ---- Copy Files/Build ----
FROM dependencies AS build
COPY . .
RUN npm run build

# --- Release with only the compiled app and necessary runtime dependencies ---
FROM base AS release
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
CMD ["sh", "-c", "node -r dotenv/config node_modules/.bin/next start"]
