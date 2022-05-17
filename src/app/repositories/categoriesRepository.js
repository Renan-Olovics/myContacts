import * as db from '../../database'

class CategoriesRepository {
  async findAll () {
    const rows = await db.Query('SELECT * FROM categories ORDER BY name')
    return rows
  }

  async delete (id) {
    // TODO
  }

  async create ({ name }) {
    const row = await db.Query(`
    INSERT INTO categories(name)
    values($1)
    RETURNING *
    `, [name])
    return row[0]
  }

  async update (id) {
    // TODO
  }
}

const categoriesRepository = new CategoriesRepository()

export { categoriesRepository }
