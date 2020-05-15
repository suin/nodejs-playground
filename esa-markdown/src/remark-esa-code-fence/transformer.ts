import toHtml from 'hast-util-to-html'
import h from 'hastscript'
import { Plugin } from 'unified'
import u from 'unist-builder'
import visit from 'unist-util-visit'
import { CodeNode, htmlNode, replaceNode } from '../mdastUtils'
import { Highlighter } from './highlighter'
import { PrismHighlighter } from './prism'
import { getTitle } from './title'

export const transformer: Plugin<PluginSettings> = settings => {
  const { htmlify = defaultHtmlify, highlighter = new PrismHighlighter() } =
    settings ?? {}
  const knownLanguagesMap = highlighter.knownLanguagesMap
  return tree => {
    const replace = replaceNode<CodeNode>(node => {
      const { language, filename } = getTitle({ node, knownLanguagesMap })
      const { highlights, code } =
        language === 'plain-text'
          ? { highlights: false, code: node.value }
          : {
              highlights: true,
              code: highlighter.highlight({ code: node.value, language }),
            }
      return [
        htmlNode(
          htmlify({
            language,
            filename,
            code,
            highlights,
            highlighter: highlighter.highlighter,
            original: {
              lang: node?.lang ?? undefined,
              code: node.value,
              meta: node?.meta ?? undefined,
            },
          }),
        ),
      ]
    })
    return visit(tree, 'code', replace)
  }
}

type PluginSettings = [
  {
    htmlify?: Htmlify
    highlighter?: Highlighter
  }?,
]

export type Htmlify = (params: {
  readonly language: string
  readonly filename: string
  readonly code: string
  readonly highlights: boolean
  readonly highlighter: string
  readonly original: {
    readonly code: string
    readonly lang?: string
    readonly meta?: string
  }
}) => string

const defaultHtmlify: Htmlify = ({ language, filename, code, highlights }) => {
  const filenameDiv = filename
    ? [h('div', { class: 'code-filename' }, filename)]
    : []
  return toHtml(
    h('div', { class: 'code-block' }, [
      ...filenameDiv,
      h('div', { class: 'highlight' }, [
        h('pre', { class: `highlight ${language}` }, [
          h('code', { class: `language-${language}` }, [
            highlights ? u('raw', code) : code,
          ]),
        ]),
      ]),
    ]),
    { allowDangerousHtml: true },
  )
}
