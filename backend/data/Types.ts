export interface Task {
  id: string
  title: string
  status: 'to-do' | 'in-progress' | 'done'
  // changes only when the status is updated
  updatedAt: Date
}

export interface DB {
  tasks: Task[]
}
