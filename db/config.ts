import { drizzle } from 'drizzle-orm/libsql';
import { config } from 'dotenv';
config();

const isDev = () => {
  return import.meta.env.DEV
}

const db_prod = ()=>
  drizzle({ connection: {
    url: process.env.DATABASE_URL || 'cuculele', 
    authToken: process.env.DATABASE_AUTH_TOKEN 
  }});


const db_dev = ()=>
  drizzle(
    { connection: {
      url: 'file:./db/local.db'
    }});


export const db = isDev() ? db_dev() : db_prod();