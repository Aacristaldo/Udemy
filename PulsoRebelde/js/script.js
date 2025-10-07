const layers = [document.getElementById('f1'), document.getElementById('f2')];
let i = 0;
const PERIOD = 3000;      // ciclo total
const BURST_MS = 220;     // glitch fuerte total
const OVERLAP_MS = 120;   // tiempo con ambas visibles

setInterval(() => {
  const next = 1 - i;

  // enciende glitch y muestra primero la nueva
  document.documentElement.classList.add('burst');
  layers[next].classList.add('show', 'in');

  // deja la anterior unos ms mientras sigue el glitch
  layers[i].classList.add('out');

  // corta la anterior durante el glitch aún activo
  setTimeout(() => {
    layers[i].classList.remove('show', 'out');
    layers[next].classList.remove('in');
    i = next;
  }, OVERLAP_MS);

  // apaga glitch después
  setTimeout(() => {
    document.documentElement.classList.remove('burst');
  }, BURST_MS);
}, PERIOD);
