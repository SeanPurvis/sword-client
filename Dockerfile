FROM ubuntu:xenial

# Install npm
ADD https://deb.nodesource.com/setup_8.x /setup_8.x
RUN bash setup_8.x && apt install -y nodejs

ADD . /sword
WORKDIR /sword
RUN npm install

CMD cd /sword && npm install && npm start
