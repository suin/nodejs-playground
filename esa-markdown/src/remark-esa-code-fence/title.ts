import { CodeNode } from '../mdastUtils'

export const getTitle = ({
  node: { lang, meta },
  knownLanguagesMap,
}: {
  readonly node: Pick<CodeNode, 'lang' | 'meta'>
  readonly knownLanguagesMap: KnownLanguagesMap
}): Title => {
  const titleString = lang && meta ? `${lang} ${meta}` : lang ? lang : ''
  let title = parseTitle(titleString)
  const transforms = [
    extractLanguageFromFileExtension,
    normalizeLanguageByMap(knownLanguagesMap),
  ]
  for (const transform of transforms) {
    title = transform(title)
  }
  return title
}

type Title = {
  readonly language: string
  readonly filename: string
}

const parseTitle = (title: string): Title => {
  const result = title.match(/^(?<language>.+?):(?<filename>.+?)(?=:|$)/u)
  if (result === null) {
    return { filename: title, language: '' }
  }

  const { groups } = result
  if (typeof groups !== 'object') {
    return { filename: title, language: '' }
  }

  const { language, filename } = groups
  if (typeof language !== 'string' || typeof filename !== 'string') {
    return { filename: title, language: '' }
  }

  return { language, filename }
}

type TransformTitle = (title: Title) => Title

const extractLanguageFromFileExtension: TransformTitle = title => {
  if (title.language) {
    return title
  }

  const index = title.filename.lastIndexOf('.')
  if (index === -1) {
    return title
  }

  const ext = title.filename.substr(index + 1)
  if (!ext) {
    return title
  }

  return { ...title, language: ext }
}

const normalizeLanguageByMap = (
  knownLanguagesMap: KnownLanguagesMap,
): TransformTitle => title => {
  const { filename, language } = title

  if (language.length === 0) {
    const languageByFilename = knownLanguagesMap.get(filename)
    if (languageByFilename) {
      return { ...title, language: languageByFilename }
    }
    return { ...title, language: 'plain-text' }
  }

  const normalizedLanguage = knownLanguagesMap.get(language)
  if (normalizedLanguage) {
    return { ...title, language: normalizedLanguage }
  }

  return { ...title, language: 'plain-text' }
}

export type KnownLanguagesMap = ReadonlyMap<
  NormalizedLanguageCode,
  AliasLanguageCode
>
type NormalizedLanguageCode = string
type AliasLanguageCode = string
