// input.js: Keyboard and touch controls, plus HUD popups.
/* ---------- input ---------- */
function jump(){if(running&&st.y<=.01){st.vy=11.5;st.roll=0}}
function roll(){if(!running)return;st.roll=.65;if(st.y>0)st.vy=-22}
function move(d){if(running)st.lane=Math.max(-1,Math.min(1,st.lane+d))}
addEventListener('keydown',e=>{if(e.target&&e.target.tagName==='INPUT')return;const k=e.key;if(k==='ArrowLeft'||k==='a'||k==='A')move(-1);else if(k==='ArrowRight'||k==='d'||k==='D')move(1);else if(k==='ArrowUp'||k===' '||k==='w'||k==='W')jump();else if(k==='ArrowDown'||k==='s'||k==='S')roll();else if(k==='Enter'&&!running&&ready){start()}else return;e.preventDefault()});
let tx=0,ty=0;
cv.addEventListener('touchstart',e=>{const p=e.changedTouches[0];tx=p.clientX;ty=p.clientY},{passive:true});
cv.addEventListener('touchend',e=>{const p=e.changedTouches[0],dx=p.clientX-tx,dy=p.clientY-ty;if(Math.max(Math.abs(dx),Math.abs(dy))<25){jump();return}if(Math.abs(dx)>Math.abs(dy))move(dx>0?1:-1);else if(dy<0)jump();else roll()},{passive:true});

function showToast(a){$('tName').innerHTML=a.n+'<span class="chip" style="background:'+CAT[a.c]+'">'+a.c+'</span>';$('tDesc').textContent=a.d;$('toast').classList.add('show');toastT=3.6}
function showZone(i){$('zName').textContent=ZONES[i].n;$('zSub').textContent=ZONES[i].s;$('zone').classList.add('show');zoneT=2.4}
