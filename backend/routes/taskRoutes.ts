import express from 'express'

import { list, create, update, deleteTask } from '../controllers/TaskController'

const router = express.Router()

router.get('', list)
router.post('', create)
router.put('/:id', update)
router.delete('/:id', deleteTask)

export default router
