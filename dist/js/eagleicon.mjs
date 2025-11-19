/*!
 * EagleICON v0.0.5
 * Copyright 2022-2025 Cem Demirkartal
 * Licensed under the MIT License
 */
export default class EagleIcon {
  constructor(spriteUrl, prefix = 'eagleicon') {
    if (typeof spriteUrl !== 'string' || !spriteUrl.trim()) {
      throw new TypeError('EagleIcon: spriteUrl must be a non-empty string.');
    }
    this.spriteUrl = spriteUrl;
    this.prefix = prefix;
  }

  svgElement(id, extraClasses = [], extraAttributes = {}) {
    if (typeof id !== 'string' || !id.trim()) {
      throw new TypeError('EagleIcon.svgElement: id must be a non-empty string.');
    }
    const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElem.classList.add(this.prefix, ...extraClasses);
    for (const key of Object.keys(extraAttributes)) {
      const value = extraAttributes[key];
      if (typeof value === 'string') {
        svgElem.setAttribute(key, value);
      }
    }
    const useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElem.setAttribute('href', `${this.spriteUrl}#${id}`);
    svgElem.append(useElem);
    return svgElem;
  }
}
// # sourceMappingURL=eagleicon.mjs.map
