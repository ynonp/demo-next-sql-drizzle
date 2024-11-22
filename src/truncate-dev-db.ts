import { db } from './db';
import { usersTable, linksTable, likesTable } from './db/schema';

async function truncateDatabase() {
  await db.delete(usersTable)
  await db.delete(linksTable);
  await db.delete(likesTable);
}

truncateDatabase().catch(console.error);
