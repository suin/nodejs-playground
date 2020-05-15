import emojis from './emojiData.json'
import { Emojis, EmojiShortCode, EmojiUrl } from './transformer'

export const emojiMap = new Map<EmojiShortCode, typeof emojis[number]>()

for (const emoji of emojis) {
  emojiMap.set(emoji.code, emoji)
  for (const alias of emoji.aliases) {
    emojiMap.set(alias, emoji)
  }
}

export const defaultEmojis: Emojis = {
  get(shortCode: EmojiShortCode): EmojiUrl | undefined {
    return emojiMap.get(shortCode)?.url
  },
}
