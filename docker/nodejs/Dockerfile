FROM node:12.14.0

RUN apt-get update
#RUN apt-get -y install vim

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY . $HOME/intellectual-humility
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/intellectual-humility
RUN npm install

# docker-compose exec intellectual-humility /bin/bash
# docker-compose run intellectual-humility /bin/bash
