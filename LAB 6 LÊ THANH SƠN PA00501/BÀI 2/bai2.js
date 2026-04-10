/* ── Confetti generator ──────────────────── */
(function spawnConfetti() {
  const wrap = document.getElementById('confetti');
  const colors = ['#f5c400','#ffe066','#ff4040','#ffffff','#ff9000','#c8ff00'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${5 + Math.random() * 8}px;
      height: ${10 + Math.random() * 14}px;
      border-radius: ${Math.random() > .5 ? '50%' : '2px'};
      animation-duration: ${3 + Math.random() * 6}s;
      animation-delay: ${Math.random() * 6}s;
      transform: rotate(${Math.random() * 360}deg);
    `;
    wrap.appendChild(el);
  }
})();

/* ── Countdown target ────────────────────── */
// Set target: 2 days, 20 hours, 15 minutes, 27 seconds from now
const TARGET = new Date(Date.now() + ((2 * 24 * 60 * 60) + (20 * 60 * 60) + (15 * 60) + 27) * 1000);

/* ── Helpers ─────────────────────────────── */
function pad(n) { return String(n).padStart(2, '0'); }

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  const totalSec = Math.floor(diff / 1000);
  return {
    days:    Math.floor(totalSec / 86400),
    hours:   Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60
  };
}

/* ── Flip animation helper ───────────────── */
const prev = { days: -1, hours: -1, minutes: -1, seconds: -1 };

function updateUnit(key, val) {
  const s = pad(val);
  if (prev[key] === s) return;
  prev[key] = s;

  const box  = document.getElementById(`box-${key}`);
  const top  = document.getElementById(`${key}-top`);
  const bot  = document.getElementById(`${key}-bot`);

  // pre-load new value on bottom (hidden behind flip)
  bot.textContent = s;

  // trigger flip
  box.classList.remove('flip');
  void box.offsetWidth; // reflow
  box.classList.add('flip');

  // after flip completes, update top and reset
  setTimeout(() => {
    top.textContent = s;
    box.classList.remove('flip');
  }, 600);
}

/* ── Tick ────────────────────────────────── */
function tick() {
  const t = getTimeLeft();
  updateUnit('days',    t.days);
  updateUnit('hours',   t.hours);
  updateUnit('minutes', t.minutes);
  updateUnit('seconds', t.seconds);
}

tick();
setInterval(tick, 1000);