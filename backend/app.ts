import express from 'express'
import taskRoutes from './routes/taskRoutes'

import { initializeDb } from './data/database'
import initialData from './data/initialData'

const app = express()

initializeDb(initialData)

app.use(express.json())

app.use('/tasks', taskRoutes)

export default app
