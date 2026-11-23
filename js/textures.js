// textures.js: Building facades drawn once into offscreen canvases (textures), then mapped onto the street.
/* ---------- texture kit ---------- */
let U=40;
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function mul(hex,k){const n=parseInt(hex.slice(1),16);return'rgb('+[n>>16,n>>8&255,n&255].map(v=>Math.max(0,Math.min(255,v*k|0))).join(',')+')'}
function mk(lw,lh,fn,seed=7,S=40){U=S;const c=document.createElement('canvas');c.width=Math.round(lw*S);c.height=Math.round(lh*S);fn(c.getContext('2d'),c.width,c.height,rng(seed));c.lw=lw;return c}
function ashlar(g,x,y,w,h,base,R,rh=8){g.fillStyle=mul(base,.68);g.fillRect(x,y,w,h);for(let yy=y,r=0;yy<y+h;yy+=rh,r++){let xx=x-(r%2)*9;while(xx<x+w){const bw=12+R()*16,a=Math.max(x,xx);g.fillStyle=mul(base,.9+R()*.2);g.fillRect(a+1,yy+1,Math.min(xx+bw,x+w)-a-1.5,Math.min(rh,y+h-yy)-1.5);xx+=bw}}}
function brick(g,x,y,w,h,base,R){g.fillStyle='#c9bfae';g.fillRect(x,y,w,h);for(let yy=y,r=0;yy<y+h;yy+=4,r++)for(let xx=x-(r%2)*5;xx<x+w;xx+=10){const a=Math.max(x,xx);g.fillStyle=mul(base,.85+R()*.3);g.fillRect(a,yy,Math.min(xx+9,x+w)-a,Math.min(3,y+h-yy))}}
function win(g,x,y,w,h,R,o={}){const f=o.frame||'#e8e2d2';g.fillStyle=f;g.fillRect(x-2,y-2,w+4,h+4);const lit=R()<(o.lit??.35);const gr=g.createLinearGradient(x,y,x,y+h);if(lit){gr.addColorStop(0,'#ffe9a8');gr.addColorStop(1,'#f0ae55')}else{gr.addColorStop(0,'#6d8eab');gr.addColorStop(1,'#223244')}g.fillStyle=gr;g.fillRect(x,y,w,h);if(o.mull!==false){g.fillStyle=f;g.fillRect(x+w/2-1,y,2,h);if(o.cross)g.fillRect(x,y+h*.38-1,w,2)}if(!lit){g.fillStyle='rgba(255,255,255,.16)';g.beginPath();g.moveTo(x,y+h*.6);g.lineTo(x+w*.6,y);g.lineTo(x+w*.85,y);g.lineTo(x,y+h*.85);g.fill()}}
function txt(g,s,x,y,size,col,font='Bungee'){g.fillStyle=col;g.font=(font==='Bungee'?'':'800 ')+size+'px '+font+', Impact, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(s,x,y)}
function glassWall(g,x,y,w,h,step,c0,c1){const gr=g.createLinearGradient(x,y,x+w*.4,y+h);gr.addColorStop(0,c0);gr.addColorStop(1,c1);g.fillStyle=gr;g.fillRect(x,y,w,h);g.fillStyle='rgba(235,240,245,.8)';for(let mx=x;mx<=x+w;mx+=step)g.fillRect(mx,y,2,h)}

const TEX={};
function buildTextures(){
 TEX.stephens=mk(11,4.6,(g,W,H,R)=>{const top=H-3.4*U,st='#a39d90',li='#ded6c3';
  for(const gx of[1.1,3.5,7.5,9.9]){const cx=gx*U,hw=.72*U;g.fillStyle=mul(st,.96);g.beginPath();g.moveTo(cx-hw,top+2);g.lineTo(cx-hw,top-.3*U);g.quadraticCurveTo(cx-hw,top-.72*U,cx-hw*.4,top-.78*U);g.lineTo(cx-hw*.4,top-1.05*U);g.lineTo(cx+hw*.4,top-1.05*U);g.lineTo(cx+hw*.4,top-.78*U);g.quadraticCurveTo(cx+hw,top-.72*U,cx+hw,top-.3*U);g.lineTo(cx+hw,top+2);g.closePath();g.fill();g.strokeStyle=li;g.lineWidth=4;g.stroke();win(g,cx-.14*U,top-.66*U,.28*U,.38*U,R,{frame:li,cross:true,lit:.5})}
  ashlar(g,0,top,W,H-top,st,R,10);
  g.fillStyle=li;g.fillRect(0,top,W,6);g.fillRect(0,top+1.62*U,W,5);g.fillStyle=mul(st,.72);g.fillRect(0,H-.32*U,W,.32*U);
  const c0=4.55*U,c1=6.45*U;ashlar(g,c0,top-.2*U,c1-c0,H-top+.2*U,'#b4ae9f',R,10);g.fillStyle=li;g.fillRect(c0,top-.2*U,c1-c0,6);g.fillRect(c0,top+1.62*U,c1-c0,5);
  const dx=5.5*U,dw=.8*U,dh=1.15*U;g.fillStyle=li;g.beginPath();g.moveTo(dx-dw/2-6,H-.32*U);g.lineTo(dx-dw/2-6,H-dh);g.arc(dx,H-dh,dw/2+6,Math.PI,0);g.lineTo(dx+dw/2+6,H-.32*U);g.fill();g.fillStyle='#3b2618';g.beginPath();g.moveTo(dx-dw/2,H-.32*U);g.lineTo(dx-dw/2,H-dh);g.arc(dx,H-dh,dw/2,Math.PI,0);g.lineTo(dx+dw/2,H-.32*U);g.fill();g.fillStyle='#ffcf70';g.fillRect(dx-2,H-dh,4,dh-.32*U);
  win(g,5.2*U,top+.35*U,.6*U,1*U,R,{frame:li,cross:true,lit:.8});
  for(const fy of[top+.4*U,top+1.98*U])for(let gx=.3;gx<10.8;gx+=1.2){if(gx>4.1&&gx<6.5)continue;g.fillStyle=li;g.fillRect(gx*U-5,fy-5,.96*U+10,.85*U+10);for(let k=0;k<3;k++)win(g,gx*U+k*.33*U,fy,.28*U,.85*U,R,{frame:li,cross:true,lit:.4})}
 },11,60);
 TEX.tower=mk(1.8,4.6,(g,W,H,R)=>{const st='#a8a294',li='#e2dac6',x0=.2*U,x1=1.6*U;
  ashlar(g,x0,.72*U,x1-x0,H-.72*U,st,R,12);g.fillStyle=mul(st,.8);g.fillRect(x0,.72*U,6,H);g.fillRect(x1-6,.72*U,6,H);
  g.fillStyle=st;for(let i=0;i<5;i++)g.fillRect(x0+i*(x1-x0-.2*U)/4,.48*U,.2*U,.26*U);g.fillStyle=li;g.fillRect(x0-4,.72*U,x1-x0+8,7);
  for(const px of[x0+3,x1-3]){g.fillStyle=mul(st,.95);g.beginPath();g.moveTo(px-.1*U,.78*U);g.lineTo(px,.02*U);g.lineTo(px+.1*U,.78*U);g.fill()}
  for(const bx of[.52,1.02]){const ax=bx*U,aw=.26*U;g.fillStyle=li;g.fillRect(ax-4,.95*U,aw+8,.8*U);g.fillStyle='#1c1a18';g.beginPath();g.moveTo(ax,1.72*U);g.lineTo(ax,1.12*U);g.arc(ax+aw/2,1.12*U,aw/2,Math.PI,0);g.lineTo(ax+aw,1.72*U);g.fill();g.fillStyle='#4a443d';for(let l=0;l<5;l++)g.fillRect(ax,1.14*U+l*.11*U,aw,4)}
  const cx=.9*U,cy=2.38*U,r=.43*U;g.fillStyle=li;g.beginPath();g.arc(cx,cy,r+8,0,7);g.fill();g.fillStyle='#fbfaf4';g.beginPath();g.arc(cx,cy,r,0,7);g.fill();g.strokeStyle='#111';g.lineWidth=3;g.stroke();
  g.fillStyle='#111';g.font='bold '+(r*.27)+'px Georgia, serif';g.textAlign='center';g.textBaseline='middle';['XII','I','II','III','IIII','V','VI','VII','VIII','IX','X','XI'].forEach((n,i)=>{const a=i*Math.PI/6-Math.PI/2;g.fillText(n,cx+Math.cos(a)*r*.76,cy+Math.sin(a)*r*.76)});
  win(g,.7*U,3.15*U,.4*U,.85*U,R,{frame:li,cross:true,lit:.7});
 },3,90);
 TEX.science=mk(13,4.9,(g,W,H,R)=>{const top=H-4.2*U;brick(g,0,top,W,H-top,'#8c3b2a',R);
  g.fillStyle='rgba(190,235,205,.9)';g.fillRect(8.6*U,top-.62*U,2.6*U,.62*U);g.fillStyle='rgba(255,255,255,.8)';for(let x=8.6*U;x<=11.2*U;x+=.26*U)g.fillRect(x,top-.62*U,2,.62*U);g.fillStyle='#3f8a4a';for(let i=0;i<14;i++){g.beginPath();g.arc(8.7*U+R()*2.4*U,top-.1*U-R()*.25*U,4+R()*5,0,7);g.fill()}
  for(const[a,b]of[[.5,3.7],[4.5,8.3],[9,12.5]]){const x=a*U,w=(b-a)*U;glassWall(g,x,top+.35*U,w,H-top-.35*U,.42*U,'#a9dbe0','#1d3d52');g.fillStyle='rgba(255,255,255,.8)';for(let f=0;f<5;f++)g.fillRect(x,top+.35*U+f*.78*U,w,5);for(let f=0;f<5;f++)for(let mx=x;mx<x+w-.42*U;mx+=.42*U)if(R()<.3){g.fillStyle='rgba(255,226,150,.55)';g.fillRect(mx+3,top+.35*U+f*.78*U+6,.42*U-5,.78*U-7)}}
  g.fillStyle='#6d2c1f';g.fillRect(0,top,W,.3*U);txt(g,'SCIENCE COMPLEX',2.1*U,top+.16*U,.2*U,'#f4efe4','Rubik');
 },5,40);
 TEX.cook=mk(9,4.4,(g,W,H,R)=>{const top=H-4.2*U;g.fillStyle='#cbb592';g.fillRect(0,top,W,H-top);
  for(let f=0;f<4;f++){const y=top+.35*U+f*.8*U;g.fillStyle='#1f2a36';g.fillRect(.2*U,y,W-.4*U,.42*U);for(let x=.2*U;x<W-.3*U;x+=.32*U)if(R()<.4){g.fillStyle='rgba(255,220,140,.85)';g.fillRect(x+2,y+3,.32*U-4,.42*U-6)}g.fillStyle='#b39c76';for(let x=.2*U;x<W;x+=.64*U)g.fillRect(x,y-3,.09*U,.48*U)}
  g.fillStyle='#a8916c';g.fillRect(0,top,W,.2*U);g.fillRect(0,H-1.12*U,W,.08*U);
  glassWall(g,3.6*U,H-.85*U,1.8*U,.85*U,.3*U,'#9cc6d6','#203546');g.fillStyle='#3a3a3a';g.fillRect(3.4*U,H-.95*U,2.2*U,.1*U);
  txt(g,'ALBERT S. COOK LIBRARY',4.5*U,H-1.27*U,.19*U,'#3a2a17','Rubik');
 },9,40);
 for(const L of'ABCD')TEX['glen'+L]=mk(2.6,11.4,(g,W,H,R)=>{const top=H-11*U;g.fillStyle='#e6e3dc';g.fillRect(0,top,W,H-top);g.fillStyle='#d0cbc1';for(let y=top;y<H;y+=.72*U)g.fillRect(0,y,W,2);
  g.fillStyle='#4b4f57';g.fillRect(.12*U,top,.38*U,H-top);g.fillStyle='#FFBB00';g.fillRect(.5*U,top+.4*U,.07*U,H-top-.4*U);
  for(let f=0;f<14;f++){const y=top+.58*U+f*.7*U;for(let x=.78*U;x<W-.3*U;x+=.45*U)win(g,x,y,.3*U,.42*U,R,{frame:'#bdb7ab',mull:false,lit:.32})}
  g.fillStyle='#2d3f52';g.fillRect(.6*U,H-.55*U,W-.9*U,.55*U);g.fillStyle='#3a3d44';g.fillRect(0,top,W,.4*U);txt(g,'TOWER '+L,W/2+.15*U,top+.21*U,.22*U,'#FFBB00');
 },L.charCodeAt(0),36);
 TEX.towncenter=mk(14,3.7,(g,W,H,R)=>{const top=H-3.2*U;g.fillStyle='#dacdb4';g.fillRect(0,top,W,H-top);g.fillStyle='#c7b99c';for(let x=0;x<W;x+=.9*U)g.fillRect(x,top,3,H-top);for(let y=top+.6*U;y<H;y+=.6*U)g.fillRect(0,y,W,2);g.fillStyle='#b4a383';g.fillRect(0,top,W,.25*U);
  const ex=5*U,ew=4*U;glassWall(g,ex,top+1*U,ew,H-top-1*U,.4*U,'#b5dbe6','#294a60');g.fillStyle='rgba(255,255,255,.7)';for(let y=top+1*U;y<H;y+=.5*U)g.fillRect(ex,y,ew,2);g.fillStyle='#262626';g.fillRect(ex-.3*U,H-1.05*U,ew+.6*U,.16*U);
  txt(g,'TOWSON TOWN CENTER',7*U,top+.6*U,.34*U,'#3a2f22');
  const cs=['#ff8fb1','#7fb8ff','#ffd84d','#6fd08c','#ff9a52'];for(let x=.4*U;x<W-1*U;x+=1.3*U){if(x>ex-1.2*U&&x<ex+ew+.2*U)continue;g.fillStyle='#24303c';g.fillRect(x,H-.95*U,1*U,.8*U);g.fillStyle='rgba(255,226,150,.4)';g.fillRect(x+4,H-.85*U,1*U-8,.6*U);g.fillStyle=cs[R()*5|0];g.fillRect(x,H-1.08*U,1*U,.13*U)}
 },14,40);
 TEX.courthouse=mk(9,4.2,(g,W,H,R)=>{const top=H-2.8*U,m='#ebe7de',sh='#d4cdbf';g.fillStyle=m;g.fillRect(0,top,W,H-top);g.fillStyle=sh;for(let y=top,r=0;y<H;y+=.22*U,r++){g.fillRect(0,y,W,1.5);for(let x=(r%2)*.3*U;x<W;x+=.6*U)g.fillRect(x,y,1.5,.22*U)}
  g.fillStyle='#f7f4ed';g.fillRect(0,top-.14*U,W,.22*U);g.fillStyle=sh;g.fillRect(0,top+.08*U,W,3);
  for(let i=0;i<9;i++){if(i>=3&&i<=5)continue;const cx=(i+.5)*U;win(g,cx-.2*U,top+.38*U,.4*U,.85*U,R,{frame:'#fff',cross:true,lit:.4});win(g,cx-.2*U,top+1.55*U,.4*U,.9*U,R,{frame:'#fff',cross:true,lit:.4})}
  const p0=3*U,p1=6*U;g.fillStyle='#bdb5a4';g.fillRect(p0,top+.1*U,p1-p0,H-top-.4*U);g.fillStyle='#4a3522';g.fillRect(4.25*U,H-1.25*U,.5*U,.9*U);win(g,4.3*U,top+.45*U,.4*U,.7*U,R,{frame:'#e8e2d2',cross:true,lit:.8});
  for(let k=0;k<4;k++){const cx=p0+.25*U+k*((p1-p0-.5*U)/3),cw=.26*U,gr=g.createLinearGradient(cx-cw/2,0,cx+cw/2,0);gr.addColorStop(0,'#d6d0c2');gr.addColorStop(.4,'#fdfcf8');gr.addColorStop(1,'#c4bdad');g.fillStyle=gr;g.fillRect(cx-cw/2,top+.1*U,cw,H-top-.48*U);g.fillStyle='rgba(0,0,0,.08)';for(let f=1;f<4;f++)g.fillRect(cx-cw/2+f*cw/4,top+.1*U,1.5,H-top-.48*U);g.fillStyle='#f7f4ed';g.fillRect(cx-cw/2-4,top+.06*U,cw+8,.1*U);g.fillRect(cx-cw/2-4,H-.44*U,cw+8,.08*U)}
  g.fillStyle='#f7f4ed';g.beginPath();g.moveTo(p0-.15*U,top-.12*U);g.lineTo((p0+p1)/2,top-.9*U);g.lineTo(p1+.15*U,top-.12*U);g.closePath();g.fill();g.strokeStyle=sh;g.lineWidth=4;g.stroke();g.fillStyle='#e2dccf';g.beginPath();g.moveTo(p0+.25*U,top-.2*U);g.lineTo((p0+p1)/2,top-.72*U);g.lineTo(p1-.25*U,top-.2*U);g.fill();
  g.fillStyle='#d8d2c4';for(let s=0;s<3;s++)g.fillRect(p0-.2*U+s*.06*U,H-.36*U+s*.12*U,p1-p0+.4*U-s*.12*U,.12*U);
  g.fillStyle='#555';g.fillRect(4.48*U,top-1.35*U,3,.5*U);const fx=4.48*U+3,fy=top-1.35*U;for(let s=0;s<7;s++){g.fillStyle=s%2?'#fff':'#b22234';g.fillRect(fx,fy+s*4,.5*U,4)}g.fillStyle='#3c3b6e';g.fillRect(fx,fy,.22*U,16);
 },9,40);
 TEX.armory=mk(6,3.5,(g,W,H,R)=>{const top=H-2.6*U,s='#e4dfd3';g.fillStyle=s;g.fillRect(0,top,W,H-top);g.fillStyle='#d3ccbd';for(let y=top;y<H;y+=.25*U)g.fillRect(0,y,W,1.5);
  g.fillStyle=s;for(let x=0;x<W;x+=.32*U)g.fillRect(x,top-.18*U,.19*U,.2*U);g.fillStyle='#d6cfbf';for(let x=.2*U;x<W;x+=.9*U)g.fillRect(x,top,.12*U,H-top);
  for(let x=.42*U;x<W-.3*U;x+=.9*U){if(x>1.9*U&&x<4.1*U)continue;win(g,x,top+.5*U,.36*U,.6*U,R,{frame:'#c9c1b0',cross:true});win(g,x,H-1.15*U,.36*U,.6*U,R,{frame:'#c9c1b0',cross:true})}
  for(const tx of[2.1,3.35]){const x=tx*U,w=.55*U;g.fillStyle='#ede9df';g.fillRect(x,top-.6*U,w,H-top+.6*U);g.fillStyle='#ede9df';for(let k=0;k<3;k++)g.fillRect(x+k*.21*U,top-.86*U,.13*U,.28*U);g.fillStyle='#2a2f38';g.fillRect(x+.2*U,top-.3*U,.14*U,.5*U);g.fillRect(x+.2*U,top+.95*U,.14*U,.55*U)}
  g.fillStyle='#3a2a1c';g.beginPath();const dx=3*U;g.moveTo(dx-.3*U,H);g.lineTo(dx-.3*U,H-.85*U);g.arc(dx,H-.85*U,.3*U,Math.PI,0);g.lineTo(dx+.3*U,H);g.fill();g.fillStyle='#ffcf70';g.fillRect(dx-2,H-.85*U,4,.85*U);
  txt(g,'ARMORY',3*U,top+.38*U,.19*U,'#6d6656');
 },6,40);
 TEX.wash=mk(4.4,9.4,(g,W,H,R)=>{const top=H-9.2*U;g.fillStyle='#d8d6d0';g.fillRect(0,top,W,H-top);for(let f=0;f<12;f++){const y=top+.42*U+f*.68*U;g.fillStyle='#2b3a4a';g.fillRect(.15*U,y,W-.3*U,.4*U);for(let x=.15*U;x<W-.4*U;x+=.36*U)if(R()<.35){g.fillStyle='rgba(255,230,160,.75)';g.fillRect(x+2,y+3,.36*U-4,.34*U)}g.fillStyle='#c8c5bd';for(let x=.15*U;x<W;x+=.72*U)g.fillRect(x,y,4,.4*U)}g.fillStyle='#2a2d33';g.fillRect(0,top,W,.32*U);g.fillStyle='#1f2a36';g.fillRect(.3*U,H-.6*U,W-.6*U,.6*U);txt(g,'401',W/2,top+.17*U,.2*U,'#FFBB00');},4,40);
 TEX.secu=mk(11,4.3,(g,W,H,R)=>{const top=H-3.6*U;glassWall(g,0,top,W,H-top,.5*U,'#8fc0d6','#1b3243');g.fillStyle='rgba(235,240,245,.85)';for(let y=top+.95*U;y<H;y+=.7*U)g.fillRect(0,y,W,3);for(let i=0;i<40;i++)if(R()<.5){g.fillStyle='rgba(255,226,150,.35)';g.fillRect(((R()*22)|0)*.5*U+3,top+.95*U+((R()*4)|0)*.7*U+3,.5*U-6,.7*U-6)}
  g.fillStyle='#FFBB00';for(let x=.8*U;x<W;x+=2.2*U)g.fillRect(x,top+.8*U,.12*U,H-top-.8*U);
  g.fillStyle='#26282d';g.fillRect(0,top-.15*U,W,.9*U);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(0,top+.75*U,W,.22*U);g.fillStyle='#FFBB00';g.fillRect(0,top+.7*U,W,4);txt(g,'SECU ARENA',W/2,top+.3*U,.44*U,'#fff');
  g.fillStyle='#0f1b24';for(let x=3.5*U;x<7.5*U;x+=.5*U)g.fillRect(x+3,H-.8*U,.5*U-6,.8*U);
 },11,40);
 TEX.unitas=mk(14,4.1,(g,W,H,R)=>{const top=H-3*U;for(let r=0;r<8;r++){const y=top+r*.18*U;g.fillStyle=r%2?'#e8a900':'#1a1a1a';g.fillRect(0,y,W,.18*U);for(let i=0;i<60;i++){g.fillStyle=['#fff','#FFBB00','#111','#c33','#5af'][R()*5|0];g.fillRect(R()*W,y+3,3,4)}}
  g.fillStyle='#bdb7ab';g.fillRect(0,top+1.45*U,W,H-top-1.45*U);g.fillStyle='#a9a396';g.fillRect(0,top+1.45*U,W,5);
  for(let x=.45*U;x<W-.6*U;x+=1.4*U){g.fillStyle='#2c2c2c';g.beginPath();g.moveTo(x,H);g.lineTo(x,H-.6*U);g.arc(x+.3*U,H-.6*U,.3*U,Math.PI,0);g.lineTo(x+.6*U,H);g.fill()}
  txt(g,'JOHNNY UNITAS STADIUM',W/2,top+1.82*U,.32*U,'#1a1a1a');
  g.fillStyle='#232323';g.fillRect(5*U,top-.9*U,4*U,.9*U);glassWall(g,5.15*U,top-.75*U,3.7*U,.45*U,.3*U,'#a9cde0','#2b4a61');txt(g,'TOWSON TIGERS',7*U,top-.14*U,.16*U,'#FFBB00');
 },14,40);
}
const FILL=[[],[],[]];
function buildFillers(){
 for(let s=0;s<3;s++){const st=['#9e978a','#a89f8c','#958f85'][s];FILL[0].push({len:5,h:2.6,th:3.6,roof:'#4d535c',tex:mk(5,3.6,(g,W,H,R)=>{const top=H-2.6*U;g.fillStyle='#4d535c';g.beginPath();g.moveTo(0,top);g.lineTo(.3*U,top-.9*U);g.lineTo(W-.3*U,top-.9*U);g.lineTo(W,top);g.fill();for(let x=.8*U;x<W-.8*U;x+=1.3*U){g.fillStyle=st;g.fillRect(x,top-.7*U,.5*U,.65*U);g.fillStyle='#3e434b';g.beginPath();g.moveTo(x-.06*U,top-.7*U);g.lineTo(x+.25*U,top-.98*U);g.lineTo(x+.56*U,top-.7*U);g.fill();win(g,x+.12*U,top-.6*U,.26*U,.4*U,R,{frame:'#ddd5c2'})}ashlar(g,0,top,W,H-top,st,R);g.fillStyle='#ddd5c2';g.fillRect(0,top,W,4);for(const y of[top+.3*U,top+1.45*U])for(let x=.35*U;x<W-.4*U;x+=.75*U)win(g,x,y,.38*U,.8*U,R,{frame:'#ddd5c2',cross:true})},s+20)})}
 for(let s=0;s<3;s++){const b=['#8f3d2c','#9b4632','#7e3427'][s];FILL[0].push({len:5.5,h:3.6,th:3.8,roof:'#5b524a',tex:mk(5.5,3.8,(g,W,H,R)=>{const top=H-3.6*U;brick(g,0,top,W,H-top,b,R);g.fillStyle='#f1ece2';g.fillRect(0,top,W,.16*U);for(let f=0;f<4;f++)for(let x=.3*U;x<W-.4*U;x+=.7*U)win(g,x,top+.4*U+f*.8*U,.34*U,.55*U,R,{frame:'#f1ece2',cross:true});g.fillStyle='#f1ece2';g.fillRect(2.35*U,H-.95*U,.8*U,.95*U);g.fillStyle='#3b2618';g.fillRect(2.5*U,H-.8*U,.5*U,.8*U)},s+30)})}
 const names=['PIZZA','RAMEN','BUBBLE TEA','BURGERS','TACOS','BAGELS','COFFEE','BOOKS','SUSHI','WINGS','CREPES','THAI'],aw=['#b8282a','#1f5fa8','#2c8a4b','#e3a400','#6a3d9a','#111'],up=['#8f3d2c','#c7b299','#5d6f7d','#a35a3a','#7c2f2f','#e2d6c0'];
 for(let s=0;s<6;s++){const h=2.4+(s%3)*.45,a=aw[s],nm1=names[s*2],nm2=names[s*2+1];FILL[1].push({len:4.4,h,th:h+.1,roof:'#4a4a4a',tex:mk(4.4,h+.1,(g,W,H,R)=>{const top=H-h*U;const half=W/2;if(s%2)brick(g,0,top,W,H-top,up[s],R);else{g.fillStyle=up[s];g.fillRect(0,top,W,H-top)}g.fillStyle='#2b2b2b';g.fillRect(0,top,W,.14*U);for(let x=.3*U;x<W-.3*U;x+=.62*U)for(let y=top+.3*U;y<H-1.4*U;y+=.75*U)win(g,x,y,.34*U,.5*U,R,{frame:'#eee',cross:true});for(const[i,nm]of[[0,nm1],[1,nm2]]){const x=i*half;g.fillStyle='#1e2a33';g.fillRect(x+.12*U,H-.95*U,half-.24*U,.95*U);g.fillStyle='rgba(255,220,150,.45)';g.fillRect(x+.2*U,H-.85*U,half-.4*U,.6*U);for(let k=0;k<8;k++){g.fillStyle=k%2?'#fff':(i?aw[(s+2)%6]:a);g.fillRect(x+.08*U+k*(half-.16*U)/8,H-1.2*U,(half-.16*U)/8,.25*U)}g.fillStyle='#151515';g.fillRect(x+.15*U,H-1.52*U,half-.3*U,.3*U);txt(g,nm,x+half/2,H-1.37*U,.17*U,'#FFBB00')}},s+40)})}
 for(let s=0;s<2;s++)FILL[1].push({len:5,h:4.8,th:5,roof:'#444',tex:mk(5,5,(g,W,H,R)=>{const top=H-4.8*U;g.fillStyle=s?'#cfcac0':'#b9b3a7';g.fillRect(0,top,W,H-top);for(let f=0;f<6;f++)for(let x=.25*U;x<W-.3*U;x+=.55*U)win(g,x,top+.35*U+f*.72*U,.4*U,.5*U,R,{frame:'#9e988c',mull:false});g.fillStyle='#1e2a33';g.fillRect(.3*U,H-.65*U,W-.6*U,.65*U)},s+50)});
 for(let s=0;s<2;s++)FILL[2].push({len:6,h:.9,th:1.5,roof:'#2f6b33',tex:mk(6,1.5,(g,W,H,R)=>{g.fillStyle='#2f6b33';g.fillRect(0,H-.55*U,W,.55*U);for(let i=0;i<40;i++){g.fillStyle='#3d8540';g.beginPath();g.arc(R()*W,H-.45*U+R()*.2*U,5+R()*5,0,7);g.fill()}g.fillStyle='#111';g.fillRect(0,H-1.4*U,W,4);for(let x=0;x<W;x+=.12*U)g.fillRect(x,H-1.4*U,2,.9*U);for(let x=.4*U;x<W-1*U;x+=1.9*U){g.fillStyle=s?'#111':'#FFBB00';g.fillRect(x,H-1.3*U,1.2*U,.45*U);txt(g,s?'GO TU':'TIGERS',x+.6*U,H-1.07*U,.2*U,s?'#FFBB00':'#111')}},s+60)});
 for(let s=0;s<2;s++)FILL[2].push({len:6,h:1.6,th:1.7,roof:'#999',tex:mk(6,1.7,(g,W,H,R)=>{for(let r=0;r<7;r++){g.fillStyle=r%2?'#c9ced3':'#9aa1a8';g.fillRect(0,H-1.6*U+r*.2*U,W,.2*U)}g.fillStyle='#FFBB00';g.fillRect(0,H-1.6*U,W,5);g.fillStyle='#555';for(let x=.2*U;x<W;x+=1*U)g.fillRect(x,H-1.6*U,5,1.6*U)},s+70)});
}
