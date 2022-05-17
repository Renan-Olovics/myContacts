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

  async show (req, res) {
    const { id } = req.params
    const category = await categoriesRepository.findById(id)
    res.json(category)
  }

  update (req, res) {
    // TODO
    res.send('ok - update')
  }

  async delete (req, res) {
    const { id } = req.params
    await categoriesRepository.delete(id)
    res.sendStatus(204)
  }
}

const categoryController = new CategoryController()

export { categoryController }
