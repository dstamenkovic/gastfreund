export interface Task {
  id: string
  title: string
  status: 'to-do' | 'in-progress' | 'done'
  updatedAt: Date
}
