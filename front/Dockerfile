FROM node:14.17-alpine

# v1 
# RUN mkdir -p /home/app/ && chown -R node:node /home/app
# WORKDIR /home/app
# COPY --chown=node:node . .

# USER node

# RUN yarn install --frozen-lockfile
# RUN yarn dev

# EXPOSE 3000
# CMD [ "yarn", "start" ]

# v2
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN yarn

CMD ["yarn", "dev"]