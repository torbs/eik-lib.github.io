(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{117:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=i.a.createContext({}),b=function(e){var t=i.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=b(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=b(n),d=r,h=p["".concat(c,".").concat(d)]||p[d]||u[d]||a;return n?i.a.createElement(h,o(o({ref:t},l),{},{components:n})):i.a.createElement(h,o({ref:t},l))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,c=new Array(a);c[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var l=2;l<a;l++)c[l]=n[l];return i.a.createElement.apply(null,c)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},92:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return b}));var r=n(3),i=n(7),a=(n(0),n(117)),c={id:"server_api",title:"Eik server - Programatic API",sidebar_label:"Programatic API"},o={unversionedId:"server_api",id:"server_api",isDocsHomePage:!1,title:"Eik server - Programatic API",description:"The Eik service is distributed as a Fastify plugin and has the following programatic API:",source:"@site/docs/server_api.md",slug:"/server_api",permalink:"/docs/server_api",version:"current",sidebar_label:"Programatic API",sidebar:"mainSidebar",previous:{title:"Server",permalink:"/docs/server"},next:{title:"Eik server - Sink",permalink:"/docs/server_sink"}},s=[{value:"Constructor",id:"constructor",children:[{value:"options (optional)",id:"options-optional",children:[]}]},{value:"API",id:"api",children:[{value:".api()",id:"api-1",children:[]},{value:".health() (async)",id:"health-async",children:[]}]},{value:"Properties",id:"properties",children:[{value:".metrics",id:"metrics",children:[]},{value:".config",id:"config",children:[]},{value:".logger",id:"logger",children:[]},{value:".sink",id:"sink",children:[]}]}],l={rightToc:s};function b(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"The Eik service is distributed as a ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.fastify.io/"}),"Fastify")," plugin and has the following programatic API:"),Object(a.b)("h2",{id:"constructor"},"Constructor"),Object(a.b)("p",null,"Create a new Eik service instance."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const Service = require('@eik/service');\nconst service = new Service(options);\n")),Object(a.b)("h3",{id:"options-optional"},"options (optional)"),Object(a.b)("p",null,"An Object containing misc configuration. The following values can be provided:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"option"),Object(a.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"default"),Object(a.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"type"),Object(a.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"required"),Object(a.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"details"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"customSink"),Object(a.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"null")),Object(a.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"object")),Object(a.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"false")),Object(a.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"A custom sink")))),Object(a.b)("h4",{id:"customsink"},"customSink"),Object(a.b)("p",null,"A custom sink. The sink must extend the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/eik-lib/sink"}),"sink interface"),"."),Object(a.b)("p",null,"Example using the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/eik-lib/sink-gcs"}),"Google Cloud Storage sink"),":"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const Service = require('@eik/service');\nconst Sink = require('@eik/sink-gcs');\n\n// Set up the Google Cloud Storage sink\nconst sink = new Sink(...);\n\n// Set up the Eik service as a plugin\nconst service = new Service({ customSink: sink });\n")),Object(a.b)("h2",{id:"api"},"API"),Object(a.b)("p",null,"An Eik service instance has the following API:"),Object(a.b)("h3",{id:"api-1"},".api()"),Object(a.b)("p",null,"The Eik service as a ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.fastify.io/docs/latest/Plugins/"}),"Fastify plugin"),". The returned function must be passed on to the Fastify ",Object(a.b)("inlineCode",{parentName:"p"},".register()")," method:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const fastify = require('fastify');\nconst Service = require('@eik/service');\n\n// Set up the Eik service as a plugin\nconst service = new Service({ customSink: sink });\n\n// Set up Fastify\nconst app = fastify({\n    ignoreTrailingSlash: true,\n});\n\n// Register the Eik service in Fastify\napp.register(service.api());\n")),Object(a.b)("p",null,"This will mount the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/server_rest_api"}),"Eik REST API")," into the Fastify application the plugin is registered to."),Object(a.b)("p",null,"Due to how the REST API deals with wildcards on pathnames to resolve files, it is recommended that the ",Object(a.b)("inlineCode",{parentName:"p"},"ignoreTrailingSlash")," option on the Fastify constructor that the plugin is registered to is set to ",Object(a.b)("inlineCode",{parentName:"p"},"true"),". If this is not done, file resolving might not work as expected. "),Object(a.b)("h3",{id:"health-async"},".health() (async)"),Object(a.b)("p",null,"Executes a health check on the Eik service. The health check mainly determines if the service is able to execute all methods needed to function properly using the current configured sink."),Object(a.b)("p",null,"We recommend executing the health check before the service begins accepting HTTP traffic:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const run = async () => {\n    await service.health();\n    await app.listen(service.config.get('http.port'), service.config.get('http.address'));\n}\nrun();\n")),Object(a.b)("p",null,"Throws if any of the health checks fails."),Object(a.b)("h2",{id:"properties"},"Properties"),Object(a.b)("p",null,"An Eik service instance has the following properties:"),Object(a.b)("h3",{id:"metrics"},".metrics"),Object(a.b)("p",null,"Property that exposes a metric stream. Please see the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/server_metrics"}),"metrics section")," for further documentation."),Object(a.b)("h3",{id:"config"},".config"),Object(a.b)("p",null,"Property that exposes internal configuration. Can be used to retrieve internal configuration. Config is built upon ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/mozilla/node-convict"}),"Node Convict"),"."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const Service = require('@eik/service');\n\nconst service = new Service();\nservice.logger.info(`Server is running in ${service.config.get('env')} mode`);\n")),Object(a.b)("h3",{id:"logger"},".logger"),Object(a.b)("p",null,"Property that exposes the internal logger. Can be used to do additional logging. The internal logger is ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/pinojs/pino"}),"Pino"),"."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const Service = require('@eik/service');\n\nconst service = new Service();\nservice.logger.info(`Server is running in ${service.config.get('env')} mode`);\n")),Object(a.b)("h3",{id:"sink"},".sink"),Object(a.b)("p",null,"Property that exposes the currently used sink. Please see the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/server_metrics"}),"sink section")," for further documentation."))}b.isMDXComponent=!0}}]);