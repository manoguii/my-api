import http from 'node:http'
import { Transform } from 'node:stream'

export class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

// req => ReadableStream
// res => WritableStream

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullContentStream = Buffer.concat(buffers).toString()

  console.log(fullContentStream)

  return res.end(fullContentStream)

  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res)
})

server.listen(3334)
