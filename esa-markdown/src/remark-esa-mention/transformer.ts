import toHtml from 'hast-util-to-html'
import h from 'hastscript'
import { Plugin } from 'unified'
import visit from 'unist-util-visit'
import { htmlNode, replaceNode, textNode, TextNode } from '../mdastUtils'
import { tokenize } from './tokenize'

export const transformer: Plugin<PluginSettings> = settings => {
  settings = settings ?? {}
  const { htmlify = defaultHtmlify, members = new DefaultMembers() } = settings
  const replace = replaceNode((node: TextNode) => {
    const tokens = [...tokenize(node.value)]
    return tokens.map(token => {
      if (token.type !== 'mention') {
        return textNode(node.value)
      }

      if (!members.has(token.username)) {
        return textNode(node.value)
      }

      return htmlNode(htmlify({ code: token.value, username: token.username }))
    })
  })
  return tree => visit(tree, 'text', replace)
}

type PluginSettings = [
  {
    htmlify?: Htmlify
    members?: Members
  }?,
]

export type Htmlify = ({
  code,
  username,
}: {
  readonly code: string
  readonly username: string
}) => string

const defaultHtmlify: Htmlify = ({ code, username }) =>
  toHtml(
    h(
      'a',
      {
        href: username === 'all' ? '/team#members' : `/members/${username}`,
        class: 'user-mention',
        title: username,
      },
      code,
    ),
  )

export interface Members {
  has(username: string): boolean
}

export class DefaultMembers implements Members {
  has(username: string): boolean {
    return username === 'all'
  }
}
