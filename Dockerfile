FROM node:12.6.0

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/intellectual-humility/
RUN chown -R app:app $HOME/*

USER root
COPY . $HOME/intellectual-humility
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/intellectual-humility
RUN npm install --no-optional --no-shrinkwrap --no-package-lock

# docker-compose exec intellectual-humility /bin/bash
# docker-compose run intellectual-humility /bin/bash
