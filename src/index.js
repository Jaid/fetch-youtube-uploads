/** @module fetch-youtube-uploads */

import execall from "execall"
import got from "got"
import {AllHtmlEntities} from "html-entities"
import pRetry from "p-retry"

const entityDecoder = new AllHtmlEntities

const fetchRegex = /href="\/watch\?v=(?<id>[\w-]+)" rel="nofollow">(?<title>[^<]+)<\/a><span class="accessible-description"/gu

export const gotClient = got.extend({
  urlPrefix: "https://youtube.com",
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
  },
})

/**
 * @class
 * @extends Error
 */
export class NoResultsError extends Error {

  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, NoResultsError)
  }

}

const fetchUploadsForPath = async (channelPath, options = {}) => {
  const retries = options.retries || 3
  const fetchJob = async () => {
    const {statusCode, url, body, statusMessage} = await gotClient(channelPath)
    if (statusCode !== 200) {
      throw new Error(`Requested ${url}, got ${statusCode} ${statusMessage}`)
    }
    const matches = execall(fetchRegex, body)
    return matches.map(match => ({
      id: match.subMatches[0],
      title: entityDecoder.decode(match.subMatches[1]),
    }))
  }
  if (retries <= 1) {
    return fetchJob()
  }

  const repeatedFetchJob = async () => {
    const result = await fetchJob()
    if (!result?.length) {
      throw new NoResultsError
    }
    return result
  }

  return pRetry(repeatedFetchJob, {retries})
}

/**
 * @typedef {Object} Video
 * @prop {string} id
 * @prop {string} title
 */

/**
 * @typedef {Object} Options
 * @prop {number} [retries = 3]
 */

const fetchUploadsForChannelId = (channelId, options) => fetchUploadsForPath(`channel/${channelId}/videos`, options)

/**
 * @function
 * @param {string} userId
 * @param {Options} options
 * @return {Promise<Video[]>}
 */
export const fetchUploadsForUser = (userName, options) => fetchUploadsForPath(`user/${userName}/videos`, options)

/**
 * @function
 * @param {string} channelId
 * @param {Options} options
 * @return {Promise<Video[]>}
 */
export default fetchUploadsForChannelId