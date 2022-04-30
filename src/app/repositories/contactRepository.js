import { v4 } from 'uuid'

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
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id
      }

      contacts.push(newContact)
      resolve(newContact)
    })
  }
}

const contactRepository = new ContactRepository()

export { contactRepository }
