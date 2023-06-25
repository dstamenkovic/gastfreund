import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Task } from 'Types'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  endpoints: builder => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/tasks',
    }),
  }),
})

export const { useGetTasksQuery } = tasksApi
