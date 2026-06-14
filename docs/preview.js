import EagleIcon from '../dist/js/eagleicon.mjs';

try {
  const res = await fetch('../src/icons.json');
  if (!res.ok) throw new Error('Failed to fetch icons.json');
  const icons = await res.json();

  const eagleIcon = new EagleIcon(document, '../dist/svg/eagleicon.svg');
  const grid = document.getElementById('icon-grid');
  if (!grid) throw new Error('Grid element not found');

  // Store preview divs for later attribute updates
  const previewDivs = icons.map(icon => {
    const div = document.createElement('div');
    div.className = 'icon-item';

    const preview = document.createElement('div');
    preview.className = 'icon-preview';

    // aria-hidden is handled automatically by the class when title is omitted
    const svgElem = eagleIcon.svgElement(icon.id);
    if (svgElem) {
      svgElem.dataset.eagleType = icon.type;
      preview.append(svgElem);
    }

    const idDiv = document.createElement('div');
    idDiv.className = 'icon-id';
    idDiv.textContent = icon.id;

    div.append(preview, idDiv);
    grid.append(div);
    return preview;
  });

  const updateIconAttributes = () => {
    const getVal = (id) => document.getElementById(id)?.value ?? '';
    const fontsize = getVal('fontsize-meter');

    const attrMap = {
      'data-rotate': getVal('rotate-switch'),
      'data-flip': getVal('flip-switch'),
      'fill': getVal('fill-switch'),
      'stroke-linecap': getVal('linecap-switch'),
      'stroke-linejoin': getVal('linejoin-switch'),
      'stroke-width': getVal('stroke-switch'),
    };

    previewDivs.forEach(preview => {
      const svg = preview.querySelector('svg');
      if (!svg) return;

      Object.entries(attrMap).forEach(([attr, val]) => {
        val ? svg.setAttribute(attr, val) : svg.removeAttribute(attr);
      });
    });

    // Apply font-size globally to fix the demo section icons as well
    document.body.style.setProperty('--eagleicon-preview-size', fontsize ? `${fontsize}px` : '16px');
    grid.style.fontSize = fontsize ? `${fontsize}px` : '';

    const out = document.getElementById('fontsize-value');
    if (out) out.textContent = fontsize ? `${fontsize}px` : '';
  };

  // Wire controls efficiently based on event-target matching
  const controls = document.getElementById('icon-controls');
  if (controls) {
    controls.addEventListener('input', (e) => {
      if (e.target.matches('input[type="range"]')) updateIconAttributes();
    });
    controls.addEventListener('change', (e) => {
      if (e.target.matches('select')) updateIconAttributes();
    });
  }

  // Initial state
  updateIconAttributes();
}
catch (err) {
  console.error('Error loading icons:', err);
}
