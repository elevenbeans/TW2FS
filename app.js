const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const index = require('./routes/index');

console.log('first:',process.env.NODE_ENV);

const gzip = require('koa-gzip');

//middlewares
app.use(gzip());
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

app.use(require('koa-static')(__dirname + '/')); //静态资源开发走 8000 服务

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

console.log('ENV_IN_SERVER:',process.env.NODE_ENV);

router.use('/', index.routes(), index.allowedMethods());

app.use(router.routes(), router.allowedMethods());

// response
app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;
