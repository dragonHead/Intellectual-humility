FROM node:11.12.0

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/io/
RUN chown -R app:app $HOME/*

USER root
COPY . $HOME/io
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/io
RUN npm install --no-optional --no-shrinkwrap --no-package-lock

# docker-compose exec io /bin/bash
# docker-compose run io /bin/bash
