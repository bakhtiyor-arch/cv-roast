FROM node:20-alpine

WORKDIR /app

# Copy only pre-built standalone output (built locally with `next build`)
COPY .next/standalone ./
COPY public ./public
COPY .next/static ./.next/static

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]
