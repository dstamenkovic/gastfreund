import { Request, Response } from 'express'
import { Task } from '../data/Types'

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask as deleteTaskService,
  getTaskById,
} from '../services/TaskService'

interface SearchTasksProps extends Request {
  query: {
    title: string
  }
}

interface CreateTaskProps extends Request {
  body: Omit<Task, 'id' | 'updateAt'>
}
interface UpdateTaskProps extends Request {
  body: Partial<Task>
  params: {
    id: string
  }
}
interface FindTaskProps extends Request {
  params: {
    id: string
  }
}

export const get = async (req: FindTaskProps, res: Response) => {
  try {
    const { id } = req.params
    const task = await getTaskById(id)
    res.status(200).send(task)
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'Could not retrieve task',
    })
  }
}

export const list = async (req: SearchTasksProps, res: Response) => {
  try {
    const { title } = req.query
    const tasks = await getTasks(title)
    return res.send(tasks)
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'Could not retrieve tasks',
    })
  }
}

export const create = async (req: CreateTaskProps, res: Response) => {
  try {
    const { title, status } = req.body

    if (!title || !status) {
      throw new Error('Missing at least one of the required parameters')
    }

    const createdTask = await createTask({ title, status })
    res.status(201).send(createdTask)
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    })
  }
}

export const update = async (req: UpdateTaskProps, res: Response) => {
  try {
    const { id } = req.params
    const updatedTask = await updateTask(id, req.body)
    res.status(200).send(updatedTask)
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    })
  }
}

export const deleteTask = async (req: FindTaskProps, res: Response) => {
  try {
    const { id } = req.params
    await deleteTaskService(id)
    res.status(200).send({
      id,
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Unable to delete task',
    })
  }
}
