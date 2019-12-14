import path from "path"

const indexModule = (process.env.MAIN ? path.resolve(process.env.MAIN) : path.join(__dirname, "..", "src")) |> require
const {default: fetchYoutubeUploads, fetchUploadsForUser} = indexModule

it("should run", async () => {
  const [channelResult, userResult] = await Promise.all([
    fetchYoutubeUploads("UCdC0An4ZPNr_YiFiYoVbwaw"), // Daily Dose of Internet
    fetchUploadsForUser("HerrNewstime"),
  ])
  expect(channelResult.length).toBeGreaterThan(5)
  expect(userResult.length).toBeGreaterThan(5)
  expect(channelResult[0].id.length).toBeGreaterThan(5)
  expect(channelResult[0].title.length).toBeGreaterThan(0)
})

it("should run without retries", async () => {
  const result = await fetchYoutubeUploads("UCdC0An4ZPNr_YiFiYoVbwaw", {retries: 0})
  expect(result.length).toBeGreaterThan(5)
  expect(result[0].id.length).toBeGreaterThan(5)
  expect(result[0].title.length).toBeGreaterThan(0)
})

// I do not want to be unnecessarily edgy here, but I need a dead person's channel to ensure that no new uploads break the test case
// I really loved your videos, Franc Tausch! ❤

it("should return correct titles", async () => {
  const result = await fetchUploadsForUser("FilmKritikTV")
  expect(result.length).toBeGreaterThan(5)
  expect(result[0]).toStrictEqual({
    id: "kOOV1rLj6dc",
    title: "Exklusiv: END OF WATCH Trailer german deutsch [HD]",
  })
  expect(result[1]).toStrictEqual({
    id: "5R1zxR5Lnww",
    title: "PARANORMAL ACTIVITY 4 Trailer german deutsch [HD]",
  })
})