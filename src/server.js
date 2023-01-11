import http from "http";

const users = []

let id = 0

const server = http.createServer((req, res) => {
  const { url, method } = req

  if (method === "GET" && url === "/users") {
    return res
    .setHeader("Content-Type", "application/json")
    .end(JSON.stringify(users))
  }

  if (method === "POST" && url === "/users") {
    users.push({
      name: "Tom Cannon",
      email: "hidoz@op.nu",
      id: id++
    })

    return res.writeHead(201).end("Criado")
  }

  return res.writeHead(404).end("Heloo Wolrd")
})

server.listen(3333)