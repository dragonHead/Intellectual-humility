FROM node:12.14.0

RUN apt-get update && apt-get install -y \
    vim tmux

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY . $HOME/intellectual-humility
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/intellectual-humility
RUN npm install
