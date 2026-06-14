/*!
 * EagleICON v0.0.7
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
   * Global counter for generating unique, collision-free element IDs.
   */
  private static idCounter = 0;

  /**
   * Standard SVG Namespace URI.
   */
  private static readonly SVG_NS = 'http://www.w3.org/2000/svg';

  /**
   * Document object for DOM operations.
   */
  private readonly doc: Document;

  /**
   * CSS class prefix for icons.
   */
  private readonly prefix: string;

  /**
   * URL of the SVG sprite file.
   */
  private readonly spriteUrl: string;

  /**
   * Constructor.
   *
   * @param doc - Document object for DOM operations.
   * @param spriteUrl - URL to the SVG sprite file.
   * @param prefix - CSS class prefix for icons.
   * @throws TypeError - Throws if `spriteUrl` is not a string or is an
   * empty/whitespace-only string.
   */
  public constructor(doc: Document, spriteUrl: string, prefix = 'eagleicon') {
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
   * @param title - Optional title for accessibility (renders a <title> tag).
   * @returns SVGElement with a <use> referencing the sprite symbol.
   * @throws TypeError - If id is not a non-empty string.
   */
  public svgElement(
    id: string,
    extraClasses: string[] = [],
    extraAttributes: Record<string, string> = {},
    title?: string,
  ): SVGElement {
    if (typeof id !== 'string' || !id.trim()) {
      throw new TypeError(
        'EagleIcon.svgElement: id must be a non-empty string.',
      );
    }

    // Create <svg> element
    const svgElem = this.doc.createElementNS(EagleIcon.SVG_NS, 'svg');
    svgElem.setAttribute('role', 'img');

    // Add unique CSS classes (ES2020 Set spreads efficiently)
    const classes = [...new Set([this.prefix, ...extraClasses])].filter(
      Boolean,
    );
    if (classes.length > 0) {
      svgElem.classList.add(...classes);
    }

    // Accessibility
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

    // Add Attributes
    for (const [key, value] of Object.entries(extraAttributes)) {
      svgElem.setAttribute(key, value);
    }

    // Create <use> element
    const useElem = this.doc.createElementNS(EagleIcon.SVG_NS, 'use');
    useElem.setAttribute('href', `${this.spriteUrl}#${id}`);
    svgElem.append(useElem);

    return svgElem;
  }
}
