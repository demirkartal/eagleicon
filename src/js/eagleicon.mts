/*!
 * EagleICON v0.0.4
 * Copyright 2022-2025 Cem Demirkartal
 * Licensed under the MIT License
 */

/**
 * EagleIcon provides SVG icon rendering via sprite <use> references.
 */
export default class EagleIcon {
  /**
   * CSS class prefix for icons.
   */
  protected prefix: string;

  /**
   * URL of the SVG sprite file.
   */
  protected spriteUrl: string;

  /**
   * Constructor.
   *
   * @param spriteUrl - URL to the SVG sprite file.
   * @param prefix - CSS class prefix for icons.
   */
  public constructor(
    spriteUrl: string,
    prefix = 'eagleicon'
  ) {
    this.spriteUrl = spriteUrl;
    this.prefix = prefix;
  }

  /**
   * Create an SVG element referencing an icon in the sprite.
   *
   * @param id - Icon id (symbol id in the sprite).
   * @returns SVGElement with a <use> referencing the sprite symbol.
   */
  public svgElement(id: string): SVGElement {
    const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElem.classList.add(this.prefix);

    const useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElem.setAttribute('href', `${this.spriteUrl}#${id}`);
    svgElem.append(useElem);

    return svgElem;
  }
}
