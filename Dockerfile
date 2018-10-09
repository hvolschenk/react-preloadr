FROM node:alpine

ENV HOME /home/node/app

WORKDIR $HOME

VOLUME [$HOME]

RUN chown -Rv node:node $HOME
USER node
