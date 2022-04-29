import { uuid } from 'uuidv4'

const contacts = [
  {
    id: uuid(),
    name: 'John Doe',
    email: 'johnDoe@doe.com',
    phone: '123123123',
    category_id: uuid()
  }
]

class ContactRepository {
  findAll () {
    return Promise((resolve) => resolve(contacts))
  }
}

const contactRepository = new ContactRepository()

export { contactRepository }
