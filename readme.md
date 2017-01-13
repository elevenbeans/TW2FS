# TW2FS

The way to full stack.

This is a new pro based on Node + Koa + React

## OverView
#### Server:

+ 环境：Node
+ 框架：Koa
+ 工具：Request
+ 模版引擎：Ejs

#### Front-end:

+ 语言标准：ECMAScript 6 + Less
+ 框架: React + ReactDOM + React-Router
+ 模块化：ES6 module
+ 编译构建：Webpack + Babel

## Setup

+ Install node.js [Ubuntu/Mac](https://github.com/creationix/nvm) , [Windows](https://nodejs.org/en/download/)

+ Clone this project
	```
	git clone https://github.com/elevenBeans/TW2FS.git
	cd TW2FS
	```
+ Install local dependencies
	```
	npm install
	```

+ Run this project by `./start.sh`, see it in `localhost:3000`
	
	```
	//"./start.sh" is equel to:

	npm run build

	npm run server &

	npm run watch

	```

+ How to generate compiled (dist) files ?

	```
	npm run build
	```
+ How to watching my module files ?

	```
	npm run watch
	```

## Notice

**Hot Module Replacement(HMR) is enabled by default! Enjoy it :)**

Want to disable HMR? Run `export NODE_ENV=dev && ./start.sh`. 

Run `export NODE_ENV=dev-HMR && ./start.sh` to reopen HMR.

Run `export NODE_ENV=pre && ./start.sh`. In this mode, the size of resource files can be extremely small.



*to be added ...*
