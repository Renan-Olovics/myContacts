import { contactRepository } from '../repositories'

class ContactController {
  async index (req, res) {
    const { orderBy } = req.query
    const contacts = await contactRepository.findAll(orderBy)
    res.json(contacts)
  }

  async show (req, res) {
    const { id } = req.params

    const contact = await contactRepository.findById(id)
    if (!contact) return res.status(404).json({ error: 'Contact not found' })

    res.json(contact)
  }

  async store (req, res) {
    const { name, email, phone, category_id } = req.body

    if (!name) return res.status(400).json({ error: 'Name is required' })

    const contactExists = await contactRepository.findByEmail(email)
    if (contactExists) return res.status(400).json({ error: 'This e-mail is already in use' })

    const contact = await contactRepository.create({ name, email, phone, category_id })

    return res.json(contact)
  }

  async update (req, res) {
    const { id } = req.params
    const { name, email, phone, category_id } = req.body

    const contactExists = await contactRepository.findById(id)
    if (!contactExists) return res.status(404).json({ error: 'Contact not found' })
    if (!name) return res.status(400).json({ error: 'Name is required' })

    const contactByEmail = await contactRepository.findByEmail(email)
    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: 'This e-mail is already in use' })
    }

    const contact = await contactRepository.update(id, { name, email, phone, category_id })

    res.json(contact)
  }

  async delete (req, res) {
    const { id } = req.params
    await contactRepository.delete(id)
    res.sendStatus(204)
  }
}

// Singleton - https://refactoring.guru/pt-br/design-patterns/singleton
const contactController = new ContactController()

export { contactController }
