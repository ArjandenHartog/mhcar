# Built by Infaris Cloud (Guard Hosting) on every push.
# Two stages: the image that runs holds only the traced Next.js server (output: "standalone"), not the
# full node_modules and build cache of the build stage.
FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Public build-time values (they end up in the browser bundle anyway); secrets stay site variables.
ARG NEXT_PUBLIC_SANITY_PROJECT_ID="ktpg5qcd"
ARG NEXT_PUBLIC_SANITY_DATASET="production"
ARG NEXT_PUBLIC_SANITY_API_VERSION="2025-08-23"
ARG NEXT_PUBLIC_SUPABASE_URL="https://cymandclnavppolunvlg.supabase.co"
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5bWFuZGNsbmF2cHBvbHVudmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5Mzg0OTIsImV4cCI6MjA3MTUxNDQ5Mn0.pkWrW32LSFyYPereAOTppbwJzoNfjN-ACit567-B1nw"
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_SANITY_API_VERSION=$NEXT_PUBLIC_SANITY_API_VERSION
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=8080
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# The server runs with a read-only root: Next.js keeps its cache in /tmp.
RUN rm -rf .next/cache && ln -s /tmp/next-cache .next/cache
USER node
EXPOSE 8080
CMD ["sh", "-c", "mkdir -p /tmp/next-cache && exec node server.js"]
