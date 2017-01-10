var router = require('koa-router')();
var CDN_URL;

console.log('process.env.NODE_ENV in router:',process.env.NODE_ENV);

if(!process.env.NODE_ENV) process.env.NODE_ENV = 'dev-HMR';

if(process.env.NODE_ENV == 'dev-HMR')	CDN_URL = 'http://localhost:8000';
if(process.env.NODE_ENV == 'dev')	CDN_URL = 'http://localhost:8000';
if(process.env.NODE_ENV == 'pre') CDN_URL = 'http://localhost:3000';
if(process.env.NODE_ENV == 'prd') CDN_URL = 'http://webresource.english.c-ctrip.com';

var ThrowToHomePage = async function (ctx, next) {
  console.log('EVR in router:',process.env.NODE_ENV);
  ctx.state = {
    env: process.env.NODE_ENV,
    cdnUrl: CDN_URL
  };
  await ctx.render('index', {
  });
};

var ThrowToErroPage = async function (ctx, next) {
  console.log('EVR in router:',process.env.NODE_ENV);
  ctx.state = {
  	env: process.env.NODE_ENV,
    cdnUrl: CDN_URL,
    message: 'error',
    error: {status:404,stack:'stack:'}
  };
  await ctx.render('error', {
  });
};


router.get('/', ThrowToHomePage);
router.get('flight', ThrowToHomePage);
router.get('hotel', ThrowToHomePage);
router.get('train', ThrowToHomePage);

router.get('*', ThrowToErroPage);

module.exports = router;
