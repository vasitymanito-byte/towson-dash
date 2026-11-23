// world.js: Game state, street generation, obstacle spawning and the per-frame update (physics + collisions).
/* ---------- state ---------- */
let best=0;try{best=+localStorage.getItem('towsonDashBest')||0}catch(e){}
let found=new Set(),passed=new Set();
let st,objs,scen,sides,used,running=false,last=0,toastT=0,t=0,zoneShown=-1,zoneT=0,lmKey='';
const WARP=+(new URLSearchParams(location.search).get('warp')||0);
function reset(){st={lane:0,x:0,y:0,vy:0,roll:0,speed:13,dist:WARP,coins:0,next:22,pat:0,nextIsland:ISLAND_AT+Math.ceil((WARP-ISLAND_AT)/LOOP)*LOOP};objs=[];scen=[];found=new Set();passed=new Set();used=new Set();sides={'-1':{cur:WARP-4},'1':{cur:WARP-4}};zoneShown=-1;lmKey='';fillSides()}
function nextLM(side,cur){let bestL=null;const k0=Math.floor(cur/LOOP);for(let k=k0-1;k<=k0+1;k++)for(const s of SCHED){if(s.side!==side)continue;const pos=s.at+k*LOOP,key=s.k+k;if(used.has(key)||pos<cur-4)continue;if(!bestL||pos<bestL.pos)bestL={pos,key,def:LMS[s.k]}}return bestL}
function fillSides(){for(const side of[-1,1]){const S=sides[side];let guard=0;while(S.cur<st.dist+FAR+6&&guard++<40){const lm=nextLM(side,S.cur);const zn=zoneAt(S.cur);const pool=FILL[zn],v=pool[(Math.random()*pool.length)|0];const gap=zn===1?.25+Math.random()*.4:zn===0?.6+Math.random()*2.4:1+Math.random()*3;
  if(lm&&lm.pos-S.cur<v.len+gap+1){const s0=Math.max(S.cur,lm.pos);for(const p of lm.def.parts)scen.push({side,z:s0+p.off-st.dist,wz:s0+p.off,len:p.len,h:p.h,th:p.th,roof:p.roof,tex:TEX[p.t],extra:p.extra,lm:lm.def});used.add(lm.key);S.cur=s0+lm.def.total+.6}
  else{scen.push({side,z:S.cur+gap-st.dist,wz:S.cur+gap,len:v.len,h:v.h,th:v.th,roof:v.roof,tex:v.tex});S.cur+=gap+v.len}}}}

function spawn(){
 const z=FAR,w=st.dist+z;st.pat++;
 const k=Math.round((w-ISLAND_AT)/LOOP);if(Math.abs(w-(ISLAND_AT+k*LOOP))<11){const ln=Math.random()<.5?-1:1;for(let i=0;i<5;i++)objs.push({type:'coin',lane:ln,z:z+i*1.4,h:.55});st.next=8;return}
 const lanes=[-1,0,1].sort(()=>Math.random()-.5),nB=st.dist<70?1:(Math.random()<.55?2:1),free=lanes[nB];
 for(let i=0;i<nB;i++){const r=Math.random(),type=r<.38?'low':r<.68?'high':'bus';objs.push({type,lane:lanes[i],z,len:type==='bus'?4.5:.35})}
 if(st.pat%4===0){const zn=zoneAt(w);let pool=ACTS.map((a,i)=>i).filter(i=>!found.has(i)&&ACTS[i].z===zn);if(!pool.length)pool=ACTS.map((a,i)=>i).filter(i=>!found.has(i));if(!pool.length)pool=ACTS.map((a,i)=>i);objs.push({type:'star',lane:free,z:z+2,h:.7,idx:pool[Math.random()*pool.length|0]})}
 else for(let i=0;i<5;i++)objs.push({type:'coin',lane:free,z:z+i*1.4,h:.55});
 st.next=9+Math.random()*6;
}


/* ---------- update ---------- */
function update(dt){
 st.speed=Math.min(30,13+st.dist/120);const dz=st.speed*dt;st.dist+=dz;
 st.x+=(st.lane-st.x)*Math.min(1,dt*14);st.vy-=32*dt;st.y=Math.max(0,st.y+st.vy*dt);if(st.y===0)st.vy=Math.max(0,st.vy);if(st.roll>0)st.roll-=dt;
 st.next-=dz;if(st.next<=0)spawn();
 if(st.nextIsland-st.dist<FAR){objs.push({type:'island',lane:0,z:st.nextIsland-st.dist,len:3.6});st.nextIsland+=LOOP}
 for(const b of scen)b.z=b.wz-st.dist;scen=scen.filter(b=>b.z+b.len>-4);fillSides();
 for(const o of objs){o.z-=dz;if(o.dead)continue;const same=Math.abs(o.lane-st.x)<.45;
  if(o.type==='coin'||o.type==='star'){if(same&&Math.abs(o.z)<.7&&st.y<o.h+1){o.dead=true;if(o.type==='coin')st.coins++;else{st.coins+=10;if(!found.has(o.idx)){found.add(o.idx);showToast(ACTS[o.idx])}}}continue}
  if(GOD||!same||o.z>.35||o.z+o.len<-.35)continue;if(o.type==='low'&&st.y>.55)continue;if(o.type==='high'&&st.roll>0)continue;return gameOver()}
 objs=objs.filter(o=>o.z+(o.len||0)>-4&&!o.dead);
 const zn=zoneAt(st.dist+6);if(zn!==zoneShown){zoneShown=zn;showZone(zn)}
 let cand=null;for(const b of scen)if(b.lm&&b.z<16&&b.z+b.len>-1&&(!cand||b.z<cand.z))cand=b;
 let lmDef=cand?cand.lm:null;for(const o of objs)if(o.type==='island'&&o.z<16&&o.z+o.len>-1)lmDef=LMS.round;
 const key=lmDef?lmDef.key:'';if(key!==lmKey){lmKey=key;if(lmDef){$('lmName').textContent=lmDef.name;$('lmFact').textContent=lmDef.fact;$('lm').classList.add('show');passed.add(lmDef.name)}else $('lm').classList.remove('show')}
 if(toastT>0){toastT-=dt;if(toastT<=0)$('toast').classList.remove('show')}
 if(zoneT>0){zoneT-=dt;if(zoneT<=0)$('zone').classList.remove('show')}
 $('score').textContent=score();$('coins').textContent=st.coins;$('pass').textContent=found.size+'/'+ACTS.length;
}
const score=()=>Math.floor(st.dist)+st.coins*10;
