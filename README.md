# install node if haven't done yet
brew install node

# initial setup 
npm install

# dev: run webpack watchdog
npm run watch

# dev: run server
cd dist
http-server

# build
npm run build

