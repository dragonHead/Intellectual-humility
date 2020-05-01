FROM node:14.1.0-buster-slim

LABEL vuelearn.version="1.0"
LABEL vuelearn.description="intellectual humlity"

RUN apt-get update \
  && apt-get install -y --no-install-recommends git locales locales-all \
  && apt-get clean

RUN localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8
ENV LC_ALL ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

RUN useradd --user-group --create-home --shell /bin/false app
ENV HOME=/home/app

COPY . $HOME/intellectual-humility
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/intellectual-humility
RUN npm install --no-progress \
    && npm audit fix
