# 第一階段：Build Angular app
FROM node:20 AS build
WORKDIR /app

# 複製 package.json / package-lock.json
COPY package*.json ./
RUN npm install

# 複製所有源碼並 build
COPY . .
RUN npm run build --prod

# 第二階段：Serve 靜態檔案
FROM dockerhub.zeabur.cloud/zeabur/caddy-static AS runtime
COPY --from=build /app/dist/travel-introduce/ /

# （選配）設定 Caddy (如果你要設定 fallback route，比如 Angular Router)
# ENV CADDY_GLOBAL_OPTIONS="encode gzip"
# ENV CADDY_ROUTE_OPTIONS="try_files {path} /index.html"
