// leaderboard.js: High-score storage behind a tiny async adapter.
//
// The game only ever calls Leaderboard.load() and Leaderboard.submit(entry).
// Both return Promises, so you can swap LocalBoard for a backend
// (Firebase, Supabase, your own API) without touching the rest of the game.
// See "Making the leaderboard global" in README.md.

const BOARD_KEY = 'towsonDashBoard_v1';
const BOARD_SIZE = 10;
const NAME_MAX = 12;

// Default adapter: saves the top 10 in this browser's localStorage.
const LocalBoard = {
  async load() {
    try {
      const list = JSON.parse(localStorage.getItem(BOARD_KEY) || '[]');
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  },
  async submit(entry) {
    const list = await this.load();
    list.push(entry);
    list.sort((a, b) => b.score - a.score);
    const top = list.slice(0, BOARD_SIZE);
    try { localStorage.setItem(BOARD_KEY, JSON.stringify(top)); } catch (e) { /* storage blocked */ }
    return top;
  }
};

// Swap this line to change where scores live.
const Leaderboard = LocalBoard;

async function qualifiesForBoard(score) {
  if (score <= 0) return false;
  const list = await Leaderboard.load();
  return list.length < BOARD_SIZE || score > list[list.length - 1].score;
}

function cleanName(raw) {
  const name = String(raw || '').replace(/[^\w .'-]/g, '').trim().slice(0, NAME_MAX).toUpperCase();
  return name || 'TIGER';
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function renderBoard(el, list, highlightId) {
  if (!list.length) {
    el.innerHTML = '<p class="note">No runs yet. Be the first Tiger on the board.</p>';
    return;
  }
  el.innerHTML = '<ol class="board">' + list.map((e, i) =>
    `<li class="${e.id === highlightId ? 'me' : ''}">` +
      `<span class="rk">${i + 1}</span>` +
      `<span class="nm">${escapeHtml(e.name)}</span>` +
      `<span class="st">${e.stars}★</span>` +
      `<span class="sc">${e.score.toLocaleString()}</span>` +
    '</li>'
  ).join('') + '</ol>';
}
