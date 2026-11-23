// core.js: Shared constants, activity data, canvas setup and the 3D-to-screen projection.
const GOD=/god/.test(location.search);
const ACTS=[
 {n:"Albert S. Cook Library",c:"Campus",z:0,d:"Group study rooms, quiet floors, and the place to be during finals week."},
 {n:"The Glen Arboretum",c:"Outdoors",z:0,d:"A wooded ravine with trails and a stream right on campus. The best study-break walk."},
 {n:"Center for the Arts",c:"Arts",z:0,d:"TU theatre, dance and music productions, plus gallery exhibitions."},
 {n:"Towson Town Center",c:"Shopping",z:1,d:"The big indoor mall off Dulaney Valley Rd. Stores, food court and restaurants for a rainy-day hangout."},
 {n:"Towson Farmers Market",c:"Food",z:1,d:"Seasonal outdoor market downtown with local produce, baked goods and food stands."},
 {n:"Towsontown Spring Festival",c:"Events",z:1,d:"The yearly spring street festival downtown with live music, vendors and food."},
 {n:"Towson Square",c:"Hangout",z:1,d:"A movie theater and restaurants in one spot. Easy Friday-night plan."},
 {n:"York Road Eats",c:"Food",z:1,d:"Walk York Rd for pizza, ramen, burgers, bubble tea and late-night bites."},
 {n:"Historic Courthouse & Patriot Plaza",c:"History",z:1,d:"The 1855 Baltimore County Courthouse and its plaza, right in the heart of downtown."},
 {n:"Tigers Football",c:"Game day",z:2,d:"Catch a home game at Johnny Unitas Stadium and tailgate with the student section."},
 {n:"Hoops at SECU Arena",c:"Game day",z:2,d:"Towson basketball under one roof. The student section gets loud."},
 {n:"Hampton National Historic Site",c:"History",z:2,d:"An 18th-century Georgian mansion and gardens run by the National Park Service, minutes from campus."},
 {n:"Cromwell Valley Park",c:"Outdoors",z:2,d:"Rolling farm fields, easy trails and a nature center. Great for a weekend walk or run."},
 {n:"Loch Raven Reservoir",c:"Outdoors",z:2,d:"A short drive north: miles of hiking and biking trails, fishing and lake views."}
];
const CAT={"Shopping":"#ff8fb1","History":"#c9a27a","Outdoors":"#6fd08c","Game day":"#FFBB00","Food":"#ff9a52","Campus":"#7fb8ff","Arts":"#c89bff","Events":"#ffd84d","Hangout":"#5fe0d8"};
const ZONES=[{n:"Main Campus",s:"York Road · Stephens Hall · Glen Towers"},{n:"Uptown Towson",s:"The Roundabout · Courthouse · Armory"},{n:"Tiger Country",s:"SECU Arena · Johnny Unitas Stadium"}];
const LOOP=840;
const zoneAt=w=>Math.floor((((w%LOOP)+LOOP)%LOOP)/280);

const $=id=>document.getElementById(id);
const cv=$('c'),ctx=cv.getContext('2d');
let W=0,H=0,HOR=0,BASE=0,LW=0,EYE=3,SKY=null;
const F=5,FAR=72;
function P(lx,z,h=0){const s=F/(F+z),u=LW*s;return{x:W/2+lx*u*1.15,y:HOR+(BASE-HOR)*s-h*u,u}}
