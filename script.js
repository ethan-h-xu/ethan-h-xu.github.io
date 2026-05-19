const langMap = {
  about:        'Markdown',
  experience:   'JavaScript',
  education:    'Python',
  skills:       'JSON',
  competitions: 'Markdown',
};

function buildLineNums(numsEl, codeViewEl) {
  if (!numsEl || !codeViewEl) return;
  const activePaneOrView = codeViewEl.querySelector('.tab-pane.active') || codeViewEl;
  const pre = activePaneOrView.querySelector('pre') || activePaneOrView;
  const text = pre.textContent || '';
  const count = Math.max(text.split('\n').length, 20);
  let html = '';
  for (let i = 1; i <= count; i++) html += i + '<br>';
  numsEl.innerHTML = html;
}

function activateTab(tabEl) {
  const tabBar = tabEl.closest('.tab-bar');
  const panel  = tabEl.closest('.panel');
  const key    = tabEl.dataset.tab;

  tabBar.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tabEl.classList.add('active');

  panel.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  const pane = panel.querySelector('#pane-' + key);
  if (pane) pane.classList.add('active');

  const langEl = document.getElementById('sb-lang');
  if (langEl && langMap[key]) langEl.textContent = langMap[key];

  setTimeout(() => {
    const numsEl   = panel.querySelector('.line-nums');
    const codeView = panel.querySelector('.code-view');
    if (numsEl && codeView) buildLineNums(numsEl, codeView);
  }, 0);
}

document.querySelectorAll('#main-tabs .tab[data-tab]').forEach(tab => {
  tab.addEventListener('click', () => activateTab(tab));
});

window.addEventListener('load', () => {
  document.querySelectorAll('.panel').forEach(panel => {
    const numsEl   = panel.querySelector('.line-nums');
    const codeView = panel.querySelector('.code-view');
    if (numsEl && codeView) buildLineNums(numsEl, codeView);
  });
});
