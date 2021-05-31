FROM node:11 as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# Production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
