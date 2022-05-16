import { v4 } from 'uuid'

import * as db from '../../database'

// eslint-disable-next-line prefer-const
let contacts = [
  {
    id: v4(),
    name: 'John Doe',
    email: 'johnDoe@doe.com',
    phone: '123123123',
    category_id: v4()
  },
  {
    id: v4(),
    name: 'Donald Trump',
    email: 'donaldTrump@trump.com',
    phone: '123123445123',
    category_id: v4()
  }
]

class ContactRepository {
  async findAll (orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.Query(`SELECT * FROM contacts ORDER BY name ${direction}`)
    return rows
  }

  async findById (id) {
    const rows = await db.Query('SELECT * FROM contacts WHERE id = $1', [id])
    return rows[0]
  }

  async delete (id) {
    return new Promise((resolve) => {
      contacts = contacts.filter(contact => contact.id !== id)
      resolve()
    })
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
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id
      }
      contacts = contacts.map(contact => (contact.id === id ? updatedContact : contact))

      resolve(updatedContact)
    })
  }
}

const contactRepository = new ContactRepository()

export { contactRepository }
