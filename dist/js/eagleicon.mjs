/*!
 * EagleICON v0.0.7
 * Copyright 2022-2026 Cem Demirkartal
 * Licensed under the MIT License
 */
export default class EagleIcon {
  constructor(doc, spriteUrl, prefix = 'eagleicon') {
    if (!spriteUrl.trim()) {
      throw new TypeError('EagleIcon: spriteUrl must be a non-empty string.');
    }
    this.spriteUrl = spriteUrl;
    this.prefix = prefix;
    this.doc = doc;
  }

  svgElement(id, extraClasses = [], extraAttributes = {}, title) {
    if (!id.trim()) {
      throw new TypeError('EagleIcon.svgElement: id must be a non-empty string.');
    }
    const svgElem = this.doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElem.classList.add(this.prefix, ...extraClasses);
    if (title) {
      const titleElem = this.doc.createElementNS('http://www.w3.org/2000/svg', 'title');
      titleElem.textContent = title;
      svgElem.append(titleElem);
    }
    else {
      svgElem.setAttribute('aria-hidden', 'true');
    }
    for (const [key, value] of Object.entries(extraAttributes)) {
      svgElem.setAttribute(key, value);
    }
    const useElem = this.doc.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElem.setAttribute('href', `${this.spriteUrl}#${id}`);
    svgElem.append(useElem);
    return svgElem;
  }
}
// # sourceMappingURL=eagleicon.mjs.map
