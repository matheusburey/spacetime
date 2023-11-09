import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export async function aploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (req, rep) => {
    const upload = await req.file({
      limits: { fileSize: 5_242_880 }, // 5mb
    })

    if (!upload) {
      return rep.status(400).send()
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFile = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFile) {
      return rep.status(400).send()
    }

    const fileId = randomUUID()
    const ext = extname(upload.filename)

    const filename = fileId.concat(ext)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', filename),
    )

    await pump(upload.file, writeStream)

    const fullUrl = req.protocol.concat('://').concat(req.hostname)
    const fileUrl = new URL(`/uploads/${filename}`, fullUrl).toString()

    return rep.status(201).send({ fileUrl })
  })
}
