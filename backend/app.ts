import express from 'express'
import cors from 'cors'

import taskRoutes from './routes/taskRoutes'
import { initializeDb } from './data/database'
import initialData from './data/initialData'

const app = express()

app.use(cors())

initializeDb(initialData)

app.use(express.json())

app.use('/tasks', taskRoutes)

export default app
