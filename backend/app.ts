import express from 'express'
import taskRoutes from './routes/taskRoutes'

const app = express()
const port = 4000

app.use('/tasks', taskRoutes)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
