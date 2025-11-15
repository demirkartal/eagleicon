/*!
 * EagleICON v0.0.4
 * Copyright 2022-2025 Cem Demirkartal
 * Licensed under the MIT License
 */
export default class EagleIcon {
  constructor(spriteUrl, prefix = 'eagleicon') {
    this.spriteUrl = spriteUrl;
    this.prefix = prefix;
  }

  svgElement(id) {
    const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElem.classList.add(this.prefix);
    const useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElem.setAttribute('href', `${this.spriteUrl}#${id}`);
    svgElem.append(useElem);
    return svgElem;
  }
}
// # sourceMappingURL=eagleicon.mjs.map
