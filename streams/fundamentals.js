import { Writable, Transform } from "node:stream"

class OneToHoundredStream extends Readable {
  index = 0
  
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i >= 10) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
  
        this.push(buf)
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transform = Number(chunk.toString()) * -1

    console.log(transform)

    callback(null, Buffer.from(String(transform)))
  }
}

class MultiplyByTeanStream extends Writable {
  array = []

  _write(chunk, encoding, callback) {
    this.array.push(Number(chunk.toString()) * 10)
    
    console.log(this.array)

    callback()
  }
}

new OneToHoundredStream()
  .pipe(new InverseNumberStream)
  .pipe(new MultiplyByTeanStream())
