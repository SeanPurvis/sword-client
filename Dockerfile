# Start with the almighty Node
FROM node:8.9.4

# Set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Install Yarn, because npm dependency management is garbage
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Make yarn available to SH
ENV PATH="/root/.yarn/bin/:${PATH}"

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/app/package.json
RUN yarn install
RUN yarn add react-scripts@1.1.1

# start app
CMD ["yarn", "start"]
