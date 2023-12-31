import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'

import type { Task as TaskType } from 'Types'
import { store } from './store'

function render(
  ui: React.ReactElement,
  { initialState, ...renderOptions }: { initialState?: any } = {}
) {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export const fakeTasks: TaskType[] = [
  {
    id: 'd3f43d51-dd54-4bb8-9d9f-346ef325a223',
    title: 'Review request for proposal',
    status: 'to-do',
    updatedAt: new Date('2023-06-23T09:00'),
  },
  {
    id: 'a974544e-1050-45ce-9437-dc5fb1887ae8',
    title: 'Develop BIM model of wind shear impact',
    status: 'to-do',
    updatedAt: new Date('2023-06-23T11:00'),
  },
  {
    id: '9bd5daa5-f213-47c6-979e-192655bcace5',
    title: 'Prepare for client meeting with Addisons',
    status: 'in-progress',
    updatedAt: new Date('2023-06-24T01:00'),
  },
]

export * from '@testing-library/react'

export { render }
