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
  findAll () {
    return new Promise((resolve) => resolve(contacts))
  }

  findById (id) {
    return new Promise((resolve) => {
      const contact = contacts.find(contact => contact.id === id)
      resolve(contact)
    })
  }

  async delete (id) {
    return new Promise((resolve) => {
      contacts = contacts.filter(contact => contact.id !== id)
      resolve()
    })
  }

  findByEmail (email) {
    return new Promise((resolve) => {
      const contact = contacts.find(contact => contact.email === email)
      resolve(contact)
    })
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
