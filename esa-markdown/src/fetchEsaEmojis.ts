// import https from 'https'
import axios from 'axios'

const fetchEmojiPalettes = async ({
  token,
  team,
}: {
  readonly token: string
  readonly team: string
}): Promise<any> => {
  const res = await axios.get(`https://api.esa.io/v1/teams/${team}/emojis`, {
    params: { include: `all` },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {},
  })
  return res.data.emojis
}

;(async () => {
  const emojis = await fetchEmojiPalettes({
    team: process.env.ESA_TEAM!,
    token: process.env.ESA_TOKEN!,
  })
  process.stdout.write(JSON.stringify(emojis))
})()
