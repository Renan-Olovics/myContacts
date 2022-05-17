import * as db from '../../database'

class ContactsRepository {
  async findAll (orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.Query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}
    `)
    return rows
  }

  async findById (id) {
    const rows = await db.Query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1
    `, [id])
    return rows[0]
  }

  async delete (id) {
    const deleteOp = await db.Query('DELETE FROM contacts WHERE id = $1', [id])
    return deleteOp
  }

  async findByEmail (email) {
    const rows = await db.Query('SELECT * FROM contacts WHERE email = $1', [email])
    return rows[0]
  }

  async create ({ name, email, phone, category_id }) {
    const row = await db.Query(`
      INSERT INTO contacts(name, email, phone, category_id)
      values($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id])
    return row[0]
  }

  async update (id, { name, email, phone, category_id }) {
    const row = await db.Query(`
    UPDATE contacts
    SET name = $1,
    email = $2,
    phone = $3,
    category_id = $4
    WHERE id = $5
    RETURNING *
  `, [name, email, phone, category_id, id])
    return row[0]
  }
}

const contactsRepository = new ContactsRepository()

export { contactsRepository }
