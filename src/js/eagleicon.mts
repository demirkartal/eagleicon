/*!
 * EagleICON v0.0.4
 * Copyright 2022-2025 Cem Demirkartal
 * Licensed under the MIT License
 */

/**
 * EagleIcon provides SVG icon rendering via sprite <use> references.
 *
 * @example
 * const icon = new EagleIcon('/sprite.svg');
 * document.body.append(icon.svgElement('home'));
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
   * @throws TypeError - If spriteUrl is not a non-empty string.
   */
  public constructor(
    spriteUrl: string,
    prefix = 'eagleicon'
  ) {
    if (typeof spriteUrl !== 'string' || !spriteUrl.trim()) {
      throw new TypeError('EagleIcon: spriteUrl must be a non-empty string.');
    }
    this.spriteUrl = spriteUrl;
    this.prefix = prefix;
  }

  /**
   * Create an SVG element referencing an icon in the sprite.
   *
   * @param id - Icon id (symbol id in the sprite).
   * @param extraClasses - Additional CSS classes for the SVG element.
   * @param extraAttributes - Additional attributes for the SVG element.
   * @returns SVGElement with a <use> referencing the sprite symbol.
   * @throws TypeError - If id is not a non-empty string.
   */
  public svgElement(
    id: string,
    extraClasses: string[] = [],
    extraAttributes: Record<string, string> = {}
  ): SVGElement {
    if (typeof id !== 'string' || !id.trim()) {
      throw new TypeError('EagleIcon.svgElement: id must be a non-empty string.');
    }

    const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    // Add CSS classes
    svgElem.classList.add(this.prefix, ...extraClasses);

    // Add additional attributes
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
