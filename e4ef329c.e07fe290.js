(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{114:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return p})),r.d(t,"metadata",(function(){return i})),r.d(t,"toc",(function(){return l})),r.d(t,"default",(function(){return c}));var n=r(3),o=r(7),a=(r(0),r(121)),p={id:"mapping_import_map",title:"Import Map",sidebar_label:"Import Map"},i={unversionedId:"mapping_import_map",id:"mapping_import_map",isDocsHomePage:!1,title:"Import Map",description:"A key concept in Eik is to align the dependents of a module to the same version. A part of this concept is Import Maps which makes it possible to map import statements in modules.",source:"@site/docs/mapping_import_map.md",slug:"/mapping_import_map",permalink:"/docs/mapping_import_map",version:"current",sidebar_label:"Import Map",sidebar:"mainSidebar",previous:{title:"Caching",permalink:"/docs/overview_caching"},next:{title:"Browser Support",permalink:"/docs/mapping_browser"}},l=[],s={toc:l};function c(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"A key concept in Eik is to align the dependents of a module to the same version. A part of this concept is ",Object(a.b)("a",{parentName:"p",href:"https://github.com/WICG/import-maps"},"Import Maps")," which makes it possible to map import statements in modules."),Object(a.b)("p",null,"Import Maps are a fairly new concept and will hopefully be supported in browsers in the close future. Import Maps allow ",Object(a.b)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"},"ECMA Script Modules (ESM)"),' "bare" import specifiers, such as ',Object(a.b)("inlineCode",{parentName:"p"},"import {html, render} from 'lit-html'")," which will throw when used in a browser, to work by being mapped to a relative or absolute URLs the browser can use to load the module."),Object(a.b)("p",null,"In other words; in an ESM we can import a module like so:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-js"},"import {html, render} from 'lit-html';\n")),Object(a.b)("p",null,"Then an Import Map can be loaded as following in the browser:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-html"},'<script type="importmap">\n{\n  "imports": {\n    "lit-html": "https://cdn.eik-server.com/npm/lit-html/v1/lit-html.js",\n  }\n}\n<\/script>\n')),Object(a.b)("p",null,"When the Import Map is applied, our code will act as we have written:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-js"},"import * as lit from 'https://cdn.eik-server.com/npm/lit-html/v1/lit-html.js'\n")),Object(a.b)("p",null,"Browser support for Import Maps is currently (October 2020) limited. There are polyfills available for Import Maps but its fully possible to apply Import Map to modules ahead of time through build tools. "),Object(a.b)("p",null,"Eik does not dictate which strategy, a polyfill or ahead of time, is used for import mapping modules but we recommend that an organization aligns itself with the same strategy across its teams."),Object(a.b)("p",null,"It is also worth keeping in mind that one is not locked to one strategy forever. An Import Map used to apply mapping ahead of time will work as intended in browsers the day there is full browser support for Import Maps."))}c.isMDXComponent=!0},121:function(e,t,r){"use strict";r.d(t,"a",(function(){return m})),r.d(t,"b",(function(){return d}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=o.a.createContext({}),c=function(e){var t=o.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},m=function(e){var t=c(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=c(r),b=n,d=m["".concat(p,".").concat(b)]||m[b]||u[b]||a;return r?o.a.createElement(d,i(i({ref:t},s),{},{components:r})):o.a.createElement(d,i({ref:t},s))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,p=new Array(a);p[0]=b;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,p[1]=i;for(var s=2;s<a;s++)p[s]=r[s];return o.a.createElement.apply(null,p)}return o.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"}}]);