import { db } from './db';
import { usersTable, linksTable, likesTable } from './db/schema';

async function seedDatabase() {
  // Insert users
  const userIds = await db.insert(usersTable).values([
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
    { name: 'Dave'},
  ]).returning({ id: usersTable.id });

  // Insert links
  const linkIds = await db.insert(linksTable).values([
    { user_id: userIds[0].id, href: 'https://www.duckduckgo.com' },
    { user_id: userIds[1].id, href: 'https://www.tocode.co.il' },
    { user_id: userIds[2].id, href: 'https://nextjs.org/blog/next-15' },
  ]).returning({ id: linksTable.id });

  // Insert likes
  await db.insert(likesTable).values([
    { user_id: userIds[0].id, link_id: linkIds[1].id },
    { user_id: userIds[1].id, link_id: linkIds[2].id },
    { user_id: userIds[2].id, link_id: linkIds[1].id },
    { user_id: userIds[1].id, link_id: linkIds[0].id },
    { user_id: userIds[0].id, link_id: linkIds[1].id },
  ]);

  console.log('Database seeded successfully!');
}

seedDatabase().catch(console.error);
