import pg from 'pg'

const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts'
})

client.connect()

export async function Query (query) {
  const { rows } = await client.query(query)
  return rows
}
