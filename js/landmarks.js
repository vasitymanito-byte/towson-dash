// landmarks.js: Real Towson landmarks: names, facts, and where they appear along the route.
const LMS={
 stephens:{name:'Stephens Hall',fact:'Built 1914–15 in Jacobean Revival style. Its clock tower holds a 1,200-lb bell.',parts:[{t:'stephens',len:11,h:3.4,th:4.6,roof:'#4a4f57',extra:'tower'}]},
 science:{name:'Science Complex',fact:'Opened 2021. TU’s largest academic building, with a rooftop greenhouse and planetarium.',parts:[{t:'science',len:13,h:4.2,th:4.9,roof:'#5a6b55'}]},
 cook:{name:'Albert S. Cook Library',fact:'Five floors, opened in 1969. The main entrance is on floor 3.',parts:[{t:'cook',len:9,h:4.2,th:4.4,roof:'#7a6f60'}]},
 glen:{name:'Glen Towers',fact:'Four high-rise dorms from 1983, all back open after renovations in 2025.',parts:['A','B','C','D'].map((L,i)=>({t:'glen'+L,off:i*3.8,len:2.6,h:11,th:11.4,roof:'#3a3d44'}))},
 towncenter:{name:'Towson Town Center',fact:'The mall at York Rd and Dulaney Valley Rd, open since 1959.',parts:[{t:'towncenter',len:14,h:3.2,th:3.7,roof:'#8c8478'}]},
 courthouse:{name:'Historic Courthouse',fact:'Greek Revival, built of local limestone and marble, completed in 1855.',parts:[{t:'courthouse',len:9,h:2.8,th:4.2,roof:'#7d8a86'}]},
 armory:{name:'StarTUp at the Armory',fact:'A 1933 National Guard armory, now TU’s hub for entrepreneurs.',parts:[{t:'armory',len:6,h:2.6,th:3.5,roof:'#9a958a'}]},
 wash:{name:'401 Washington Ave',fact:'TU’s 12-story office building in uptown Towson.',parts:[{t:'wash',len:4.4,h:9.2,th:9.4,roof:'#555'}]},
 secu:{name:'SECU Arena',fact:'Home court for Towson Tigers basketball.',parts:[{t:'secu',len:11,h:3.6,th:4.3,roof:'#2f3136'}]},
 unitas:{name:'Johnny Unitas Stadium',fact:'Home of Towson Tigers football.',parts:[{t:'unitas',len:14,h:3,th:4.1,roof:'#555',extra:'lights'}]},
 round:{name:'Towson Roundabout',fact:'Where York Rd meets Dulaney Valley Rd, Joppa Rd and Allegheny Ave. Opened 1998.'}
};
for(const k in LMS){const L=LMS[k];L.key=k;if(L.parts){L.parts.forEach(p=>p.off=p.off||0);L.total=Math.max(...L.parts.map(p=>p.off+p.len))}}
const SCHED=[{k:'stephens',at:26,side:1},{k:'science',at:42,side:-1},{k:'cook',at:110,side:-1},{k:'glen',at:150,side:1},{k:'towncenter',at:316,side:-1},{k:'courthouse',at:380,side:1},{k:'armory',at:420,side:-1},{k:'wash',at:432,side:1},{k:'secu',at:600,side:-1},{k:'unitas',at:660,side:1}];
const ISLAND_AT=300;
