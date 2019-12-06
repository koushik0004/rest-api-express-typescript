
FROM node:12-alpine as chatappimg

RUN mkdir -p /www/app
RUN chmod 777 -R /www/app

WORKDIR /www/app

COPY . .

RUN yarn install

RUN yarn global add pm2 nodemon
ENV PM2_PUBLIC_KEY c86up8nb71m6hcv
ENV PM2_SECRET_KEY rbrby2n4ret3ee2

RUN yarn build

EXPOSE 3000 80

# CMD ["yarn", "start:pm2"]
# CMD ["yarn", "start"]
CMD ["pm2-runtime", "process.yml", "--watch"]