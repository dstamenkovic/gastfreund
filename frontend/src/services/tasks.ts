import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { Task } from 'Types'
import { setErrorMsg } from 'store/dashSlice'

type ApiErrorType = {
  error: {
    data: {
      message: string
    }
    status: number
  }
}

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  endpoints: builder => ({
    getTasks: builder.query<Task[], string | undefined>({
      query: title => (title ? `/tasks?title=${title}` : '/tasks'),
      transformResponse: (response: Task[]) => {
        // sort tasks by updatedAt desc
        // so the most recent tasks should appear first
        return response.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
      },
      // needed to update the data when searching
      async onQueryStarted(title, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // update/replace the list of tasks when searching
          if (title) {
            dispatch(tasksApi.util.updateQueryData('getTasks', undefined, () => data))
          }
        } catch (error: any) {
          dispatch(setErrorMsg((error as ApiErrorType).error.data.message))
        }
      },
    }),
    createTask: builder.mutation<Task, Pick<Task, 'title' | 'status'>>({
      query: body => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const newTask = data
          // add the new task to the list of tasks, at the beginning
          dispatch(
            tasksApi.util.updateQueryData('getTasks', undefined, old => {
              old.unshift(newTask)
              return old
            })
          )
        } catch (error: any) {
          dispatch(setErrorMsg((error as ApiErrorType).error.data.message))
        }
      },
    }),
    updateTask: builder.mutation<Task, Partial<Task>>({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const updatedTask = data
          // update the item in tasks
          dispatch(
            tasksApi.util.updateQueryData('getTasks', undefined, old => {
              const idx = old.findIndex(task => task.id === updatedTask.id)
              if (idx !== -1) {
                old[idx] = updatedTask
              }
              return old.sort(
                (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
              )
            })
          )
        } catch (error: any) {
          dispatch(setErrorMsg((error as ApiErrorType).error.data.message))
        }
      },
    }),
    deleteTask: builder.mutation<{ id: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          // remove the item from tasks
          dispatch(
            tasksApi.util.updateQueryData('getTasks', undefined, old => {
              const idx = old.findIndex(task => task.id === id)
              if (idx !== -1) {
                old.splice(idx, 1)
              }
              return old
            })
          )
        } catch (error: any) {
          dispatch(setErrorMsg((error as ApiErrorType).error.data.message))
        }
      },
    }),
  }),
})

export const {
  useGetTasksQuery,
  useLazyGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi
