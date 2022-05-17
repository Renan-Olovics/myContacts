import { contactsRepository } from '../repositories'

class ContactController {
  async index (req, res) {
    const { orderBy } = req.query
    const contacts = await contactsRepository.findAll(orderBy)
    res.json(contacts)
  }

  async show (req, res) {
    const { id } = req.params

    const contact = await contactsRepository.findById(id)
    if (!contact) return res.status(404).json({ error: 'Contact not found' })

    res.json(contact)
  }

  async store (req, res) {
    const { name, email, phone, category_id } = req.body

    if (!name) return res.status(400).json({ error: 'Name is required' })

    const contactExists = await contactsRepository.findByEmail(email)
    if (contactExists) return res.status(400).json({ error: 'This e-mail is already in use' })

    const contact = await contactsRepository.create({ name, email, phone, category_id })

    return res.json(contact)
  }

  async update (req, res) {
    const { id } = req.params
    const { name, email, phone, category_id } = req.body

    const contactExists = await contactsRepository.findById(id)
    if (!contactExists) return res.status(404).json({ error: 'Contact not found' })
    if (!name) return res.status(400).json({ error: 'Name is required' })

    const contactByEmail = await contactsRepository.findByEmail(email)
    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: 'This e-mail is already in use' })
    }

    const contact = await contactsRepository.update(id, { name, email, phone, category_id })

    res.json(contact)
  }

  async delete (req, res) {
    const { id } = req.params
    await contactsRepository.delete(id)
    res.sendStatus(204)
  }
}

// Singleton - https://refactoring.guru/pt-br/design-patterns/singleton
const contactController = new ContactController()

export { contactController }
