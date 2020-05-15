import { KnownLanguagesMap } from './title'

export interface Highlighter {
  highlight({
    language,
    code,
  }: {
    readonly language: string
    readonly code: string
  }): string

  readonly knownLanguagesMap: KnownLanguagesMap

  readonly highlighter: string
}
