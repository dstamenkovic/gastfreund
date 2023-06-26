import request from 'supertest'

import { seedDb } from '../data/database'
import initialData from '../data/initialData'
import { Task } from '../data/Types'

import app from '../app'

describe('Tasks', () => {
  beforeEach(async () => {
    await seedDb(initialData)
  })

  it('Should return the list of tasks', async () => {
    const response = await request(app).get('/tasks')
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body).toHaveLength(3)
  })

  it('Should return the list of tasks filtered by title', async () => {
    const term = 'model of wind'
    const response = await request(app).get(`/tasks?title=${term}`)
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].title).toContain(term)
  })

  it('Should create a new task', async () => {
    // create task
    const newTask: Omit<Task, 'id' | 'updatedAt'> = {
      title: 'New test task',
      status: 'to-do',
    }
    const response = await request(app).post('/tasks').send(newTask)
    expect(response.status).toBe(201)

    const createdTaskID = response.body.id

    // check if task was created
    const taskResponse = await request(app).get(`/tasks/${createdTaskID}`)
    expect(taskResponse.status).toBe(200)
    expect(taskResponse.body).toMatchObject(newTask)
  })

  it('Should get an error when creating a task with an existing title', async () => {
    const allTasks = await request(app).get('/tasks')
    const existingTaskTitle = allTasks.body[0].title

    const newTask: Omit<Task, 'id' | 'updatedAt'> = {
      title: existingTaskTitle,
      status: 'to-do',
    }
    const response = await request(app).post('/tasks').send(newTask)
    expect(response.status).toBe(400)
  })

  it('Should get an error when creating a task with missing properties', async () => {
    const newTask = {
      title: 'New task',
    }
    const response = await request(app).post('/tasks').send(newTask)
    expect(response.status).toBe(400)

    const newTask2 = {
      status: 'to-do',
    }
    const response2 = await request(app).post('/tasks').send(newTask2)
    expect(response2.status).toBe(400)
  })

  it('Should get an error when creating a task with an invalid status', async () => {
    const newTask = {
      title: 'New task',
      status: 'invalid status',
    }
    const response = await request(app).post('/tasks').send(newTask)
    expect(response.status).toBe(400)
  })

  it('Should update the task title', async () => {
    const allTasks = await request(app).get('/tasks')
    const taskToUpdate = allTasks.body[0]

    const newTitle = 'Updated title'
    const response = await request(app).patch(`/tasks/${taskToUpdate.id}`).send({ title: newTitle })
    expect(response.status).toBe(200)

    const updatedTask = await request(app).get(`/tasks/${taskToUpdate.id}`)
    expect(updatedTask.body.title).toBe(newTitle)
    // updatedAt should remain the same
    expect(updatedTask.body.updatedAt).toBe(taskToUpdate.updatedAt)
  })

  it('Should update the task status', async () => {
    const allTasks = await request(app).get('/tasks')
    const taskToUpdate = allTasks.body[0]

    const newStatus = 'done'
    const response = await request(app)
      .patch(`/tasks/${taskToUpdate.id}`)
      .send({ status: newStatus })
    expect(response.status).toBe(200)

    const updatedTask = await request(app).get(`/tasks/${taskToUpdate.id}`)
    expect(updatedTask.body.status).toBe(newStatus)
    // updatedAt should be updated
    expect(updatedTask.body.updatedAt).not.toBe(taskToUpdate.updatedAt)
  })

  it('Should get an error when updating a task with an invalid status', async () => {
    const allTasks = await request(app).get('/tasks')
    const taskToUpdate = allTasks.body[0]

    const newStatus = 'invalid status'
    const response = await request(app)
      .patch(`/tasks/${taskToUpdate.id}`)
      .send({ status: newStatus })
    expect(response.status).toBe(400)
  })

  it('Should delete a task', async () => {
    const allTasks = await request(app).get('/tasks')
    const taskToDelete = allTasks.body[0]

    const response = await request(app).delete(`/tasks/${taskToDelete.id}`)
    expect(response.status).toBe(200)

    const deletedTask = await request(app).get(`/tasks/${taskToDelete.id}`)
    expect(deletedTask.status).toBe(400)
  })
})
