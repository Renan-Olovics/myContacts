import { Router } from 'express'

import { contactController } from './app/controllers'

const router = Router()

router.get('/contacts', contactController.index)

export { router }
