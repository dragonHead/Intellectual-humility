FROM node:12.14.0

RUN apt-get update

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

RUN pwd
COPY . $HOME/intellectual-humility
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/intellectual-humility
RUN ls -la
RUN npm install
