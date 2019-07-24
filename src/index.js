/** @module fetch-youtube-uploads */

import execall from "execall"
import got from "got"

const fetchRegex = /href="\/watch\?v=(?<id>[\w-]+)" rel="nofollow">(?<title>[^<]+)<\/a><span class="accessible-description"/gu

export const gotClient = got.extend({
  baseUrl: "https://youtube.com",
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
  },
})

const fetchUploadsForPath = async channelPath => {
  const {statusCode, url, body, statusMessage} = await gotClient(channelPath)
  if (statusCode !== 200) {
    throw new Error(`Requested ${url}, got ${statusCode} ${statusMessage}`)
  }
  const matches = execall(fetchRegex, body)
  return matches.map(match => ({
    id: match.subMatches[0],
    title: match.subMatches[1],
  }))
}

const fetchUploadsForChannelId = channelId => fetchUploadsForPath(`channel/${channelId}/videos`)

export const fetchUploadsForUser = userName => fetchUploadsForPath(`user/${userName}/videos`)
export default fetchUploadsForChannelId