class ContactController {
  index (req, res) {
    res.send('Send from Contact Controller')
    // Listar todos os registros
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
