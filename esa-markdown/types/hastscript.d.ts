import { Node } from 'unist'
import { Element } from 'hast'

declare module 'hastscript' {
  /**
   * DSL to create virtual hast trees for HTML or SVG.
   *
   * @param selector Simple CSS selector (`string`, optional). Can contain a
   *   tag name (`foo`), IDs (`#bar`), and classes (`.baz`). If there is no tag
   *   name in the selector, `h` defaults to a `div` element, and `s` to a `g`
   *   element.`selector` is parsed by
   *   [`hast-util-parse-selector`][parse-selector].
   * @param properties Map of properties (`Object.<*>`, optional).
   * @param children (Lists of) child nodes (`string`, `Node`,
   *   `Array.<string|Node>`, optional). When strings are encountered, they are
   *   mapped to [`text`][text] nodes.
   */
  declare function h(
    selector?: string = 'div',
    properties?: object,
    ...children: Array<string | Node>
  ): Element

  /**
   * DSL to create virtual hast trees for HTML or SVG.
   *
   * @param selector Simple CSS selector (`string`, optional). Can contain a
   *   tag name (`foo`), IDs (`#bar`), and classes (`.baz`). If there is no tag
   *   name in the selector, `h` defaults to a `div` element, and `s` to a `g`
   *   element.`selector` is parsed by
   *   [`hast-util-parse-selector`][parse-selector].
   * @param properties Map of properties (`Object.<*>`, optional).
   * @param children (Lists of) child nodes (`string`, `Node`,
   *   `Array.<string|Node>`, optional). When strings are encountered, they are
   *   mapped to [`text`][text] nodes.
   */
  declare function h(
    selector?: string = 'div',
    properties?: object,
    children?: Array<string | Node>,
  ): Element

  export default h
}
