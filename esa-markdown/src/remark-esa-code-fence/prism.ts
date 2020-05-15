import prism from 'prismjs'
import { Highlighter } from './highlighter'
import { KnownLanguagesMap } from './title'

const loadLanguages = require('prismjs/components/')
loadLanguages()

type Languages = ReadonlyArray<{
  [key: string]: Language
}>

type Language = { readonly alias?: string | ReadonlyArray<string> }

const languages: Languages = require('prismjs/components').languages

const knownLanguagesMap = new Map<string, string>()

Object.entries<Language>(languages).forEach(([language, { alias }]) => {
  knownLanguagesMap.set(language, language)
  if (!alias) {
    return
  }
  if (typeof alias === 'string') {
    knownLanguagesMap.set(alias, language)
    return
  }
  for (const _alias of alias) {
    knownLanguagesMap.set(_alias, language)
  }
})

export class PrismHighlighter implements Highlighter {
  readonly highlighter = 'prism'

  highlight({
    language,
    code,
  }: {
    readonly language: string
    readonly code: string
  }): string {
    return prism.highlight(code, prism.languages[language], language)
  }

  readonly knownLanguagesMap: KnownLanguagesMap = knownLanguagesMap
}
