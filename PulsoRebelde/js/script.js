/* ===== Nav móvil ===== */
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

/* ===== Glitch cycling ===== */
const layers = [document.getElementById('f1'), document.getElementById('f2')];
let i = 0;
const PERIOD = 3000;
const BURST_MS = 240;
const OVERLAP_MS = 120;
const root = document.documentElement;

const lerp = (a,b,t)=>a+(b-a)*t;
const rnd  = (min,max)=>min+Math.random()*(max-min);

function runBurst(ms=BURST_MS){
  let t0 = performance.now(), raf;
  let cur = {dx:0, dy:0, sk:0, sp:8};
  let target = {dx:0, dy:0, sk:0, sp:8};

  function retarget(){ target = { dx:rnd(-14,14), dy:rnd(-5,5), sk:rnd(-10,10), sp:rnd(6,20) }; }
  retarget();

  function tick(t){
    const elapsed = t - t0;
    if (Math.random() < 0.22) retarget();
    const k = 0.28;
    cur.dx = lerp(cur.dx, target.dx, k);
    cur.dy = lerp(cur.dy, target.dy, k);
    cur.sk = lerp(cur.sk, target.sk, k);
    cur.sp = lerp(cur.sp, target.sp, k);

    root.style.setProperty('--dx',  cur.dx.toFixed(2)+'px');
    root.style.setProperty('--dy',  cur.dy.toFixed(2)+'px');
    root.style.setProperty('--sk',  cur.sk.toFixed(2)+'deg');
    root.style.setProperty('--split', cur.sp.toFixed(2)+'px');

    if (elapsed < ms) raf = requestAnimationFrame(tick);
    else {
      root.style.setProperty('--dx','0px');
      root.style.setProperty('--dy','0px');
      root.style.setProperty('--sk','0deg');
      root.style.setProperty('--split','4px');
      cancelAnimationFrame(raf);
    }
  }
  requestAnimationFrame(tick);
}

setInterval(() => {
  const next = 1 - i;
  document.documentElement.classList.add('burst');

  layers[next].classList.add('show','in');
  layers[i].classList.add('out');

  runBurst(BURST_MS);

  setTimeout(() => {
    layers[i].classList.remove('show','out');
    layers[next].classList.remove('in');
    i = next;
  }, OVERLAP_MS);

  setTimeout(() => {
    document.documentElement.classList.remove('burst');
  }, BURST_MS);
}, PERIOD);
