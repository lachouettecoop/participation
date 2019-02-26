FROM node:11.10 as builder
ARG VERSION=master
WORKDIR /project
RUN curl -L https://github.com/lachouettecoop/participation/archive/${VERSION}.tar.gz | tar -zxv --strip-components 1
ADD .env /project/.env
RUN npm install && npm run build

FROM gatsbyjs/gatsby:latest
COPY --from=builder /project/public /pub
