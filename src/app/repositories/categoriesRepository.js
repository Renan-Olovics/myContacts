import * as db from '../../database'

class CategoriesRepository {
  async findAll () {
    const rows = await db.Query('SELECT * FROM categories ORDER BY name')
    return rows
  }

  async findById (id) {
    const rows = await db.Query('SELECT * FROM categories WHERE id = $1', [id])
    return rows[0]
  }

  async delete (id) {
    const deleteOp = await db.Query(`
    DELETE FROM categories
    where id = $1
    RETURNING *
    `, [id])
    return deleteOp
  }

  async create ({ name }) {
    const row = await db.Query(`
    INSERT INTO categories(name)
    values($1)
    RETURNING *
    `, [name])
    return row[0]
  }

  async update (id, { name }) {
    const row = await db.Query(`
    UPDATE categories
    SET name = $1
    WHERE id = $2
    RETURNING *
    `, [name, id])
    return row[0]
  }
}

const categoriesRepository = new CategoriesRepository()

export { categoriesRepository }
