export function* tokenize(inputText: string): Generator<Token> {
  const shortcodePattern = `@?[\\w\\d_-]+`
  const emojiPattern = `(?<emoji>:(?<code>${shortcodePattern}):)`
  const textPattern = `(?<text>.+?(?=:${shortcodePattern}:)|.+)`
  const regexp = new RegExp(`${emojiPattern}|${textPattern}`, `suy`)
  let match: RegExpExecArray | null
  let count = 0
  while ((match = regexp.exec(inputText))) {
    if (typeof match.groups !== `object`) {
      continue
    }
    count++
    if (count > 10) {
      break
    }
    const { emoji, code, text } = match.groups
    if (emoji) {
      yield { type: 'emoji', value: emoji, code }
    } else if (text) {
      yield { type: 'text', value: text }
    } else {
      yield { type: 'text', value: match[0] }
    }
  }
}

type Token = EmojiToken | TextToken
type EmojiToken = {
  readonly type: 'emoji'
  readonly value: string
  readonly code: string
}
type TextToken = {
  readonly type: 'text'
  readonly value: string
}
