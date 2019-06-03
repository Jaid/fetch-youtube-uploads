import path from "path"

const indexModule = (process.env.MAIN ? path.resolve(process.env.MAIN) : path.join(__dirname, "..", "src")) |> require
const {default: fetchYoutubeUploads,
  sync: fetchYoutubeUploadsSync} = indexModule

it("should get normalized", () => {
  const result = fetchYoutubeUploadsSync({
    name: "test ",
    version: " 1.2.3",
  })
  expect(result).toMatchObject({
    pkg: {
      name: "test",
      version: "1.2.3",
    },
    path: false,
  })
})

it("should run async", async () => {
  const result = await fetchYoutubeUploads({
    name: "test",
  })
  expect(result).toMatchObject({
    pkg: {
      name: "test",
    },
    path: false,
  })
})

it("should find the package.json of this module", () => {
  const result = fetchYoutubeUploadsSync(path.resolve(__dirname, ".."))
  expect(result).toMatchObject({
    pkg: {
      author: {
        name: "Jaid",
        email: "jaid.jsx@gmail.com",
        url: "https://github.com/Jaid",
      },
    },
  })
})

it("should find a json5 package", () => {
  const result = fetchYoutubeUploadsSync(__dirname)
  expect(result).toMatchObject({
    path: expect.stringMatching(/package\.json5$/),
    pkg: {
      name: "is-json5",
    },
  })
})