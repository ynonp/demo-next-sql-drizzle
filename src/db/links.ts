'use server';

import {
  linksTable as links,
  usersTable as users,
  likesTable as likes} from './schema';
import {db} from './index';
import { eq, sql, and } from 'drizzle-orm';

/**
 * Returns a list of all links joined with their authors
 * and number of likes
 */
export async function queryHomepageLinks() {
  return db.select({
    linkId: links.id,
    href: links.href,
    authorName: users.name,
    likesCount: sql<number>`COUNT(${likes.id})`, // Aggregates likes
  })
  .from(links)
  .leftJoin(users, eq(links.user_id, users.id))
  .leftJoin(likes, eq(links.id, likes.link_id))
  .groupBy(links.id, users.name); 
}

export async function likeLink(user_id: number, link_id: number) {
  console.log(`user id = ${user_id}, link_id = ${link_id}`);
  // Check if the like already exists
  const existingLike = await db
    .select()
    .from(likes)
    .where(and(eq(likes.user_id, user_id), eq(likes.link_id, link_id)))
    .limit(1);

  if (existingLike.length > 0) {
    console.log('User has already liked this link.');
    return { success: false, message: 'You have already liked this link.' };
  } 

  // Add the like
  const newLike = await db
    .insert(likes)
    .values({ user_id, link_id })
    .returning();

  console.log('Like added successfully:', newLike);
  return { success: true, message: 'Like added successfully!', like: newLike };

}
