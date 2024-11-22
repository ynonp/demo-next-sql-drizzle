import {linksTable, usersTable, likesTable as likes} from './schema';
import {db} from './index';
import { eq } from 'drizzle-orm';

export async function login(name: string) {
  // Check if the user already exists
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, name))
    .limit(1);

  if (existingUser.length > 0) {
    console.log('User logged in:', existingUser[0]);
    return { success: true, user: existingUser[0] };
  } else {
    return { success: false, user: null };
  }
}
