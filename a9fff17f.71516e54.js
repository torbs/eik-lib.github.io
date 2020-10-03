(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{81:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return p})),t.d(r,"metadata",(function(){return i})),t.d(r,"rightToc",(function(){return l})),t.d(r,"default",(function(){return u}));var n=t(2),a=t(6),o=(t(0),t(99)),p={id:"mapping_browser",title:"Browser Support",sidebar_label:"Browser Support"},i={unversionedId:"mapping_browser",id:"mapping_browser",isDocsHomePage:!1,title:"Browser Support",description:"Eventually, browsers will support Import Maps but currently (October 2020) no browser is shipped with Import Map enabled.",source:"@site/docs/mapping_browser.md",slug:"/mapping_browser",permalink:"/docs/mapping_browser",version:"current",sidebar_label:"Browser Support",sidebar:"mainSidebar",previous:{title:"Import Map",permalink:"/docs/mapping_import_map"},next:{title:"Build Tool Plugins",permalink:"/docs/mapping_plugins"}},l=[{value:"Import Map Polyfill",id:"import-map-polyfill",children:[]}],c={rightToc:l};function u(e){var r=e.components,t=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},c,t,{components:r,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Eventually, browsers will support Import Maps but currently (October 2020) no browser is shipped with Import Map enabled. "),Object(o.b)("p",null,"Chromium based browsers does ship support for Import Maps as an ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.chromestatus.com/feature/5315286962012160"}),"experimental feature")," which has to be turned on by enabling the Experimental Productivity Features flag in Chromium based browsers:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"chrome://flags/#enable-experimental-productivity-features"}),"Chrome")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"brave://flags/#enable-experimental-productivity-features"}),"Brave")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"opera://flags/#enable-experimental-productivity-features"}),"Opera")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"edge://flags/#enable-experimental-productivity-features"}),"Edge"))),Object(o.b)("h2",{id:"import-map-polyfill"},"Import Map Polyfill"),Object(o.b)("p",null,"Import Maps can be polyfilled by the following modules:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(n.a)({parentName:"li"},{href:"https://github.com/guybedford/es-module-shims"}),"es-module-shims"))))}u.isMDXComponent=!0},99:function(e,r,t){"use strict";t.d(r,"a",(function(){return b})),t.d(r,"b",(function(){return f}));var n=t(0),a=t.n(n);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function p(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?p(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=a.a.createContext({}),u=function(e){var r=a.a.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},b=function(e){var r=u(e.components);return a.a.createElement(c.Provider,{value:r},e.children)},s={inlineCode:"code",wrapper:function(e){var r=e.children;return a.a.createElement(a.a.Fragment,{},r)}},m=a.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),b=u(t),m=n,f=b["".concat(p,".").concat(m)]||b[m]||s[m]||o;return t?a.a.createElement(f,i(i({ref:r},c),{},{components:t})):a.a.createElement(f,i({ref:r},c))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,p=new Array(o);p[0]=m;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,p[1]=i;for(var c=2;c<o;c++)p[c]=t[c];return a.a.createElement.apply(null,p)}return a.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"}}]);