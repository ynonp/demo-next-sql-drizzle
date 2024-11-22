'use client'
import { likeLink } from "@/db/links";
import { useState } from "react";

export default function Link({link, user}: {
  link: {
    linkId: number,
    href: string,
    likesCount: number,  
  },
  user: { id: number, name: string },
}) {  
  const [likesCount, setLikesCount] = useState(link.likesCount);

  async function handleClick() {
    const result = await likeLink(user.id, link.linkId);
    if (result.success) {
      setLikesCount(c => c + 1);
    } else {
      alert(result.message);
    }
  }

  return <li className="flex items-center space-x-3 rtl:space-x-reverse">
    <span className="mx-2 inline-block w-4">{likesCount}</span>          
    <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">+1</button>
    <span className="font-bold">{link.href}</span>                    
  </li>      
};