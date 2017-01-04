var router = require('koa-router')();

var CDN_URL;

console.log('process.env.NODE_ENV:',process.env.NODE_ENV);

if(!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

if(process.env.NODE_ENV == 'development'){
	CDN_URL = 'http://localhost:8000'
}else{
	CDN_URL = 'http://localhost:3000'
}

router.get('*', async function (ctx, next) {
  console.log('EVR in router:',process.env.NODE_ENV);

  ctx.state = {
    title: 'CtripGlobal',
    env: process.env.NODE_ENV,
    cdnUrl:CDN_URL
  };
  await ctx.render('index', {
  });
})

module.exports = router;
