import { contactRepository } from '../repositories'

class ContactController {
  async index (req, res) {
    const contacts = await contactRepository.findAll()
    res.json(contacts)
  }

  show () {
    // Obter UM registro
  }

  store () {
    // Criar um registro
  }

  update () {
    // Atualizar um registro
  }

  delete () {
    // Deletar um registro
  }
}

// Singleton - https://refactoring.guru/pt-br/design-patterns/singleton
const contactController = new ContactController()

export { contactController }
