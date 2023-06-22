import { JsonDB, Config } from 'node-json-db'
import { DB } from './Types'

let db: JsonDB | null = null

const dbName = process.env.NODE_ENV === 'test' ? 'test-db' : 'db'

async function initializeDb(data: DB) {
  if (!db) {
    console.log(`Initializing db in the file ${dbName}`)
    db = new JsonDB(new Config(`data/${dbName}`, true, false, '/'))
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

async function seedDb(data: DB) {
  await getDbInstance().push('/tasks', data.tasks)
}

export { initializeDb, getDbInstance, seedDb }
