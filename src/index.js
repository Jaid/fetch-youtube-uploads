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

async function fetch(urlPath) {
  const {statusCode, url, body, statusMessage} = await gotClient(urlPath)
  if (statusCode !== 200) {
    throw new Error(`Requested ${url}, got ${statusCode} ${statusMessage}`)
  }
  return body
}

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

/**
 * @function
 * @param {string} html
 * @return {Video[]}
 */
export function fetchUploadsFromHtml(html) {
  const matches = execall(fetchRegex, html)
  return matches.map(match => {
    const hasReminder = match.match.includes("reminder-set-text=")
    return {
      id: match.subMatches[0],
      title: normalizeTitle(match.subMatches[1]),
      published: !hasReminder,
    }
  })
}

const fetchUploadsForPath = async (channelPath, options = {}) => {
  const retries = options.retries || 3
  const fetchJob = async () => {
    let body
    if (options.html) {
      body = options.html
    } else {
      body = await fetch(channelPath)
    }
    return fetchUploadsFromHtml(body)
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