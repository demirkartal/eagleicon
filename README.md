# EagleICON

[![NPM](https://badgen.net/npm/v/@demirkartal/eagleicon)](https://www.npmjs.com/package/@demirkartal/eagleicon)
[![License](https://badgen.net/npm/license/@demirkartal/eagleicon)](https://opensource.org/licenses/MIT)
[![Types](https://badgen.net/npm/types/@demirkartal/eagleicon)](https://www.typescriptlang.org/)
[![Bundle Size](https://badgen.net/bundlephobia/min/@demirkartal/eagleicon)](https://bundlephobia.com/package/@demirkartal/eagleicon)
[![Clean Code](https://img.shields.io/badge/code-zero--bloat-10b981)](https://github.com/demirkartal/eagleicon)

**EagleICON** is a high-performance, minimalist SVG icon management engine. Engineered for developers who prioritize speed, accessibility, and zero-dependency architectures.

By leveraging SVG sprites and `<use>` references, EagleICON ensures your UI stays fluid with a near-zero memory footprint, even with hundreds of icons.

## ✨ Features

- **🚀 Performance First:** Zero dependencies. Under 2KB gzipped runtime.
- **🎨 CSS-Driven:** Control `stroke-width`, `linecap`, `linejoin`, and `color` directly via CSS variables or JS attributes.
- **🧩 Enterprise Ready:** Full TypeScript support with strict type definitions for safer development.
- **♿ Inclusive:** Automatic `aria-hidden` management and built-in accessibility `<title>` support.
- **💎 Monospace Design:** Perfectly balanced icons designed to scale seamlessly with your typography.

## 📦 Installation

```bash
npm install @demirkartal/eagleicon
```

## 🚀 Implementation

### 1. Stylesheet

Import the core CSS into your global styles or main entry file to handle vertical alignment:

```css
/* global.css or app.css */
@import "@demirkartal/eagleicon/dist/css/eagleicon.css";
```

### 2. JavaScript / TypeScript

```typescript
import EagleIcon from "@demirkartal/eagleicon";

const eagle = new EagleIcon(document, "/assets/eagleicon.svg");

// Simple Implementation
document.body.append(eagle.svgElement("search"));

// Enterprise Pattern (with full control)
const icon = eagle.svgElement(
  "arrow-up",
  ["btn-icon"],
  { "stroke-width": "2.5", fill: "currentColor" },
  "Scroll to top", // Screen reader title
);
```

### 🔐 Strict Type Safety (Optional)

To lock down icon ids and get **autocomplete/IntelliSense** support for available icons in your project, pass your icon set type to the method:

```typescript
type EagleIconIds =
  | "arrow-up"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "chevron-up"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "circle"
  | "circle-fill"
  | "square"
  | "square-fill"
  | "star"
  | "star-fill"
  | "phone"
  | "phone-fill"
  | "whatsapp"
  | "search"
  | "menu"
  | "close"
  | "plus"
  | "minus"
  | "globe"
  | "sort"
  | "sort-up"
  | "sort-down";

// TypeScript will now throw an error if you misspell an icon ID!
eagle.svgElement<EagleIconIds>("search");
```

## 🎨 Design Control

EagleICON uses CSS Custom Properties to bridge the gap between your stylesheets and the SVG Shadow DOM. It works perfectly with both stroke-based and fill-based (like WhatsApp) icons.

```css
.eagleicon {
  --svg-stroke-width: 1.75;
  --svg-fill: none; /* Auto-overridden by -fill icons */
  color: #4a5568;
  width: 16px;
  height: 16px;
}
```

## 📦 Available Icons

EagleICON comes with a curated set of essential UI icons:

- **Arrows:** `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`, `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`
- **UI Elements:** `search`, `menu`, `close`, `plus`, `minus`, `globe`, `sort`, `sort-up`, `sort-down`
- **Shapes & Ratings:** `circle`, `circle-fill`, `square`, `square-fill`, `star`, `star-fill`
- **Communication:** `phone`, `phone-fill`, `whatsapp`

## 🏗️ Why EagleICON?

| Feature           | Traditional SVGs | Icon Fonts |        EagleICON        |
| :---------------- | :--------------: | :--------: | :---------------------: |
| **HTTP Requests** |       High       |    Low     |   **Low (1 Sprite)**    |
| **DOM Weight**    |      Heavy       |   Light    |  **Light (Reference)**  |
| **Styling**       |     Limited      |    Easy    | **Infinite (CSS Vars)** |
| **Type Safety**   |        No        |     No     |         **Yes**         |
| **Accessibility** |      Manual      |    Poor    |      **Automatic**      |

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
