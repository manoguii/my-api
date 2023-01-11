import fs from "node:fs/promises"

const databasePath = new URL("../db.json", import.meta.url)
 // import.meta.url -> caminho do arquivo que a instancia URL e chamada

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [ data ]
    }

    this.#persist()

    return data
  }

  findUser(table, id) {
    return this.#database[table].find((user) => user.id === id)
  }
}

// const table = new Database()

// table.insert('users', {
//   id: 1,
//   name: 'gui',
//   age: 13
// })

// table.insert('users', {
//   id: 2,
//   name: 'ana',
//   age: 10
// })

// table.insert('users', {
//   id: 3,
//   name: 'ju',
//   age: 11
// })

// const search = table.select('users')

// const findUser = table.findUser('users', 1)

// console.log(findUser)