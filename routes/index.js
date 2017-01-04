var router = require('koa-router')();
var CDN_URL;

//console.log('process.env.NODE_ENV:',process.env.NODE_ENV);

if(!process.env.NODE_ENV) process.env.NODE_ENV = 'dev-HMR';

if(process.env.NODE_ENV == 'dev-HMR'){
	CDN_URL = 'http://localhost:8000'
}else if(process.env.NODE_ENV == 'dev'){
	CDN_URL = 'http://localhost:3000'
}else{
  CDN_URL = 'http://webresource.english.c-ctrip.com'
}

router.get('*', async function (ctx, next) {
  console.log('EVR in router:',process.env.NODE_ENV);

  ctx.state = {
    title: 'CtripGlobal',
    env: process.env.NODE_ENV,
    cdnUrl: CDN_URL
  };
  await ctx.render('index', {
  });
})

module.exports = router;
