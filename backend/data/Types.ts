export interface Task {
  id: string
  title: string
  status: 'to-do' | 'in-progress' | 'done'
}

export interface DB {
  tasks: Task[]
}
