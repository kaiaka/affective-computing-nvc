### Installation
Install Node.js if you haven't done yet.
https://nodejs.org/en/download/

```
brew install node
```
Install node modules as defined in package.json
```
npm install
```

----
### Development
#### (a) with separate server
Run webpack watching and packing files.
```
npm run dev
```
Open 2nd console and start http-server in dist folder.
Open
```
cd dist
http-server
```
Got to http://localhost:8080/

#### (b) including web-pack server
Run webpack including webpack-server
```
npm run dev-server
```
Got to http://localhost:7000/

----
### Build
```
npm run build
```


