const triggers = [...document.querySelectorAll('[data-tab-target]')];
const panels = [...document.querySelectorAll('.tab-panel')];
const tabs = [...document.querySelectorAll('[role="tab"]')];

function showTab(id) {
  panels.forEach(panel => {
    const selected = panel.id === id;
    panel.hidden = !selected;
    panel.classList.toggle('active', selected);
  });
  tabs.forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.tabTarget === id)));
  history.replaceState(null, '', `#${id}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

triggers.forEach(trigger => trigger.addEventListener('click', () => showTab(trigger.dataset.tabTarget)));
tabs.forEach((tab, index) => tab.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].focus(); showTab(tabs[next].dataset.tabTarget);
}));

const initial = location.hash.slice(1);
if (panels.some(panel => panel.id === initial)) showTab(initial);
