(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{101:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return s})),t.d(n,"metadata",(function(){return c})),t.d(n,"rightToc",(function(){return p})),t.d(n,"default",(function(){return o}));var a=t(3),i=t(7),r=(t(0),t(117)),s={id:"client_app_packages",title:"Application Packages",sidebar_label:"Application Packages"},c={unversionedId:"client_app_packages",id:"client_app_packages",isDocsHomePage:!1,title:"Application Packages",description:"Publishing and serving your application's client side assets is the main task Eik was designed for. Given local paths to client side bundle files you produce, Eik will package up the files and upload them to an Eik server where they will be served for use in your production applications.",source:"@site/docs/client_app_packages.md",slug:"/client_app_packages",permalink:"/docs/client_app_packages",version:"current",sidebar_label:"Application Packages",sidebar:"mainSidebar",previous:{title:"Client Login",permalink:"/docs/client_login"},next:{title:"ESM Friendly NPM Packages",permalink:"/docs/client_npm_packages"}},p=[{value:"Producing packages",id:"producing-packages",children:[{value:"eik.json definitions",id:"eikjson-definitions",children:[]},{value:"The publish command",id:"the-publish-command",children:[]}]}],l={rightToc:p};function o(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Publishing and serving your application's client side assets is the main task Eik was designed for. Given local paths to client side bundle files you produce, Eik will package up the files and upload them to an Eik server where they will be served for use in your production applications."),Object(r.b)("h2",{id:"producing-packages"},"Producing packages"),Object(r.b)("p",null,"Use the ",Object(r.b)("inlineCode",{parentName:"p"},"package")," command to package and upload local JavaScript and CSS bundle files to an Eik server from where they will be served."),Object(r.b)("h3",{id:"eikjson-definitions"},"eik.json definitions"),Object(r.b)("p",null,"In your app's ",Object(r.b)("inlineCode",{parentName:"p"},"eik.json")," file, you use the ",Object(r.b)("inlineCode",{parentName:"p"},"files")," key to define local file paths to be included when packaging."),Object(r.b)("h4",{id:"file-entrypoints"},"file entrypoints"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json"}),'{\n    "files": {\n        "./scripts.js": "./scripts.js",\n        "./scripts.js.map": "./scripts.js.map",\n        "./styles.css": "./styles.css",\n        "./styles.css.map": "./styles.css.map",\n    }\n}\n')),Object(r.b)("h3",{id:"the-publish-command"},"The publish command"),Object(r.b)("p",null,"With entrypoints defined in ",Object(r.b)("inlineCode",{parentName:"p"},"eik.json"),", running the ",Object(r.b)("inlineCode",{parentName:"p"},"eik package")," command will assemble files (specified by entrypoints) into an archive and upload the archive to the Eik server defined by the ",Object(r.b)("inlineCode",{parentName:"p"},"server")," field in ",Object(r.b)("inlineCode",{parentName:"p"},"eik.json"),"."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"eik package\n")),Object(r.b)("p",null,"Once uploaded, the archive will be unpacked and the files served at the appropriate paths."),Object(r.b)("p",null,"The following example shows how entrypoint definitions correspond to final file locations:"),Object(r.b)("h4",{id:"example"},"Example."),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"eik.json")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-json"}),'{\n    "server": "http://assets.myserver.com",\n    "name": "my-pack",\n    "version": "1.0.0",\n    "files": {\n        "index.js": "./scripts.js",\n        "index.js.map": "./scripts.js.map",\n        "ie11.js": "./scripts-fallback.js",\n        "ie11.js.map": "./scripts-fallback.js.map",\n        "index.css": "./styles.css",\n        "index.css.map": "./styles.css.map"\n    }\n}\n')),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"command")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-sh"}),"eik package\n")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"URLs after packaging")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"http://assets.myserver.com/pkg/my-pack/1.0.0/index.js")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"http://assets.myserver.com/pkg/my-pack/1.0.0/index.js.map")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"http://assets.myserver.com/pkg/my-pack/1.0.0/ie11.js")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"http://assets.myserver.com/pkg/my-pack/1.0.0/ie11.js.map")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"http://assets.myserver.com/pkg/my-pack/1.0.0/index.css")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"http://assets.myserver.com/pkg/my-pack/1.0.0/index.css.map"))))}o.isMDXComponent=!0},117:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return m}));var a=t(0),i=t.n(a);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=i.a.createContext({}),o=function(e){var n=i.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},b=function(e){var n=o(e.components);return i.a.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},u=i.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),b=o(t),u=a,m=b["".concat(s,".").concat(u)]||b[u]||d[u]||r;return t?i.a.createElement(m,c(c({ref:n},l),{},{components:t})):i.a.createElement(m,c({ref:n},l))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,s=new Array(r);s[0]=u;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c.mdxType="string"==typeof e?e:a,s[1]=c;for(var l=2;l<r;l++)s[l]=t[l];return i.a.createElement.apply(null,s)}return i.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);