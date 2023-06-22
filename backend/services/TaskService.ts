import { v4 as uuidv4 } from 'uuid'
import Joi from 'joi'

const taskSchema = Joi.object({
  id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  title: Joi.string().required().min(3),
  status: Joi.string().valid('to-do', 'in-progress', 'done').required(),
})

import { getDbInstance } from '../data/database'
import { Task } from '../data/Types'

const checkIfTitleExists = async (title: string) => {
  const db = getDbInstance()
  const tasks = await db.getData('/tasks')
  const taskIdx = tasks.findIndex((task: Task) => task.title === title)
  return taskIdx !== -1
}

export const getTask = async (id: string) => {
  const db = getDbInstance()
  const taskIdx = await db.getIndex('/tasks', id)

  if (taskIdx === -1) {
    throw new Error('Task not found')
  }

  const task = await db.getData(`/tasks[${taskIdx}]`)

  return task
}

export const getTasks = async () => {
  const db = getDbInstance()
  const tasks = await db.getData('/tasks')
  return tasks
}

export const createTask = async (data: Omit<Task, 'id'>) => {
  const db = getDbInstance()
  const newTask: Task = {
    id: uuidv4(),
    ...data,
  }

  const titleExists = await checkIfTitleExists(newTask.title)
  if (titleExists) {
    throw new Error('Task with this title already exists')
  }

  // Validate data
  try {
    await taskSchema.validateAsync(newTask)
  } catch (error) {
    if (error instanceof Joi.ValidationError) throw new Error(error.details[0].message)
    else throw new Error('Invalid data')
  }

  db.push('/tasks[]', newTask)
  return newTask
}

export const updateTask = async (id: string, data: Partial<Task>) => {
  const db = getDbInstance()
  const taskIdx = await db.getIndex('/tasks', id)

  if (taskIdx === -1) {
    throw new Error('Task not found')
  }

  const taskDb = await db.getData(`/tasks[${taskIdx}]`)
  const updatedTask = {
    ...taskDb,
    ...data,
  }

  // Validate data
  try {
    await taskSchema.validateAsync(updatedTask)
  } catch (error) {
    if (error instanceof Joi.ValidationError) throw new Error(error.details[0].message)
    else throw new Error('Invalid data')
  }

  db.push(`/tasks[${taskIdx}]`, updatedTask)

  return updatedTask
}

export const deleteTask = async (id: string) => {
  const db = getDbInstance()
  const taskIdx = await db.getIndex('/tasks', id)

  if (taskIdx === -1) {
    throw new Error('Task not found')
  }

  db.delete(`/tasks[${taskIdx}]`)
}
