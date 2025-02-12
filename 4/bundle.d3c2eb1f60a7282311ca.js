(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",u="quarter",d="year",c="date",f="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,a=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:o,d:a,D:c,h:r,m:s,s:i,ms:n,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",$={};$[y]=m;var g=function(t){return t instanceof D},b=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();$[r]&&(s=r),n&&($[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;$[o]=e,s=o}return!i&&s&&(y=s),s||!i&&y},M=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},w=_;w.l=b,w.i=g,w.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function m(t){this.$L=b(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(h);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return w},v.isValid=function(){return!(this.$d.toString()===f)},v.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return M(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<M(t)},v.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,u=!!w.u(e)||e,f=w.p(t),h=function(t,e){var i=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return u?i:i.endOf(a)},p=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(f){case d:return u?h(1,0):h(31,11);case l:return u?h(1,v):h(0,v+1);case o:var $=this.$locale().weekStart||0,g=(m<$?m+7:m)-$;return h(u?_-g:_+(6-g),v);case a:case c:return p(y+"Hours",0);case r:return p(y+"Minutes",1);case s:return p(y+"Seconds",2);case i:return p(y+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var o,u=w.p(t),f="set"+(this.$u?"UTC":""),h=(o={},o[a]=f+"Date",o[c]=f+"Date",o[l]=f+"Month",o[d]=f+"FullYear",o[r]=f+"Hours",o[s]=f+"Minutes",o[i]=f+"Seconds",o[n]=f+"Milliseconds",o)[u],p=u===a?this.$D+(e-this.$W):e;if(u===l||u===d){var m=this.clone().set(c,1);m.$d[h](p),m.init(),this.$d=m.set(c,Math.min(this.$D,m.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[w.p(t)]()},v.add=function(n,u){var c,f=this;n=Number(n);var h=w.p(u),p=function(t){var e=M(f);return w.w(e.date(e.date()+Math.round(t*n)),f)};if(h===l)return this.set(l,this.$M+n);if(h===d)return this.set(d,this.$y+n);if(h===a)return p(1);if(h===o)return p(7);var m=(c={},c[s]=t,c[r]=e,c[i]=1e3,c)[h]||1,v=this.$d.getTime()+n*m;return w.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,u=n.months,d=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},c=function(t){return w.s(r%12||12,t,"0")},h=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:w.s(o+1,2,"0"),MMM:d(n.monthsShort,o,u,3),MMMM:d(u,o),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:w.s(r,2,"0"),h:c(1),hh:c(2),a:h(r,a,!0),A:h(r,a,!1),m:String(a),mm:w.s(a,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(p,(function(t,e){return e||m[t]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,c,f){var h,p=w.p(c),m=M(n),v=(m.utcOffset()-this.utcOffset())*t,_=this-m,y=w.m(this,m);return y=(h={},h[d]=y/12,h[l]=y,h[u]=y/3,h[o]=(_-v)/6048e5,h[a]=(_-v)/864e5,h[r]=_/e,h[s]=_/t,h[i]=_/1e3,h)[p]||_,f?y:w.a(y)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return $[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},v.clone=function(){return w.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),T=D.prototype;return M.prototype=T,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",d],["$D",c]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,D,M),t.$i=!0),M},M.locale=b,M.isDayjs=g,M.unix=function(t){return M(1e3*t)},M.en=$[y],M.Ls=$,M.p={},M}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,i=6e4,s=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,l=2592e6,u=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:o,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},c=function(t){return t instanceof y},f=function(t,e,n){return new y(t,n,e.$l)},h=function(t){return e.p(t)+"s"},p=function(t){return t<0},m=function(t){return p(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},_=function(t,e){return t?p(t)?{negative:!0,format:""+v(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},y=function(){function p(t,e,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return f(t*d[h(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[h(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(u);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=p.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*d[n]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=m(t/o),t%=o,this.$d.months=m(t/l),t%=l,this.$d.days=m(t/r),t%=r,this.$d.hours=m(t/s),t%=s,this.$d.minutes=m(t/i),t%=i,this.$d.seconds=m(t/n),t%=n,this.$d.milliseconds=t},v.toISOString=function(){var t=_(this.$d.years,"Y"),e=_(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=_(n,"D"),s=_(this.$d.hours,"H"),r=_(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3);var o=_(a,"S"),l=t.negative||e.negative||i.negative||s.negative||r.negative||o.negative,u=s.format||r.format||o.format?"T":"",d=(l?"-":"")+"P"+t.format+e.format+i.format+u+s.format+r.format+o.format;return"P"===d||"-P"===d?"P0D":d},v.toJSON=function(){return this.toISOString()},v.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(t,e){return e||String(i[t])}))},v.as=function(t){return this.$ms/d[h(t)]},v.get=function(t){var e=this.$ms,n=h(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?m(e/d[n]):this.$d[n],0===e?0:e},v.add=function(t,e,n){var i;return i=e?t*d[h(e)]:c(t)?t.$ms:f(t,this).$ms,f(this.$ms+i*(n?-1:1),this)},v.subtract=function(t,e){return this.add(t,e,!0)},v.locale=function(t){var e=this.clone();return e.$l=t,e},v.clone=function(){return f(this.$ms,this)},v.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},p}();return function(n,i,s){t=s,e=s().$utils(),s.duration=function(t,e){var n=s.locale();return f(t,{$l:n},e)},s.isDuration=c;var r=i.prototype.add,a=i.prototype.subtract;i.prototype.add=function(t,e){return c(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return c(t)&&(t=t.asMilliseconds()),a.bind(this)(t,e)}}}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=n(484),e=n.n(t),i=n(646),s=n.n(i);e().extend(s());const r="D MMMM",a=t=>t[Math.floor(Math.random()*t.length)],o=(t,e)=>Math.floor(Math.random()*(e-t+1))+t,l=t=>t?e()(t).format(r):"",u=t=>t?e()(t).format("HH:mm"):"",d=(t,n)=>{const i=e().duration(e()(n).diff(e()(t)));return i.days()?i.format("DD[d] HH[h] mm[m]"):i.hours()?i.format("HH[h] mm[m]"):i.format("mm[m]")},c={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let f;const h=new Uint8Array(16),p=[];for(let t=0;t<256;++t)p.push((t+256).toString(16).slice(1));const m=function(t,e,n){if(c.randomUUID&&!e&&!t)return c.randomUUID();const i=(t=t||{}).random??t.rng?.()??function(){if(!f){if("undefined"==typeof crypto||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");f=crypto.getRandomValues.bind(crypto)}return f(h)}();if(i.length<16)throw new Error("Random bytes length must be >= 16");if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e){if((n=n||0)<0||n+16>e.length)throw new RangeError(`UUID byte range ${n}:${n+15} is out of buffer bounds`);for(let t=0;t<16;++t)e[n+t]=i[t];return e}return function(t,e=0){return(p[t[e+0]]+p[t[e+1]]+p[t[e+2]]+p[t[e+3]]+"-"+p[t[e+4]]+p[t[e+5]]+"-"+p[t[e+6]]+p[t[e+7]]+"-"+p[t[e+8]]+p[t[e+9]]+"-"+p[t[e+10]]+p[t[e+11]]+p[t[e+12]]+p[t[e+13]]+p[t[e+14]]+p[t[e+15]]).toLowerCase()}(i)},v=["taxi","bus","train","ship","drive","check-in","sightseeing","restaurant"],_=["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Cras aliquet varius magna, non porta ligula feugiat eget.","Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.","Sed sed nisi sed augue convallis suscipit in sed felis.","Aliquam erat volutpat.","Nunc fermentum tortor ac porta dapibus.","In rutrum ac purus sit amet tempus."],y=(t=>{const e=[];let n=1;const i=()=>({title:"Offer's title "+n++,price:o(100,5e3),id:m()});for(let n=0;n<t.length;n++){const s={type:t[n],price:o(100,5e3),offers:Array.from({length:o(0,3)},i)};e.push(s)}return e})(v),$=(t=>{const e=[],n=()=>({src:`https://loremflickr.com/248/152?random=${o(1,100)}`,description:a(_)});for(let i=0;i<t.length;i++){const s={id:m(),description:a(_),name:t[i],pictures:Array.from({length:o(0,5)},n)};e.push(s)}return e})(["Amsterdam","Chamonix","Geneva","Paris","Berlin","Prague","Tokyo","Moscow","Saint-Petersburg"]),g=()=>{const t=a(y),e=a($),{type:n,offers:i}=t,s=i.map((t=>t.id)).slice(0,o(0,i.length));return{id:m(),basePrice:o(100,5e3),dateFrom:"2024-02-02T21:42:04.116Z",dateTo:"2024-03-02T21:42:04.116Z",destination:e.id,favorite:Math.random()<.5,offersId:s,type:n}};function b(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function M(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}class w{getTemplate(){return'          <section class="trip-main__trip-info  trip-info">\n            <div class="trip-info__main">\n              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n            </div>\n\n            <p class="trip-info__cost">\n              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n            </p>\n          </section>'}getElement(){return this.element||(this.element=b(this.getTemplate())),this.element}removeElement(){this.element=null}}class D{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n                <div class="trip-filters__filter">\n                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n                  <label class="trip-filters__filter-label" for="filter-future">Future</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n                  <label class="trip-filters__filter-label" for="filter-present">Present</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n                  <label class="trip-filters__filter-label" for="filter-past">Past</label>\n                </div>\n\n                <button class="visually-hidden" type="submit">Accept filter</button>\n              </form>'}getElement(){return this.element||(this.element=b(this.getTemplate())),this.element}removeElement(){this.element=null}}class T{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}getElement(){return this.element||(this.element=b(this.getTemplate())),this.element}removeElement(){this.element=null}}class S{getTemplate(){return"<ul class='trip-events__list'>\n  </ul>"}getElement(){return this.element||(this.element=b(this.getTemplate())),this.element}removeElement(){this.element=null}}class O{constructor(t,e,n){this.waypoint=t,this.offers=e,this.destination=n}getTemplate(){return((t,e,n)=>{const{basePrice:i,type:s,favorite:r,dateFrom:a,dateTo:o}=t,{name:c}=n;return(({dateFrom:t,dateTo:e,type:n,name:i,basePrice:s,favorite:r,offers:a,humanizeTaskDueDate:o,humanizeTaskDueTime:l,getDuration:u})=>{return`<li class="trip-events__item">\n  <div class="event">\n    <time class="event__date" datetime="${t}">${o(t)}</time>\n    <div class="event__type">\n      <img class="event__type-icon" width="42" height="42" src="img/icons/${n}.png" alt="Event type icon">\n    </div>\n    <h3 class="event__title">${n} ${i}</h3>\n    <div class="event__schedule">\n      <p class="event__time">\n        <time class="event__start-time" datetime="${t}">${l(t)}</time>\n        &mdash;\n        <time class="event__end-time" datetime="${e}">${l(t)}</time>\n      </p>\n      <p class="event__duration">${u(t,e)}</p>\n    </div>\n    <p class="event__price">\n      &euro;&nbsp;<span class="event__price-value">${s}</span>\n    </p>\n    <h4 class="visually-hidden">Offers:</h4>\n    <ul class="event__selected-offers">\n      ${d=a,d.map((t=>`\n    <li class="event__offer">\n      <span class="event__offer-title">${t.title}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${t.price}</span>\n    </li>\n  `)).join("")}\n    </ul>\n    <button class="event__favorite-btn ${r?"event__favorite-btn--active":""}" type="button">\n      <span class="visually-hidden">Add to favorite</span>\n      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n      </svg>\n    </button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </div></li>`;var d})({dateFrom:a,dateTo:o,type:s,name:c,basePrice:i,favorite:r,offers:e,humanizeTaskDueDate:l,humanizeTaskDueTime:u,getDuration:d})})(this.waypoint,this.offers,this.destination)}getElement(){return this.element||(this.element=b(this.getTemplate())),this.element}removeElement(){this.element=null}}const E=t=>t.toLowerCase().replace(/ /g,"-");class k{constructor({waypoint:t,offers:e,destination:n,offersType:i,destinationsAll:s}){this.waypoint=t,this.offers=e,this.description=n,this.offersType=i,this.destinationsAll=s}getTemplate(){return((t,e,n,i,s)=>{const a=e.map((t=>t.id)),{type:o,dateFrom:u,dateTo:d,basePrice:c,id:f}=t,{name:h,description:p,pictures:m}=n;return(({id:t,type:e,dateFrom:n,dateTo:i,basePrice:s,namePoint:r,description:a,pictures:o,POINT_TYPES:l,idWaypoints:u,offersType:d,destinationsAll:c,createClassName:f,humanizeTaskDueDate:h,DATE_FORMAT:p})=>`<li class="trip-events__item"><form class="event event--edit" action="#" method="post">\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-${t}">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${e}.png" alt="Event ${e} icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${t}" type="checkbox">\n\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n            ${l.map((n=>`<div class="event__type-item">\n              <input id="event-type-${n}-${t}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${n}" ${e===n?"checked":""}>\n              <label class="event__type-label  event__type-label--${n}" for="event-type-${n}-${t}">${n}</label>\n            </div>`)).join("")}\n          </fieldset>\n        </div>\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-${t}">\n          ${e}\n        </label>\n        <input class="event__input  event__input--destination" id="event-destination-${t}" type="text" name="event-destination" value="${r}" list="destination-list-${t}">\n        <datalist id="destination-list-${t}">\n        ${c.map((({name:t})=>`<option value="${t}"></option>`)).join("")}\n        </datalist>\n      </div>\n\n      <div class="event__field-group  event__field-group--time">\n        <label class="visually-hidden" for="event-start-time-${t}">From</label>\n        <input class="event__input  event__input--time" id="event-start-time-${t}" type="text" name="event-start-time" value="${h(n,p.year)}">\n        &mdash;\n        <label class="visually-hidden" for="event-end-time-${t}">To</label>\n        <input class="event__input  event__input--time" id="event-end-time-${t}" type="text" name="event-end-time" value="${h(i,p.year)}">\n      </div>\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-${t}">\n          <span class="visually-hidden">Price</span>\n          &euro;\n        </label>\n        <input class="event__input  event__input--price" id="event-price-${t}" type="text" name="event-price" value="${s}">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">Delete</button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </header>\n    <section class="event__details">\n      ${d.offers.length?`\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n          <div class="event__available-offers">\n            ${d.offers.map((({title:t,id:e,price:n})=>`\n              <div class="event__offer-selector">\n                <input class="event__offer-checkbox  visually-hidden"\n                  id="event-offer-${f(t)}-${e}"\n                  type="checkbox"\n                  name="event-offer-${f(t)}"\n                  ${u.includes(e)?"checked":""}>\n                <label class="event__offer-label" for="event-offer-${f(t)}-${e}">\n                  <span class="event__offer-title">${t}</span>\n                  &plus;&euro;&nbsp;\n                  <span class="event__offer-price">${n}</span>\n                </label>\n              </div>`)).join("")}\n          </div>\n        </section>`:""}\n\n      <section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">${a}</p>\n        ${o.length?`\n          <div class="event__photos-container">\n            <div class="event__photos-tape">\n            ${o.map((({src:t,description:e})=>`\n              <img class="event__photo" src="${t}" alt="${e}">`)).join("")}\n            </div>\n          </div>`:""}\n      </section>\n    </section>\n  </form></li>`)({id:f,type:o,dateFrom:u,dateTo:d,basePrice:c,namePoint:h,description:p,pictures:m,POINT_TYPES:v,idWaypoints:a,offersType:i,destinationsAll:s,createClassName:E,humanizeTaskDueDate:l,DATE_FORMAT:r})})(this.waypoint,this.offers,this.description,this.offersType,this.destinationsAll)}getElement(){return this.element||(this.element=b(this.getTemplate())),this.element}removeElement(){this.element=null}}const C=document.querySelector(".trip-main"),I=C.querySelector(".trip-controls__filters"),Y=document.querySelector(".trip-events"),A=new class{waypoints=Array.from({length:3},g);offers=y;destinations=$;getWaypoints(){return this.waypoints}getOffers(){return this.offers}getOffersByType(t){return this.getOffers().find((e=>e.type===t))}getOffersById(t,e){return this.getOffersByType(t).offers.filter((t=>e.includes(t.id)))}getDestinations(){return this.destinations}getDestinationsById(t){return this.getDestinations().find((e=>e.id===t))}},P=new class{constructor({tripInfoContainer:t,filterListContainer:e}){this.tripInfoContainer=t,this.filterListContainer=e}init(){M(new w,this.tripInfoContainer,"afterbegin"),M(new D,this.filterListContainer)}}({tripInfoContainer:C,filterListContainer:I}),x=new class{waypointListElement=new S;constructor({listContainer:t,waypointModel:e}){this.listContainer=t,this.waypointModel=e}init(){this.waypoints=[...this.waypointModel.getWaypoints()],M(new T,this.listContainer),M(this.waypointListElement,this.listContainer),M(new k({waypoint:this.waypoints[0],offersType:this.waypointModel.getOffersByType(this.waypoints[0].type),offers:[...this.waypointModel.getOffersById(this.waypoints[0].type,this.waypoints[0].offersId)],destination:this.waypointModel.getDestinationsById(this.waypoints[0].destination),destinationsAll:this.waypointModel.getDestinations()}),this.waypointListElement.getElement()),this.waypoints.forEach((t=>{this.renderWaypoint(t)}))}renderWaypoint(t){const e=this.waypointModel.getOffersById(t.type,t.offersId),n=this.waypointModel.getDestinationsById(t.destination);M(new O(t,e,n),this.waypointListElement.getElement())}}({listContainer:Y,waypointModel:A});P.init(),x.init()})()})();
//# sourceMappingURL=bundle.d3c2eb1f60a7282311ca.js.map