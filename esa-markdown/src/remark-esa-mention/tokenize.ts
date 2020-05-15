export function* tokenize(inputText: string): Generator<Token> {
  const username = `[\\w-]{2,30}` // esa user name is always
  // [A-za-z0-9_-]{2,30}.
  const mentionCode = `@${username}`
  const disallowBehind = `(?<![\\w:])` // this disallows `a@user`, `0@user`,
  // `_@user` and `:@user`.
  const disallowAhead = `(?!\\/|\\.\\w)` // this disallows `@user/`, `@user.0`,
  // `@user.a` and `@user._`. (but, just
  // `@user.` is OK)
  const mustAhead = `(?=\\W|$)` // this is necessary to match the user name
  // end-to-end. If this was missing, `@abcd`
  // would be captured as `@abc` (lost the last
  // character).
  const mentionGroup = `${disallowBehind}(?<mention>@(?<username>${username}))${disallowAhead}${mustAhead}`
  const textBeforeMention = `.+?(?=${disallowBehind}${mentionCode}${disallowAhead}${mustAhead})`
  const anyText = `.+`
  const textGroup = `(?<text>${textBeforeMention}|${anyText})`
  const regexp = new RegExp(`${mentionGroup}|${textGroup}`, `suy`)
  let match: RegExpExecArray | null
  while ((match = regexp.exec(inputText))) {
    if (typeof match.groups !== `object`) {
      continue
    }
    const { mention, username, text } = match.groups
    if (mention) {
      yield { type: 'mention', value: mention, username }
    } else if (text) {
      yield { type: 'text', value: text }
    }
  }
}

type Token = TextToken | MentionToken
type TextToken = {
  readonly type: 'text'
  readonly value: string
}
type MentionToken = {
  readonly type: 'mention'
  readonly value: string
  readonly username: string
}
