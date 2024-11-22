import { queryHomepageLinks } from "@/db/links";
import { login } from "@/db/users";
import Link from './client/Link';

export default async function Home() {
  const homepageLinks = await queryHomepageLinks();
  const currentUser = (await login('Dave')).user!;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
        {homepageLinks.map(link => (
          <Link user={currentUser} key={link.linkId} link={link} />
        ))}
      </ul>
      </main>
    </div>      
  );
}
