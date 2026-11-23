// main.js: UI screens, game start/over, leaderboard hookup, and boot.

let ready = false;
let lastRun = null;

function renderActs(el, onlyFound) {
  el.innerHTML = ACTS.map((a, i) => onlyFound && !found.has(i) ? '' :
    '<div class="act" style="border-left-color:' + CAT[a.c] + '"><h4>' + a.n +
    '<span class="chip" style="background:' + CAT[a.c] + '">' + a.c + '</span></h4><p>' + a.d + '</p></div>'
  ).join('') || '<p class="note">No stars this run. Grab a gold star to unlock a Towson activity.</p>';
}

async function refreshStartBoard() {
  renderBoard($('startBoard'), await Leaderboard.load());
}

function start() {
  reset();
  $('start').hidden = true;
  $('over').hidden = true;
  $('hud').hidden = false;
  running = true;
  $('toast').classList.remove('show');
}

async function gameOver() {
  running = false;
  const s = score();
  if (s > best) { best = s; try { localStorage.setItem('towsonDashBest', best); } catch (e) {} }
  lastRun = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), score: s, stars: found.size, date: new Date().toISOString().slice(0, 10) };

  $('fScore').textContent = s;
  $('fBest').textContent = best;
  $('fPass').textContent = found.size + '/' + ACTS.length;
  $('lmList').innerHTML = [...passed].map(n => '<span>' + n + '</span>').join('') || '<span>None yet. Keep running!</span>';
  renderActs($('passList'), true);
  $('toast').classList.remove('show');
  $('lm').classList.remove('show');

  const made = await qualifiesForBoard(s);
  $('nameForm').hidden = !made;
  renderBoard($('overBoard'), await Leaderboard.load());

  setTimeout(() => {
    $('over').hidden = false;
    if (made) {
      try { $('nameInput').value = localStorage.getItem('towsonDashName') || ''; } catch (e) {}
      $('nameInput').focus();
    } else {
      $('again').focus();
    }
  }, 350);
}

$('nameForm').addEventListener('submit', async e => {
  e.preventDefault();
  if (!lastRun) return;
  const name = cleanName($('nameInput').value);
  try { localStorage.setItem('towsonDashName', name); } catch (err) {}
  const list = await Leaderboard.submit({ ...lastRun, name });
  renderBoard($('overBoard'), list, lastRun.id);
  $('nameForm').hidden = true;
  lastRun = null;
  $('again').focus();
});

$('go').onclick = () => ready && start();
$('again').onclick = start;
$('browse').onclick = () => {
  const l = $('allList');
  l.hidden = !l.hidden;
  if (!l.hidden) renderActs(l, false);
  $('browse').textContent = l.hidden ? 'Browse activities' : 'Hide activities';
};
$('menu').onclick = () => { $('over').hidden = true; $('hud').hidden = true; $('start').hidden = false; refreshStartBoard(); };

// Boot: wait briefly for the fonts so facade lettering uses them, then build textures.
resize();
requestAnimationFrame(loop);
refreshStartBoard();
const fontWait = document.fonts && document.fonts.load
  ? Promise.all([document.fonts.load('20px Bungee'), document.fonts.load('800 20px Rubik')])
  : Promise.resolve();
Promise.race([fontWait, new Promise(r => setTimeout(r, 1800))]).catch(() => {}).then(() => {
  buildTextures();
  buildFillers();
  reset();
  ready = true;
  if (/autostart/.test(location.search)) start();
});
