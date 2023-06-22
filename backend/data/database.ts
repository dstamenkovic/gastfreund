import { JsonDB, Config } from 'node-json-db'
import { DB } from './Types'

let db: JsonDB | null = null

async function initializeDb(data: DB) {
  if (!db) {
    console.log('Initializing db')
    db = new JsonDB(new Config('data/db', true, false, '/'))
    const tasksAdded = await db.exists('/tasks')
    if (!tasksAdded) {
      console.log('Seeding db')
      db.push('/tasks', data.tasks)
    }
  }
}

function getDbInstance() {
  if (!db) {
    throw new Error('Db has not been initialized. Please called initializeDb first.')
  }
  return db
}

function seedDb(data: DB) {
  getDbInstance().push('/tasks', data.tasks)
}

export { initializeDb, getDbInstance, seedDb }
