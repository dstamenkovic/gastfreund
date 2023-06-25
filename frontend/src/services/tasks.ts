import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Task } from 'Types'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  endpoints: builder => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
      transformResponse: (response: Task[]) => {
        // sort tasks by updatedAt desc
        // so the most recent tasks appear first
        return response.sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
      },
    }),
    updateTask: builder.mutation<Task, Partial<Task>>({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        const updatedTask = data
        // update the item in tasks
        dispatch(
          tasksApi.util.updateQueryData('getTasks', undefined, old => {
            const idx = old.findIndex(task => task.id === updatedTask.id)
            if (idx !== -1) {
              old[idx] = updatedTask
            }
            return old
          })
        )
      },
    }),
  }),
})

export const { useGetTasksQuery, useUpdateTaskMutation } = tasksApi
