
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/video/index","pages/video/share/share"],"window":{"navigationStyle":"custom","onReachBottomDistance":50,"animationType":"pop-in"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"集众帮短视频","compilerVersion":"2.7.9","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarTextStyle":"black","animationType":"fade-in"}},{"path":"/pages/video/index","meta":{"isNVue":true},"window":{"navigationStyle":"custom","softinputMode":"adjustResize","subNVues":[{"id":"drawer","path":"pages/video/subnvue/drawer","type":"popup","style":{"height":"100%","position":"fiexd","bottom":"0","background":"transparent"}},{"id":"subdrawer","path":"pages/video/subnvue/subDrawer","type":"popup","style":{"height":"100%","position":"absolute","bottom":"0","background":"transparent"}},{"id":"forward","path":"pages/video/subnvue/forward","type":"popup","style":{"height":"100%","position":"absolute","bottom":"0","background":"transparent"}}]}},{"path":"/pages/video/share/share","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});