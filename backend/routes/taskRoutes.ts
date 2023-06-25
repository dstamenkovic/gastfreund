import express from 'express'

import { list, create, update, deleteTask, get } from '../controllers/TaskController'

const router = express.Router()

router.get('', list)
router.get('/:id', get)
router.post('', create)
router.patch('/:id', update)
router.delete('/:id', deleteTask)

export default router
