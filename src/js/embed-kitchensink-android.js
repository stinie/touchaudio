var embed=dojo={};
embed.config={};
embed.global=window;
embed.doc=document;
embed.body=function(){
return document.body;
};
["indexOf","lastIndexOf","forEach","map","some","every","filter"].forEach(function(_1,_2){
dojo[_1]=function(_3,_4,_5){
if((_2>1)&&(typeof _4=="string")){
_4=new Function("item","index","array",_4);
}
return Array.prototype[_1].call(_3,_4,_5);
};
});
dojo._listener={getDispatcher:function(){
return function(){
var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;
var r=t&&t.apply(this,arguments);
var i,_1;
_1=[].concat(ls);
for(i in _1){
if(!(i in ap)){
_1[i].apply(this,arguments);
}
}
return r;
};
},add:function(_2,_3,_4){
_2=_2||dojo.global;
var f=_2[_3];
if(!f||!f._listeners){
var d=dojo._listener.getDispatcher();
d.target=f;
d._listeners=[];
f=_2[_3]=d;
}
return f._listeners.push(_4);
},remove:function(_5,_6,_7){
var f=(_5||dojo.global)[_6];
if(f&&f._listeners&&_7--){
delete f._listeners[_7];
}
}};
dojo.connect=dojo.on=function(_8,_9,_a,_b,_c){
var a=arguments,_d=[],i=0;
_d.push(dojo.isString(a[0])?null:a[i++],a[i++]);
var a1=a[i+1];
_d.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);
for(var l=a.length;i<l;i++){
_d.push(a[i]);
}
return dojo._connect.apply(this,_d);
};
dojo._connect=function(_e,_f,_10,_11){
var l=dojo._listener,h=l.add(_e,_f,dojo.hitch(_10,_11));
return [_e,_f,h,l];
};
dojo.disconnect=function(_12){
if(_12&&_12[0]!==undefined){
dojo._disconnect.apply(this,_12);
delete _12[0];
}
};
dojo._disconnect=function(obj,_13,_14,_15){
_15.remove(obj,_13,_14);
};
(function(){
var _1=(dojo._event_listener={add:function(_2,_3,fp){
if(!_2){
return;
}
_3=_1._normalizeEventName(_3);
_2.addEventListener(_3,fp,false);
return fp;
},remove:function(_4,_5,_6){
if(_4){
_5=_1._normalizeEventName(_5);
_4.removeEventListener(_5,_6,false);
}
},_normalizeEventName:function(_7){
return _7.slice(0,2)=="on"?_7.slice(2):_7;
}});
dojo.fixEvent=function(_8,_9){
return _1._fixEvent(_8,_9);
};
dojo.stopEvent=function(_a){
_a.preventDefault();
_a.stopPropagation();
};
dojo._connect=function(_b,_c,_d,_e,_f){
var _10=_b&&(_b.nodeType||_b.attachEvent||_b.addEventListener);
var lid=_10?1:0,l=[dojo._listener,_1][lid];
var h=l.add(_b,_c,dojo.hitch(_d,_e));
return [_b,_c,h,lid];
};
dojo._disconnect=function(obj,_11,_12,_13){
([dojo._listener,_1][_13]).remove(obj,_11,_12);
};
})();
dojo._topics={};
dojo.subscribe=function(_1,_2,_3){
return [_1,dojo._listener.add(dojo._topics,_1,dojo.hitch(_2,_3))];
};
dojo.unsubscribe=function(_4){
if(_4){
dojo._listener.remove(dojo._topics,_4[0],_4[1]);
}
};
dojo.publish=function(_5,_6){
var f=dojo._topics[_5];
if(f){
f.apply(this,_6||[]);
}
};
dojo.connectPublisher=function(_7,_8,_9){
var pf=function(){
dojo.publish(_7,arguments);
};
return _9?dojo.connect(_8,_9,pf):dojo.connect(_8,pf);
};
dojo.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.isArray=function(it){
return it&&(it instanceof Array||typeof it=="array");
};
dojo.isFunction=(function(){
var _1=function(it){
var t=typeof it;
return it&&(t=="function"||it instanceof Function)&&!it.nodeType;
};
return dojo.isSafari?function(it){
if(typeof it=="function"&&it=="[object NodeList]"){
return false;
}
return _1(it);
}:_1;
})();
dojo.isObject=function(it){
return it!==undefined&&(it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));
};
dojo.isArrayLike=function(it){
var d=dojo;
return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));
};
dojo.isAlien=function(it){
return it&&!dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.isNumeric=function(n){
return n==parseFloat(n);
};
dojo.isNumber=function(n){
return typeof n=="number"||n instanceof Number;
};
dojo._hitchArgs=function(_1,_2){
var _3=dojo.toArray(arguments,2);
var _4=dojo.isString(_2);
return function(){
var _5=dojo.toArray(arguments);
var f=_4?(_1||dojo.global)[_2]:_2;
return f&&f.apply(_1||this,_3.concat(_5));
};
};
dojo.hitch=function(_6,_7){
if(arguments.length>2){
return dojo._hitchArgs.apply(dojo,arguments);
}
if(!_7){
_7=_6;
_6=null;
}
if(dojo.isString(_7)){
_6=_6||dojo.global;
if(!_6[_7]){
throw (["dojo.hitch: scope[\"",_7,"\"] is null (scope=\"",_6,"\")"].join(""));
}
return function(){
return _6[_7].apply(_6,arguments||[]);
};
}
return !_6?_7:function(){
return _7.apply(_6,arguments||[]);
};
};
(function(d){
(function(){
dojo.__mutator=function(){
};
var _1=Object.freeze||function(){
};
dojo.Promise=function(_2){
var _3,_4,_5,_6,_7;
var _8=this.promise={};
function _9(_a){
if(_4){
throw new Error("This deferred has already been resolved");
}
_3=_a;
_4=true;
_b();
};
function _b(){
var _c;
while(!_c&&_7){
var _d=_7;
_7=_7.next;
if(_c=(_d.progress==dojo.__mutator)){
_4=false;
}
var _e=(_5?_d.error:_d.resolved);
if(_e){
try{
var _f=_e(_3);
if(_f&&typeof _f.then==="function"){
_f.then(dojo.hitch(_d.deferred,"resolve"),dojo.hitch(_d.deferred,"reject"));
continue;
}
var _10=_c&&_f===undefined;
_d.deferred[_10&&_5?"reject":"resolve"](_10?_3:_f);
}
catch(e){
_d.deferred.reject(e);
}
}else{
if(_5){
_d.deferred.reject(_3);
}else{
_d.deferred.resolve(_3);
}
}
}
};
this.resolve=function(_11){
this.fired=0;
this.results=[_11,null];
_9(_11);
};
this.reject=function(_12){
_5=true;
this.fired=1;
_9(_12);
this.results=[null,_12];
if(!_12||_12.log!==false){
(dojo.config.deferredOnError||function(x){
console.error(x);
})(_12);
}
};
this.progress=function(_13){
var _14=_7;
while(_14){
var _15=_14.progress;
_15&&_15(_13);
_14=_14.next;
}
};
this.then=_8.then=function(_16,_17,_18){
var _19=_18==dojo.__mutator?this:new dojo.Promise(_8.cancel);
var _1a={resolved:_16,error:_17,progress:_18,deferred:_19};
if(_7){
_6=_6.next=_1a;
}else{
_7=_6=_1a;
}
if(_4){
_b();
}
return _19.promise;
};
var _1b=this;
this.cancel=_8.cancel=function(){
if(!_4){
var _1c=_2&&_2(_1b);
if(!_4){
if(!(_1c instanceof Error)){
_1c=new Error(_1c);
}
_1c.log=false;
_1b.reject(_1c);
}
}
};
_1(_8);
};
})();
})(dojo);
dojo.when=function(_1,_2,_3,_4){
if(_1&&typeof _1.then==="function"){
return _1.then(_2,_3,_4);
}
return _2(_1);
};
(function(d){
var _1={},_2;
for(var i in {toString:1}){
_2=[];
break;
}
dojo._extraNames=_2=_2||["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString"];
d._mixin=function(_3,_4){
var _5,s,i=0,l=_2.length;
for(_5 in _4){
s=_4[_5];
if(s!==_1[_5]&&s!==_3[_5]){
_3[_5]=s;
}
}
if(l&&_4){
for(;i<l;++i){
_5=_2[i];
s=_4[_5];
if(s!==_1[_5]&&s!==_3[_5]){
_3[_5]=s;
}
}
}
return _3;
};
dojo.mixin=function(_6,_7){
if(!_6){
_6={};
}
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(_6,arguments[i]);
}
return _6;
};
dojo.safeMixin=function(_8,_9){
var _a,t,i=0,l=d._extraNames.length;
var op=Object.prototype,_b=op.toString,_c="constructor";
for(_a in _9){
t=_9[_a];
if((t!==op[_a]||!(_a in op))&&_a!=_c){
if(_b.call(t)=="[object Function]"){
t.nom=_a;
}
_8[_a]=t;
}
}
for(;i<l;++i){
_a=d._extraNames[i];
t=_9[_a];
if((t!==op[_a]||!(_a in op))&&_a!=_c){
if(_b.call(t)=="[object Function]"){
t.nom=_a;
}
_8[_a]=t;
}
}
return _8;
};
}(dojo));
dojo.extend=function(_1,_2){
for(var i=1,l=arguments.length;i<l;i++){
dojo._mixin(_1.prototype,arguments[i]);
}
return _1;
};
dojo.Deferred=dojo.Promise;
dojo.extend(dojo.Deferred,{callback:function(_1){
this.resolve(_1);
},errback:function(_2){
this.reject(_2);
},addCallbacks:function(_3,_4){
this.then(_3,_4,dojo.__mutator);
return this;
},addCallback:function(_5){
return this.addCallbacks(dojo.hitch.apply(dojo,arguments));
},addErrback:function(_6){
return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));
},addBoth:function(_7){
var _8=dojo.hitch.apply(dojo,arguments);
return this.addCallbacks(_8,_8);
},fired:-1});
dojo.byId=function(id,_1){
return (typeof id=="string")?(_1||document).getElementById(id):id;
};
(function(d){
var _1=null,_2;
d.destroy=function(_3){
_3=dojo.byId(_3);
try{
var _4=_3.ownerDocument;
if(!_1||_2!=_4){
_1=_4.createElement("div");
_2=_4;
}
_1.appendChild(_3.parentNode?_3.parentNode.removeChild(_3):_3);
_1.innerHTML="";
}
catch(e){
}
};
})(dojo);
(function(d){
d._getComputedStyle=function(_1){
return _1.nodeType==1?_1.ownerDocument.defaultView.getComputedStyle(_1,null):{};
};
var _2="cssFloat",_3={"cssFloat":_2,"styleFloat":_2,"float":_2};
d._style=function(_4,_5,_6){
var n=dojo.byId(_4),l=arguments.length;
_5=_3[_5]||_5;
if(l==3){
return n.style[_5]=_6;
}
var s=d._getComputedStyle(n);
if(l==2&&typeof _5!="string"){
for(var x in _5){
d._style(_4,x,_5[x]);
}
return s;
}
return (l==1)?s:parseFloat(s[_5]||n.style[_5])||s[_5];
};
})(dojo);
dojo.getComputedStyle=dojo._getComputedStyle;
dojo.style=dojo._style;
(function(d){
var _1={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_2={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_3={innerHTML:1,className:1,htmlFor:0,value:1};
var _4=function(_5){
return _2[_5.toLowerCase()]||_5;
};
var _6=function(_7,_8){
var _9=_7.getAttributeNode&&_7.getAttributeNode(_8);
return _9&&_9.specified;
};
d.hasAttr=function(_a,_b){
var lc=_b.toLowerCase();
return _3[_1[lc]||_b]||_6(d.byId(_a),_2[lc]||_b);
};
var _c={},_d=0,_e="_attrid",_f={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
d.attr=function(_10,_11,_12){
_10=d.byId(_10);
var _13=arguments.length,_14;
if(_13==2&&typeof _11!="string"){
for(var x in _11){
d.attr(_10,x,_11[x]);
}
return _10;
}
var lc=_11.toLowerCase(),_15=_1[lc]||_11,_16=_3[_15],_17=_2[lc]||_11;
if(_13==3){
do{
if(_15=="style"&&typeof _12!="string"){
d.style(_10,_12);
break;
}
if(_15=="innerHTML"){
_10[_15]=_12;
break;
}
if(d.isFunction(_12)){
var _18=d.attr(_10,_e);
if(!_18){
_18=_d++;
d.attr(_10,_e,_18);
}
if(!_c[_18]){
_c[_18]={};
}
var h=_c[_18][_15];
if(h){
d.disconnect(h);
}else{
try{
delete _10[_15];
}
catch(e){
}
}
_c[_18][_15]=d.connect(_10,_15,_12);
break;
}
if(_16||typeof _12=="boolean"){
_10[_15]=_12;
break;
}
_10.setAttribute(_17,_12);
}while(false);
return _10;
}
_12=_10[_15];
if(_16&&typeof _12!="undefined"){
return _12;
}
if(_15!="href"&&(typeof _12=="boolean"||d.isFunction(_12))){
return _12;
}
return _6(_10,_17)?_10.getAttribute(_17):null;
};
d.removeAttr=function(_19,_1a){
d.byId(_19).removeAttribute(_4(_1a));
};
})(dojo);
(function(d){
var _1=d.byId;
var _2={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_3=/<\s*([\w\:]+)/,_4={},_5=0,_6="__"+d._scopeName+"ToDomId";
for(var _7 in _2){
var tw=_2[_7];
tw.pre=_7=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
d._toDom=function(_8,_9){
_9=_9||d.doc;
var _a=_9[_6];
if(!_a){
_9[_6]=_a=++_5+"";
_4[_a]=_9.createElement("div");
}
_8+="";
var _b=_8.match(_3),_c=_b?_b[1].toLowerCase():"",_d=_4[_a],_e,i,fc,df;
if(_b&&_2[_c]){
_e=_2[_c];
_d.innerHTML=_e.pre+_8+_e.post;
for(i=_e.length;i;--i){
_d=_d.firstChild;
}
}else{
_d.innerHTML=_8;
}
if(_d.childNodes.length==1){
return _d.removeChild(_d.firstChild);
}
df=_9.createDocumentFragment();
while(fc=_d.firstChild){
df.appendChild(fc);
}
return df;
};
d._docScroll=function(){
var n=d.global;
return "pageXOffset" in n?{x:n.pageXOffset,y:n.pageYOffset}:(n=d.doc.documentElement,n.clientHeight?{x:n.scrollLeft,y:n.scrollTop}:(n=d.body(),{x:n.scrollLeft||0,y:n.scrollTop||0}));
};
var _f=function(_10,ref){
var _11=ref.parentNode;
if(_11){
_11.insertBefore(_10,ref);
}
};
var _12=function(_13,ref){
var _14=ref.parentNode;
if(_14){
if(_14.lastChild==ref){
_14.appendChild(_13);
}else{
_14.insertBefore(_13,ref.nextSibling);
}
}
};
d.place=function(_15,_16,_17){
_16=_1(_16);
if(typeof _15=="string"){
_15=_15.charAt(0)=="<"?d._toDom(_15,_16.ownerDocument):_1(_15);
}
if(typeof _17=="number"){
var cn=_16.childNodes;
if(!cn.length||cn.length<=_17){
_16.appendChild(_15);
}else{
_f(_15,cn[_17<0?0:_17]);
}
}else{
switch(_17){
case "before":
_f(_15,_16);
break;
case "after":
_12(_15,_16);
break;
case "replace":
_16.parentNode.replaceChild(_15,_16);
break;
case "only":
d.empty(_16);
_16.appendChild(_15);
break;
case "first":
if(_16.firstChild){
_f(_15,_16.firstChild);
break;
}
default:
_16.appendChild(_15);
}
}
return _15;
};
d.create=function(tag,_18,_19,pos){
var doc=d.doc;
if(_19){
_19=_1(_19);
doc=_19.ownerDocument;
}
if(typeof tag=="string"){
tag=doc.createElement(tag);
}
if(_18){
for(var _1a in _18){
switch(_1a){
case "class":
tag.className=_18[_1a];
break;
default:
tag[_1a]=_18[_1a];
}
}
}
if(_19){
d.place(tag,_19,pos);
}
return tag;
};
d.empty=function(_1b){
_1(_1b).innerHTML="";
};
})(dojo);
dojo._getProp=function(_1,_2,_3){
var _4=_3||dojo.global;
for(var i=0,p;_4&&(p=_1[i]);i++){
_4=(p in _4?_4[p]:(_2?_4[p]={}:undefined));
}
return _4;
};
dojo.setObject=function(_5,_6,_7){
var _8=_5.split("."),p=_8.pop(),_9=dojo._getProp(_8,true,_7);
return _9&&p?(_9[p]=_6):undefined;
};
dojo.getObject=function(_a,_b,_c){
return dojo._getProp(_a.split("."),_b,_c);
};
dojo.trim=String.prototype.trim?function(_1){
return _1.trim();
}:function(_2){
return _2.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
};
var _pattern=/\{([^\}]+)\}/g;
dojo.replace=function(_3,_4,_5){
return _3.replace(_5||_pattern,dojo.isFunction(_4)?_4:function(_6,k){
return dojo.getObject(k,false,_4);
});
};
dojo.hasClass=function(_1,_2){
return ((" "+dojo.byId(_1).className+" ").indexOf(" "+_2+" ")>=0);
};
dojo.toggleClass=function(_3,_4,_5){
if(_5===undefined){
_5=!dojo.hasClass(_3,_4);
}
dojo[_5?"addClass":"removeClass"](_3,_4);
};
(function(){
var _6=/\s+/;
var _7=function(s){
if(typeof s=="string"||s instanceof String){
if(s.indexOf(" ")<0){
return [s];
}else{
return dojo.trim(s).split(_6);
}
}
return s;
};
dojo.addClass=function(_8,_9){
_8=dojo.byId(_8);
_9=_7(_9);
var _a=" "+_8.className+" ";
for(var i=0,_b=_9.length,c;i<_b;++i){
c=_9[i];
if(c&&_a.indexOf(" "+c+" ")<0){
_a+=c+" ";
}
}
_8.className=dojo.trim(_a);
};
dojo.removeClass=function(_c,_d){
_c=dojo.byId(_c);
var _e;
if(_d!==undefined){
_d=_7(_d);
_e=" "+_c.className+" ";
for(var i=0,_f=_d.length;i<_f;++i){
_e=_e.replace(" "+_d[i]+" "," ");
}
_e=dojo.trim(_e);
}else{
_e="";
}
if(_c.className!=_e){
_c.className=_e;
}
};
})();
(function(d){
d._loaders=[];
d._loadNotifying=false;
d._onto=function(_1,_2,fn){
if(!fn){
_1.push(_2);
}else{
if(fn){
var _3=(typeof fn=="string")?_2[fn]:fn;
_1.push(function(){
_3.call(_2);
});
}
}
};
dojo.ready=dojo.addOnLoad=function(_4,_5){
d._onto(d._loaders,_4,_5);
if(document.readyState==="complete"||(d._postLoad&&!d._loadNotifying)){
d._callLoaded();
}
};
dojo._callLoaded=function(){
setTimeout("dojo.loaded();",0);
};
dojo.loaded=function(){
d._loadNotifying=true;
d._postLoad=true;
var _6=d._loaders;
d._loaders=[];
for(var x=0;x<_6.length;x++){
_6[x]();
}
d._loadNotifying=false;
if(d._postLoad&&_6.length){
d._callLoaded();
}
};
dojo._initFired=false;
dojo._loadInit=function(){
if(!dojo._initFired){
dojo._initFired=true;
document.removeEventListener("DOMContentLoaded",dojo._loadInit,false);
dojo._callLoaded();
}
};
document.addEventListener("DOMContentLoaded",dojo._loadInit,false);
window.addEventListener("load",dojo._loadInit,false);
})(dojo);
dojo.toJson=function(_1){
return JSON.stringify(_1);
};
dojo.fromJson=function(_2){
return JSON.parse(_2);
};
dojo.toArray=function(_1,_2,_3){
return (_3||[]).concat(Array.prototype.slice.call(_1,_2||0));
};
dojo.clone=function(o){
if(!o||typeof o!="object"||dojo.isFunction(o)){
return o;
}
if(o.nodeType&&"cloneNode" in o){
return o.cloneNode(true);
}
if(o instanceof Date){
return new Date(o.getTime());
}
var r,i,l,s,_1;
if(dojo.isArray(o)){
r=[];
for(i=0,l=o.length;i<l;++i){
if(i in o){
r.push(dojo.clone(o[i]));
}
}
}else{
r=o.constructor?new o.constructor():{};
}
var _2={};
for(_1 in o){
s=o[_1];
if(!(_1 in r)||(r[_1]!==s&&(!(_1 in _2)||_2[_1]!==s))){
r[_1]=dojo.clone(s);
}
}
return r;
};
dojo.objectToQuery=function(_1){
var _2=encodeURIComponent;
var _3=[];
var _4={};
for(var _5 in _1){
var _6=_1[_5];
if(_6!=_4[_5]){
var _7=_2(_5)+"=";
if(dojo.isArray(_6)){
for(var i=0;i<_6.length;i++){
_3.push(_7+_2(_6[i]));
}
}else{
_3.push(_7+_2(_6));
}
}
}
return _3.join("&");
};
(function(_1){
var _2=_1.config;
_1._xhrObj=function(){
return new XMLHttpRequest();
};
_1._isDocumentOk=function(_3){
var _4=_3.status||0,lp=location.protocol;
return (_4>=200&&_4<300)||_4==304||_4==1223||(!_4&&(lp=="file:"||lp=="chrome:"||lp=="app:"));
};
_1._getText=function(_5,_6){
var _7=_1._xhrObj();
_7.open("GET",_5,false);
try{
_7.send(null);
if(!_1._isDocumentOk(_7)){
var _8=Error("Unable to load "+_5+" status:"+_7.status);
_8.status=_7.status;
_8.responseText=_7.responseText;
throw _8;
}
}
catch(e){
if(_6){
return null;
}
throw e;
}
return _7.responseText;
};
dojo._blockAsync=false;
var _9=_1._contentHandlers=dojo.contentHandlers={text:function(_a){
return _a.responseText;
},json:function(_b){
return _1.fromJson(_b.responseText||null);
}};
dojo._ioSetArgs=function(_c,_d,_e,_f){
var _10={args:_c,url:_c.url};
var _11=[{}];
if(_c.content){
_11.push(_c.content);
}
if(_c.preventCache){
_11.push({"dojo.preventCache":new Date().valueOf()});
}
_10.query=_1.objectToQuery(_1.mixin.apply(null,_11));
_10.handleAs=_c.handleAs||"text";
var d=new _1.Deferred(_d);
d.addCallbacks(_e,function(_12){
return _f(_12,d);
});
var ld=_c.load;
if(ld&&_1.isFunction(ld)){
d.addCallback(function(_13){
return ld.call(_c,_13,_10);
});
}
var err=_c.error;
if(err&&_1.isFunction(err)){
d.addErrback(function(_14){
return err.call(_c,_14,_10);
});
}
var _15=_c.handle;
if(_15&&_1.isFunction(_15)){
d.addBoth(function(_16){
return _15.call(_c,_16,_10);
});
}
d.ioArgs=_10;
return d;
};
var _17=function(dfd){
dfd.canceled=true;
var xhr=dfd.ioArgs.xhr;
var _18=typeof xhr.abort;
if(_18=="function"||_18=="object"||_18=="unknown"){
xhr.abort();
}
var err=dfd.ioArgs.error;
if(!err){
err=new Error("xhr cancelled");
err.dojoType="cancel";
}
return err;
};
var _19=function(dfd){
var ret=_9[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
return ret===undefined?null:ret;
};
var _1a=function(_1b,dfd){
if(!dfd.ioArgs.args.failOk){
console.error(_1b);
}
return _1b;
};
var _1c=null;
var _1d=[];
var _1e=0;
var _1f=function(dfd){
if(_1e<=0){
_1e=0;
}
};
var _20=function(){
var now=(new Date()).getTime();
if(!_1._blockAsync){
for(var i=0,tif;i<_1d.length&&(tif=_1d[i]);i++){
var dfd=tif.dfd;
var _21=function(){
if(!dfd||dfd.canceled||!tif.validCheck(dfd)){
_1d.splice(i--,1);
_1e-=1;
}else{
if(tif.ioCheck(dfd)){
_1d.splice(i--,1);
tif.resHandle(dfd);
_1e-=1;
}else{
if(dfd.startTime){
if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){
_1d.splice(i--,1);
var err=new Error("timeout exceeded");
err.dojoType="timeout";
dfd.errback(err);
dfd.cancel();
_1e-=1;
}
}
}
}
};
if(dojo.config.debugAtAllCosts){
_21.call(this);
}else{
try{
_21.call(this);
}
catch(e){
dfd.errback(e);
}
}
}
}
_1f(dfd);
if(!_1d.length){
clearInterval(_1c);
_1c=null;
return;
}
};
dojo._ioCancelAll=function(){
try{
_1.forEach(_1d,function(i){
try{
i.dfd.cancel();
}
catch(e){
}
});
}
catch(e){
}
};
_1._ioNotifyStart=function(dfd){
};
_1._ioWatch=function(dfd,_22,_23,_24){
var _25=dfd.ioArgs.args;
if(_25.timeout){
dfd.startTime=(new Date()).getTime();
}
_1d.push({dfd:dfd,validCheck:_22,ioCheck:_23,resHandle:_24});
if(!_1c){
_1c=setInterval(_20,50);
}
if(_25.sync){
_20();
}
};
var _26="application/x-www-form-urlencoded";
var _27=function(dfd){
return dfd.ioArgs.xhr.readyState;
};
var _28=function(dfd){
return 4==dfd.ioArgs.xhr.readyState;
};
var _29=function(dfd){
var xhr=dfd.ioArgs.xhr;
if(_1._isDocumentOk(xhr)){
dfd.callback(dfd);
}else{
var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);
err.status=xhr.status;
err.responseText=xhr.responseText;
dfd.errback(err);
}
};
dojo._ioAddQueryToUrl=function(_2a){
if(_2a.query.length){
_2a.url+=(_2a.url.indexOf("?")==-1?"?":"&")+_2a.query;
_2a.query=null;
}
};
dojo.xhr=function(_2b,_2c,_2d){
var dfd=_1._ioSetArgs(_2c,_17,_19,_1a);
var _2e=dfd.ioArgs;
var xhr=_2e.xhr=_1._xhrObj(_2e.args);
if(!xhr){
dfd.cancel();
return dfd;
}
if("postData" in _2c){
_2e.query=_2c.postData;
}else{
if("putData" in _2c){
_2e.query=_2c.putData;
}else{
if("rawBody" in _2c){
_2e.query=_2c.rawBody;
}else{
if((arguments.length>2&&!_2d)||"POST|PUT".indexOf(_2b.toUpperCase())==-1){
_1._ioAddQueryToUrl(_2e);
}
}
}
}
xhr.open(_2b,_2e.url,_2c.sync!==true,_2c.user||undefined,_2c.password||undefined);
if(_2c.headers){
for(var hdr in _2c.headers){
if(hdr.toLowerCase()==="content-type"&&!_2c.contentType){
_2c.contentType=_2c.headers[hdr];
}else{
if(_2c.headers[hdr]){
xhr.setRequestHeader(hdr,_2c.headers[hdr]);
}
}
}
}
xhr.setRequestHeader("Content-Type",_2c.contentType||_26);
if(!_2c.headers||!("X-Requested-With" in _2c.headers)){
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
if(_2c.overrideMinmeType&&xhr.overrideMimeType){
xhr.overrideMimeType(_2c.overrideMimeType);
}
_1._ioNotifyStart(dfd);
if(dojo.config.debugAtAllCosts){
xhr.send(_2e.query);
}else{
try{
xhr.send(_2e.query);
}
catch(e){
_2e.error=e;
dfd.cancel();
}
}
_1._ioWatch(dfd,_27,_28,_29);
xhr=null;
return dfd;
};
dojo.xhrGet=function(_2f){
return _1.xhr("GET",_2f);
};
dojo.rawXhrPost=dojo.xhrPost=function(_30){
return _1.xhr("POST",_30,true);
};
dojo.rawXhrPut=dojo.xhrPut=function(_31){
return _1.xhr("PUT",_31,true);
};
dojo.xhrDelete=function(_32){
return _1.xhr("DELETE",_32);
};
}(dojo));
dojo.attachScript=function(_1){
var _2=dojo.doc;
var _3=_2.createElement("script");
_3.type="text/javascript";
_3.src=_1.url;
_3.charset="utf-8";
return _2.getElementsByTagName("head")[0].appendChild(_3);
};
(function(){
var _1=0;
var _2={};
dojo.jsonp=function(_3){
if(!_3.url){
throw new Error("dojo.jsonp: No URL specified.");
}
if(!_3.jsonp){
throw new Error("dojo.jsonp: No callback param specified.");
}
_1++;
var _4="jsonp_callback_"+_1;
var _5=_3.timeout||3000;
_2[_1]=setTimeout(function(){
dojo.jsonp[_4]=function(){
};
clearTimeout(_2[_1]);
if(_3.error){
_3.error(null,{});
}
if(_3.handle){
_3.handle(null,{});
}
},_5);
_3.url+="?"+_3.jsonp+"=dojo.jsonp."+_4;
dojo.jsonp[_4]=function(_6){
clearTimeout(_2[_1]);
try{
if(_3.load){
_3.load(_6,{});
}
}
catch(e){
if(_3.error){
_3.error(null,{});
}
}
if(_3.handle){
_3.handle(_6,{});
}
};
if(_3.content){
_3.url+="&"+dojo.objectToQuery(_3.content);
}
return dojo.attachScript(_3);
};
})();
dojo.declare=function(_1,_2,_3){
var dd=arguments.callee,_4;
if(dojo.isArray(_2)){
_4=_2;
_2=_4.shift();
}
if(_4){
dojo.forEach(_4,function(m,i){
if(!m){
throw (_1+": mixin #"+i+" is null");
}
_2=dd._delegate(_2,m);
});
}
var _5=dd._delegate(_2);
_3=_3||{};
_5.extend(_3);
dojo.extend(_5,{declaredClass:_1,_constructor:_3.constructor});
_5.prototype.constructor=_5;
return dojo.setObject(_1,_5);
};
dojo.mixin(dojo.declare,{_delegate:function(_6,_7){
var bp=(_6||0).prototype,mp=(_7||0).prototype,dd=dojo.declare;
var _8=dd._makeCtor();
dojo.mixin(_8,{superclass:bp,mixin:mp,extend:dd._extend});
if(_6){
_8.prototype=dojo._delegate(bp);
}
dojo.extend(_8,dd._core,mp||0,{_constructor:null,preamble:null});
_8.prototype.constructor=_8;
_8.prototype.declaredClass=(bp||0).declaredClass+"_"+(mp||0).declaredClass;
return _8;
},_extend:function(_9){
var i,fn;
for(i in _9){
if(dojo.isFunction(fn=_9[i])&&!0[i]){
fn.nom=i;
fn.ctor=this;
}
}
dojo.extend(this,_9);
},_makeCtor:function(){
return function(){
this._construct(arguments);
};
},_core:{_construct:function(_a){
var c=_a.callee,s=c.superclass,ct=s&&s.constructor,m=c.mixin,_b=m&&m.constructor,a=_a,ii,fn;
if(a[0]){
if(((fn=a[0].preamble))){
a=fn.apply(this,a)||a;
}
}
if((fn=c.prototype.preamble)){
a=fn.apply(this,a)||a;
}
if(ct&&ct.apply){
ct.apply(this,a);
}
if(_b&&_b.apply){
_b.apply(this,a);
}
if((ii=c.prototype._constructor)){
ii.apply(this,_a);
}
if(this.constructor.prototype==c.prototype&&(ct=this.postscript)){
ct.apply(this,_a);
}
},_findMixin:function(_c){
var c=this.constructor,p,m;
while(c){
p=c.superclass;
m=c.mixin;
if(m==_c||(m instanceof _c.constructor)){
return p;
}
if(m&&m._findMixin&&(m=m._findMixin(_c))){
return m;
}
c=p&&p.constructor;
}
},_findMethod:function(_d,_e,_f,has){
var p=_f,c,m,f;
do{
c=p.constructor;
m=c.mixin;
if(m&&(m=this._findMethod(_d,_e,m,has))){
return m;
}
if((f=p[_d])&&(has==(f==_e))){
return p;
}
p=c.superclass;
}while(p);
return !has&&(p=this._findMixin(_f))&&this._findMethod(_d,_e,p,has);
},inherited:function(_10,_11,_12){
var a=arguments;
if(typeof a[0]!="string"){
_12=_11;
_11=_10;
_10=_11.callee.nom;
}
a=_12||_11;
var c=_11.callee,p=this.constructor.prototype,fn,mp;
if(this[_10]!=c||p[_10]==c){
mp=(c.ctor||0).superclass||this._findMethod(_10,c,p,true);
if(!mp){
throw (this.declaredClass+": inherited method \""+_10+"\" mismatch");
}
p=this._findMethod(_10,c,mp,false);
}
fn=p&&p[_10];
if(!fn){
throw (mp.declaredClass+": inherited method \""+_10+"\" not found");
}
return fn.apply(this,a);
}}});
dojo.delegate=dojo._delegate=(function(){
function _1(){
};
return function(_2,_3){
_1.prototype=_2;
var _4=new _1();
_1.prototype=null;
if(_3){
dojo._mixin(_4,_3);
}
return _4;
};
})();
dojo.query=function(_1,_2){
if(typeof _2=="string"){
_2=d.byId(_2);
if(!_2){
return [];
}
}
_2=_2||dojo.doc;
var n=_2.querySelectorAll(_1);
return n||[];
};

