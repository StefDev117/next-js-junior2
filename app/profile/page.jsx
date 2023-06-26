"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { MyContext } from "components/Context/mycontext";
import MyContextProvider from "@components/Context/MyContextProvider";
// import Profile from "@components/profile";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  console.log(posts);
  //problem de data avec posts probleme seession .user .id = undefined
  useEffect(() => {
    console.log(session);
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      console.log("response");
      console.log(response);
      const data = await response.json();

      setPosts(data);
    };

    // fetchPosts();
    console.log(session);
    if (session?.user.id) {
      console.log("fetchposts appelé");
      fetchPosts();
    } else {
      console.log("error :(");
    }
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want do delete this prompt?"
    );
    // router.push(`/update-prompt?id=${post._id}`)
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <MyContextProvider>
      <Profile
        name="My profile"
        description="Welcome to your personnalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </MyContextProvider>
  );
};

export default MyProfile;
