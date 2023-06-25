import express from 'express'
import cors from 'cors'

import taskRoutes from './routes/taskRoutes'
import { initializeDb } from './data/database'
import initialData from './data/initialData'

const app = express()

app.use(cors())

// delay all requests by 500ms
app.use((req, res, next) => {
  setTimeout(next, 500)
})

initializeDb(initialData)

app.use(express.json())

app.use('/tasks', taskRoutes)

export default app
