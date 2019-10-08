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

it("should run with retries", async () => {
  const result = await fetchYoutubeUploads("UCdC0An4ZPNr_YiFiYoVbwaw", {
    retries: 3,
  })
  expect(result.length).toBeGreaterThan(5)
  expect(result[0].id.length).toBeGreaterThan(5)
  expect(result[0].title.length).toBeGreaterThan(0)
})