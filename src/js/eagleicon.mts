/*!
 * EagleICON v0.0.6
 * Copyright 2022-2026 Cem Demirkartal
 * Licensed under the MIT License
 */

/**
 * EagleIcon provides SVG icon rendering via sprite <use> references.
 *
 * @example
 * const icon = new EagleIcon(document, '/sprite.svg');
 * document.body.append(icon.svgElement('home'));
 */
export default class EagleIcon {
  /**
   * Document object for DOM operations.
   */
  protected doc: Document;

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
   * @param doc - Document object for DOM operations.
   * @param spriteUrl - URL to the SVG sprite file.
   * @param prefix - CSS class prefix for icons.
   * @throws TypeError - Throws if `spriteUrl` is not a string or is an
   * empty/whitespace-only string.
   */
  public constructor(
    doc: Document,
    spriteUrl: string,
    prefix = 'eagleicon'
  ) {
    if (typeof spriteUrl !== 'string' || !spriteUrl.trim()) {
      throw new TypeError('EagleIcon: spriteUrl must be a non-empty string.');
    }
    this.spriteUrl = spriteUrl;
    this.prefix = prefix;
    this.doc = doc;
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
      throw new TypeError(
        'EagleIcon.svgElement: id must be a non-empty string.'
      );
    }

    // Create <svg> element
    const svgElem = this.doc.createElementNS('http://www.w3.org/2000/svg', 'svg');

    // Add CSS classes
    svgElem.classList.add(this.prefix, ...extraClasses);

    // Add Attributes
    for (const key of Object.keys(extraAttributes)) {
      const value = extraAttributes[key];
      if (typeof value === 'string') {
        svgElem.setAttribute(key, value);
      }
    }

    // Create <use> element
    const useElem = this.doc.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElem.setAttribute('href', `${this.spriteUrl}#${id}`);
    svgElem.append(useElem);

    return svgElem;
  }
}
