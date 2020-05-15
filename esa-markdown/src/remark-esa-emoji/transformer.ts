import toHtml from 'hast-util-to-html'
import h from 'hastscript'
import { Plugin } from 'unified'
import visit from 'unist-util-visit'
import { htmlNode, replaceNode, TextNode, textNode } from '../mdastUtils'
import { defaultEmojis } from './emojis'
import { tokenize } from './tokenize'

export const transformer: Plugin<PluginSettings> = settings => {
  settings = settings ?? {}
  const { htmlify = defaultHtmlify, emojis = defaultEmojis } = settings
  const replace = replaceNode((node: TextNode) => {
    const tokens = [...tokenize(node.value)]
    return tokens.map(token => {
      if (token.type !== 'emoji') {
        return textNode(token.value)
      }

      const url = emojis.get(token.code)
      if (url === undefined) {
        return textNode(token.value)
      }

      return htmlNode(htmlify({ shortCode: token.code, url }))
    })
  })
  return tree => visit(tree, 'text', replace)
}

type PluginSettings = [
  {
    htmlify?: Htmlify
    emojis?: Emojis
  }?,
]

export type Htmlify = (params: {
  readonly shortCode: string
  readonly url: string
}) => string

export interface Emojis {
  get(shortCode: EmojiShortCode): EmojiUrl | undefined
}

export type EmojiShortCode = string
export type EmojiUrl = string

const defaultHtmlify: Htmlify = ({ shortCode, url }) =>
  toHtml(
    h('img', {
      class: 'emoji',
      title: shortCode,
      alt: shortCode,
      src: url,
    }),
  )
