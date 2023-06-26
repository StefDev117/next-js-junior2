"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

const UserPage = () => {

  const searchParams = useSearchParams();
  console.log(searchParams);
  const userId = searchParams.get("id");
  console.log(userId);

  const router = useRouter();
  console.log(router);
  const { data: session } = useSession();
  const [user, setUser] = useState();

  console.log(user);
  useEffect(() => {
    console.log(session);
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${userId}`);
      console.log("response");
      console.log(response);
      const data = await response.json();

      setUser(data);
    };

    console.log(session);
    if (session?.user.id) {
      console.log("fetchposts appelé");
      fetchPosts();
    } else {
      console.log("error :(");
    }
  }, [session]);

  const capsFirstLetter = (val) => {
    return val && val.slice(0, 1).toUpperCase() + val.slice(1, val.lenght);
  };

  const userNameCaps = user && capsFirstLetter(user.username);
  const userEmailCaps = user && capsFirstLetter(user.email);

  return (
    <div className="prompt_card flex justify-center gap-2">
      {user && (
        <>
          <Image
            src={user.image}
            alt="user_image"
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h2 className="">{userNameCaps}</h2>
            <h3 className="">{userEmailCaps}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
