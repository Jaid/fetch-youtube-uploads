import fss from "@absolunet/fss"
import path from "path"

const indexModule = (process.env.MAIN ? path.resolve(process.env.MAIN) : path.join(__dirname, "..", "src")) |> require
const {default: fetchYoutubeUploads, fetchUploadsForUser, fetchUploadsFromHtml} = indexModule

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

it("should recognize premieres", () => {
  const html = fss.readFile(path.join(__dirname, "welt.html"), "utf8")
  const result = fetchUploadsFromHtml(html)
  debugger
  expect(result[0]).toStrictEqual({
    id: "__fk25Ot4Eo",
    title: "LONDON: \"Die Darts-WM erinnert an ein Event aus der deutschen Kultur\"",
    published: true,
  })
  expect(result[1]).toStrictEqual({
    id: "zUCgJZY_bUg",
    title: "Aircraft Doctors - Highend-Flieger (Teil 7)",
    published: true,
  })
  expect(result[2]).toStrictEqual({
    id: "ciMlzbXr1v8",
    title: "Amerikas Traumschiff - Die Geschichte der SS United States | Doku",
    published: false,
  })
  expect(result[3]).toStrictEqual({
    id: "qWi6FqurYes",
    title: "KEINEN SITZPLATZ?: Greta Thunberg fährt auf dem ICE-Boden durch Deutschland",
    published: true,
  })
})