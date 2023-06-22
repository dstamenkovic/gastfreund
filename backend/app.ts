import express from 'express'
import taskRoutes from './routes/taskRoutes'

import { initializeDb } from './data/database'
import initialData from './data/initialData'

const app = express()
const port = 4000

initializeDb(initialData)

app.use(express.json())

app.use('/tasks', taskRoutes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
