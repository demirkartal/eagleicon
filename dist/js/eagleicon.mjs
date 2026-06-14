/*!
 * EagleICON v0.0.7
 * Copyright 2022-2026 Cem Demirkartal
 * Licensed under the MIT License
 */
class EagleIcon {
  constructor(doc, spriteUrl, prefix = 'eagleicon') {
    if (typeof spriteUrl !== 'string' || !spriteUrl.trim()) {
      throw new TypeError('EagleIcon: spriteUrl must be a non-empty string.');
    }
    this.spriteUrl = spriteUrl;
    this.prefix = prefix;
    this.doc = doc;
  }

  svgElement(id, extraClasses = [], extraAttributes = {}, title) {
    if (typeof id !== 'string' || !id.trim()) {
      throw new TypeError('EagleIcon.svgElement: id must be a non-empty string.');
    }
    const svgElem = this.doc.createElementNS(EagleIcon.SVG_NS, 'svg');
    svgElem.setAttribute('role', 'img');
    const classes = [...new Set([this.prefix, ...extraClasses])].filter(Boolean);
    if (classes.length > 0) {
      svgElem.classList.add(...classes);
    }
    if (title?.trim()) {
      EagleIcon.idCounter += 1;
      const titleId = `ei-title-${String(EagleIcon.idCounter)}`;
      const titleElem = this.doc.createElementNS(EagleIcon.SVG_NS, 'title');
      titleElem.id = titleId;
      titleElem.textContent = title;
      svgElem.setAttribute('aria-labelledby', titleId);
      svgElem.append(titleElem);
    }
    else {
      svgElem.setAttribute('aria-hidden', 'true');
    }
    for (const [key, value] of Object.entries(extraAttributes)) {
      svgElem.setAttribute(key, value);
    }
    const useElem = this.doc.createElementNS(EagleIcon.SVG_NS, 'use');
    useElem.setAttribute('href', `${this.spriteUrl}#${id}`);
    svgElem.append(useElem);
    return svgElem;
  }
}
EagleIcon.idCounter = 0;
EagleIcon.SVG_NS = 'http://www.w3.org/2000/svg';
export default EagleIcon;
// # sourceMappingURL=eagleicon.mjs.map
