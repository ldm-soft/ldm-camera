(this.webpackJsonphandpose=this.webpackJsonphandpose||[]).push([[0],{251:function(e,t,n){e.exports=n(280)},256:function(e,t,n){},262:function(e,t){},263:function(e,t){},271:function(e,t){},274:function(e,t){},275:function(e,t){},276:function(e,t,n){},280:function(e,t,n){"use strict";n.r(t);var a=n(41),r=n.n(a),c=n(227),o=n.n(c),i=(n(256),n(5)),u=n.n(i),s=n(13),l=n(8),d=(n(279),n(250)),f=n(246),v=n.n(f),h=(n(276),function(e,t){e.forEach((function(e){var n=Object(l.a)(e.bbox,4),a=n[0],r=n[1],c=n[2],o=n[3],i=e.class,u=Math.floor(16777215*Math.random()).toString(16);t.strokeStyle="#"+u,t.font="18px Arial",t.beginPath(),t.fillStyle="#"+u,t.fillText(i,a,r),t.rect(a,r,c,o),t.stroke()}))}),m=n(247);var g=function(){var e=Object(a.useRef)(null),t=Object(a.useRef)(null),n=Object(a.useState)(0),c=Object(l.a)(n,2),o=c[0],i=c[1],f=function(){var e=Object(s.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a();case 2:t=e.sent,console.log("Handpose model loaded."),setInterval((function(){g(t)}),10);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(){var n=Object(s.a)(u.a.mark((function n(a){var r,c,o,s,l,d;return u.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if("undefined"===typeof e.current||null===e.current||4!==e.current.video.readyState){n.next=16;break}return r=e.current.video,c=e.current.video.videoWidth,o=e.current.video.videoHeight,e.current.video.width=c,e.current.video.height=o,t.current.width=c,t.current.height=o,n.next=10,a.detect(r);case 10:s=n.sent,l=0,Object.values(s).forEach((function(e){"person"==e.class&&l++})),i(l),d=t.current.getContext("2d"),h(s,d);case 16:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();Object(a.useEffect)((function(){f()}),[]),Object(a.useEffect)((function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then((function(e){!function(){var e;console.log("loadDevices"),(null===(e=navigator.mediaDevices)||void 0===e?void 0:e.enumerateDevices)?navigator.mediaDevices.enumerateDevices().then((function(e){var t=[];e.forEach((function(e){JSON.stringify(e),"videoinput"==e.kind&&t.push(e)})),S(t),O(e[D].deviceId)})).catch((function(e){console.error("".concat(e.name,": ").concat(e.message))})):console.log("enumerateDevices() not supported.")}()}))}),[]);var p=r.a.useState({}),b=Object(l.a)(p,2),E=b[0],O=b[1],x=r.a.useState([]),j=Object(l.a)(x,2),y=j[0],S=j[1],k=r.a.useState(0),w=Object(l.a)(k,2),D=w[0],A=w[1];return r.a.createElement("div",{className:"App"},r.a.createElement(m.a,null,r.a.createElement("meta",{charSet:"utf-8"}),r.a.createElement("title",null,"LDM SOFT"),r.a.createElement("meta",{name:"description",content:"LDM-CAMERA"}),r.a.createElement("link",{rel:"icon",type:"image/png",href:"./icon/logo.png"})),r.a.createElement("header",{className:"App-header"},r.a.createElement("div",{className:"camera-info"},"Camera: ",D+1," of ",y.length),r.a.createElement("div",{className:"person ".concat(o>30?"alert-red":"")},"Person: ",o),y.length>1&&r.a.createElement("button",{className:"devicesButton",onClick:function(){var e=D;D<y.length-1?e++:e=0,console.log(e),A(e),O(y[e].deviceId)}},"Change Camera"),r.a.createElement(v.a,{ref:e,muted:!0,videoConstraints:{deviceId:E},style:{position:"absolute",marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:9,width:"100%",height:"100%"}}),r.a.createElement("canvas",{ref:t,style:{position:"absolute",marginLeft:"auto",marginRight:"auto",left:0,right:0,textAlign:"center",zindex:8,width:"100%",height:"100%"}})))};o.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[251,1,2]]]);
//# sourceMappingURL=main.3cb986f9.chunk.js.map