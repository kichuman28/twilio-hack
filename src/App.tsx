import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import BottomBar from "./components/BottomBar";
import ComponentCard from "./components/CommunityCard";
import { app } from "./utils/Firebase";
import { fetchPosts } from "./utils/FirebaseFunctions";
import { PostWithAuthor } from "./utils/types";

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const handlePostsUpdate = (updatedPosts: PostWithAuthor[]) => {
    setPosts(updatedPosts);
    console.log(updatedPosts);
  };

  useEffect(() => {
    const unsubscribe = fetchPosts(handlePostsUpdate);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="Feed mx-auto md:max-w-[30%] px-6 py-4 mb-8">
        {posts.map((post) => (
          <ComponentCard
            currentUser={currentUser?.uid}
            key={post.id}
            post={post}
          />
        ))}
      </div>
      <BottomBar />
    </div>
  );
};

export default App;
