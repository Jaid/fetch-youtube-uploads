/** @module fetch-youtube-uploads */

import execall from "execall"
import got from "got"
import {AllHtmlEntities} from "html-entities"
import pRetry from "p-retry"

import fetchRegex from "./fetchRegex"

const entityDecoder = new AllHtmlEntities

export const gotClient = got.extend({
  prefixUrl: "https://youtube.com",
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

function normalizeTitle(title) {
  const decoded = entityDecoder.decode(title)
  return decoded.replace("\n", " ").replace(/\s+/g, " ").trim()
}

        title: entityDecoder.decode(match.subMatches[1]),
        published: !hasReminder,
      }
    })
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
 * @prop {boolean} published If `false`, a reminder button was found which usually means that the video entry is a future premiere
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