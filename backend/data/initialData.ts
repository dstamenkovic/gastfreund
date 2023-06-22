import { DB } from './Types'

const initialData: DB = {
  tasks: [
    {
      id: 'd3f43d51-dd54-4bb8-9d9f-346ef325a223',
      title: 'Review request for proposal',
      status: 'to-do',
    },
    {
      id: 'a974544e-1050-45ce-9437-dc5fb1887ae8',
      title: 'Develop BIM model of wind shear impact',
      status: 'to-do',
    },
    {
      id: '9bd5daa5-f213-47c6-979e-192655bcace5',
      title: 'Prepare for client meeting with Addisons',
      status: 'in-progress',
    },
  ],
}

export default initialData
