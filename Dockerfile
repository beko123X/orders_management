# --------- Step 1: Build Frontend ---------
FROM node:20 AS build-frontend

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# --------- Step 2: Build Backend ---------
FROM node:20

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ ./

# Copy frontend build to backend public folder
COPY --from=build-frontend /app/frontend/build ./public

# Expose port
EXPOSE 3000

# Start backend server
CMD ["node", "index.js"]
