import { drizzle } from 'drizzle-orm/libsql';

const isDev = () => {
  return import.meta.env.DEV
}

const db_prod = ()=>
  drizzle({ connection: {
    url: import.meta.env.DATABASE_URL, 
    authToken: import.meta.env.DATABASE_AUTH_TOKEN 
  }});


const db_dev = ()=>
  drizzle(
    { connection: {
      url: 'file:./db/local.db'
    }});


export const db = isDev() ? db_dev() : db_prod();