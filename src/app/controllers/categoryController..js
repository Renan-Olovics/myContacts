import { categoriesRepository } from '../repositories'

class CategoryController {
  async index (req, res) {
    const categories = await categoriesRepository.findAll()
    res.json(categories)
  }

  async store (req, res) {
    const { name } = req.body

    if (!name) return res.status(400).json({ error: 'Name is required' })

    const category = await categoriesRepository.create({ name })
    res.json(category)
  }

  show (req, res) {
    // TODO
    res.send('ok - show')
  }

  update (req, res) {
    // TODO
    res.send('ok - update')
  }

  delete (req, res) {
    // TODO
    res.send('ok - delete')
  }
}

const categoryController = new CategoryController()

export { categoryController }
