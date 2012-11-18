define(["map"],function(e){var t=function(e,t){return e.indexOf(t)>-1},n=function(e){var t=Math.floor(e/32);return t<0&&(t=0),t},r=function(t,r){var i=!1,s=e.currentMap.layers.length;for(l=0;l<s;l++){var o=e.currentMap.layers[l],u=o.width,a=o.data[u*n(r)+n(t)]-1;if(a!==-1){var f=e.currentMap.tilesets[0].tileproperties;f[a].passable==="false"&&(i=f[a])}}return i},i=function(e,t){if(e%32===0)return[n(e)];var r=n(e),i=n(t),s=[];for(var o=r;o<i;o++)s.push(o);return s.push(i),s},s=function(t,n,r){var i=[],s=e.currentMap.layers.length;for(l=0;l<s;l++){var o=e.currentMap.layers[l],u=o.width;for(var a=0;a<t.length;a++){var f=t[a];for(var c=0;c<n.length;c++){var h=n[c],p=o.data[u*h+f]-1,d=e.currentMap.tilesets[0].tileproperties;p===-1?i.push(!1):i.push(d[p].passable==="false")}}}return i};return function(o,u){var a=o.data.physics.checkAgainst,f=o.data.physics.types;if(!(o.data.physics.checkAgainst.length>0))return!1;var l=o.data.x-o.data.frameData.cpx,c=o.data.y-o.data.frameData.cpy,h=l+o.data.w,p=c+o.data.h,d=(l+h)/2,v=(c+p)/2,m=0,g,y,b,w;if(t(a,"map")){m=0,o.data.event.walk&&o.data.direction.left&&(m=o.data.walkSpeed),g=n(l-m)*32,y=n(v)*32,b=g+32,w=y+32;var E=s([n(l-m)],i(c,p));(l+m<=0||E.indexOf(!0)>-1)&&o.on.collideLeft.call(o,{x:n(l+m)}),m=0,o.data.event.walk&&o.data.direction.right&&(m=o.data.walkSpeed),g=n(h+m)*32,y=n(v)*32,b=g+32,w=y+32;var S=s([n(h+m)],i(c,p));(h+m>=e.currentMap.width*32||S.indexOf(!0)>-1)&&o.on.collideRight.call(o,{x:n(h+m)}),m=0,o.data.event.jump&&(m=Math.floor(2*o.data.jumpRate)),g=n(d)*32,y=n(c-m)*32,b=g+32,w=y+32;var x=s(i(l,h),[n(c+m)]);(c+m<=0||x.indexOf(!0)>-1)&&o.on.collideTop.call(o,{y:n(c+m)}),m=0,o.data.event.fall&&(m=Math.floor(2*o.data.fallRate)),g=n(d)*32,y=n(p+m)*32,b=g+32,w=y+32;var T=s(i(l,h),[n(p+m)]);(p+m>=e.currentMap.height*32||T.indexOf(!0)>-1)&&o.on.collideBottom.call(o,{y:n(p+m)})}if(t(a,"entity"))for(var N=0;N<u.length;N++){var C=u[N];if(C.data.uniqueId!==o.data.uniqueId&&t(C.data.physics.types,"entity"))var g=C.data.x-C.data.frameData.cpx,y=C.data.y-C.data.frameData.cpy,b=g+C.data.w,w=y+C.data.h,k=(g+b)/2,L=(y+w)/2}}})