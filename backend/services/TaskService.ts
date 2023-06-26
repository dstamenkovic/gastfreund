import { v4 as uuidv4 } from 'uuid'
import Joi from 'joi'

import { Task } from '../data/Types'
import { getDbInstance } from '../data/database'

const taskSchema = Joi.object({
  id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  title: Joi.string().required().min(3),
  status: Joi.string().valid('to-do', 'in-progress', 'done').required(),
  updatedAt: Joi.date().required(),
})

const checkIfTitleExists = async (title: string) => {
  const db = getDbInstance()
  const tasks = await db.getData('/tasks')
  const taskIdx = tasks.findIndex((task: Task) => task.title === title)
  return taskIdx !== -1
}

export const getTaskById = async (id: string) => {
  const db = getDbInstance()
  const taskIdx = await db.getIndex('/tasks', id)
  if (taskIdx === -1) {
    throw new Error('Task not found')
  }

  const task = await db.getData(`/tasks[${taskIdx}]`)

  return task
}

export const getTasks = async (title: string): Promise<Task[]> => {
  const db = getDbInstance()
  let tasks: Task[] = await db.getData('/tasks')

  if (title) {
    tasks = tasks.filter((task: Task) => task.title.toLowerCase().includes(title))
  }

  return tasks
}

export const createTask = async (data: Omit<Task, 'id' | 'updatedAt'>): Promise<Task> => {
  const db = getDbInstance()
  const newTask: Task = {
    id: uuidv4(),
    updatedAt: new Date(),
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

export const updateTask = async (id: string, data: Partial<Task>): Promise<Task> => {
  const db = getDbInstance()
  const taskIdx = await db.getIndex('/tasks', id)

  if (taskIdx === -1) {
    throw new Error('Task not found')
  }
  if (data.title) {
    const titleExists = await checkIfTitleExists(data.title)
    if (titleExists) {
      throw new Error('Task with this title already exists')
    }
  }

  const taskDb: Task = await db.getData(`/tasks[${taskIdx}]`)

  const updatedTask = {
    ...taskDb,
    ...data,
    updatedAt: data.status && taskDb.status !== data.status ? new Date() : taskDb.updatedAt,
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

export const deleteTask = async (id: string): Promise<void> => {
  const db = getDbInstance()
  const taskIdx = await db.getIndex('/tasks', id)

  if (taskIdx === -1) {
    throw new Error('Task not found')
  }

  db.delete(`/tasks[${taskIdx}]`)
}
