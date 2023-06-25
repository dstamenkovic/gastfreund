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
  }),
})

export const { useGetTasksQuery } = tasksApi
