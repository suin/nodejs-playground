import { Literal, Node } from 'unist'
import visit from 'unist-util-visit'

export interface TextNode extends Literal {
  readonly type: 'text'
  readonly value: string
}

export const isTextNode = (node: Node): node is TextNode =>
  node.type === 'text' && typeof node.value === 'string'

export const textNode = (value: string): TextNode => ({ type: 'text', value })

export interface HtmlNode extends Literal {
  readonly type: 'html'
  readonly value: string
}

export const htmlNode = (value: string): HtmlNode => ({ type: 'html', value })

export interface CodeNode extends Literal {
  readonly type: 'code'
  readonly lang: string | null
  readonly meta: string | null
  readonly value: string
}

type NodeReplacer<T extends Node> = (node: T) => ReadonlyArray<Node>
export const replaceNode = <T extends Node>(
  replacer: NodeReplacer<T>,
): visit.Visitor<T> => (node, index, parent) => {
  if (!Array.isArray(parent.children)) {
    return
  }
  parent.children.splice(index, 1, ...replacer(node))
}
