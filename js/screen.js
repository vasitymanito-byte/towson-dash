// screen.js: Sky/skyline backdrop and resize handling.
function makeSky(){SKY=document.createElement('canvas');SKY.width=W;SKY.height=Math.ceil(HOR+2);const g=SKY.getContext('2d');const gr=g.createLinearGradient(0,0,0,HOR);gr.addColorStop(0,'#24305e');gr.addColorStop(.5,'#c75b6e');gr.addColorStop(.85,'#ffb04a');gr.addColorStop(1,'#ffd27a');g.fillStyle=gr;g.fillRect(0,0,W,HOR+2);
 g.fillStyle='rgba(255,240,190,.95)';g.beginPath();g.arc(W*.5,HOR-H*.02,Math.min(W,H)*.08,0,7);g.fill();
 g.fillStyle='rgba(255,255,255,.18)';for(const[cx,cy,s]of[[.2,.12,1],[.72,.08,1.3],[.9,.2,.8]]){g.beginPath();g.ellipse(W*cx,HOR*cy+20,70*s,14*s,0,0,7);g.ellipse(W*cx+40*s,HOR*cy+12,40*s,12*s,0,0,7);g.fill()}
 const k=H/800,base=HOR+1;g.fillStyle='#5a3758';for(let i=0;i<40;i++){const x=i*W/40,h=(Math.sin(i*1.7)*.5+.7)*22*k;g.beginPath();g.arc(x,base-h*.3,h*.9,0,7);g.fill()}
 g.fillStyle='#4a2c4b';const gx=W*.66;for(let i=0;i<4;i++)g.fillRect(gx+i*22*k,base-(78-i%2*8)*k,16*k,(78-i%2*8)*k);g.fillRect(W*.2,base-62*k,26*k,62*k);
 const sx=W*.34;g.fillRect(sx-10*k,base-70*k,20*k,70*k);for(let i=0;i<3;i++)g.fillRect(sx-10*k+i*8*k,base-76*k,4*k,6*k);g.fillRect(sx-30*k,base-26*k,60*k,26*k);
 g.fillStyle='rgba(255,226,150,.5)';g.beginPath();g.arc(sx,base-52*k,4*k,0,7);g.fill();
}
function resize(){const r=Math.min(2,window.devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*r;cv.height=H*r;ctx.setTransform(r,0,0,r,0,0);HOR=H*.36;BASE=H*.93;LW=Math.min(W*.19,150);EYE=(BASE-HOR)/LW;makeSky()}
addEventListener('resize',resize);
