import { Router } from 'express'

import { contactController, categoryController } from './app/controllers'

const router = Router()

router.get('/contacts', contactController.index)
router.get('/contacts/:id', contactController.show)
router.delete('/contacts/:id', contactController.delete)
router.post('/contacts', contactController.store)
router.put('/contacts/:id', contactController.update)

router.get('/categories', categoryController.index)
router.post('/categories', categoryController.store)

export { router }
