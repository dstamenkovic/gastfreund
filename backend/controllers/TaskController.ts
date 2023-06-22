import { Request, Response } from 'express'
import { Task } from '../data/Types'

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask as deleteTaskService,
} from '../services/TaskService'

interface CreateTaskProps extends Request {
  body: Omit<Task, 'id'>
}
interface UpdateTaskProps extends Request {
  body: Partial<Task>
  params: {
    id: string
  }
}
interface DeleteTaskProps extends Request {
  params: {
    id: string
  }
}

export const list = async (req: Request, res: Response) => {
  const tasks = await getTasks()
  res.send(tasks)
}

export const create = async (req: CreateTaskProps, res: Response) => {
  try {
    const { title, status } = req.body

    if (!title || !status) {
      throw new Error('Missing at least one of the required parameters')
    }

    await createTask({ title, status })
    res.status(200).send({
      success: true,
      message: 'Task created successfully ',
    })
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
    await updateTask(id, req.body)
    res.status(200).send({
      success: true,
      message: 'Task updated successfully ',
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    })
  }
}

export const deleteTask = async (req: DeleteTaskProps, res: Response) => {
  try {
    const { id } = req.params
    await deleteTaskService(id)
    res.status(200).send({
      success: true,
      message: 'Task deleted successfully ',
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Unable to delete task',
    })
  }
}
