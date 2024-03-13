import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import PostEntry from "./PostEntry";

const NewPost = () => {
  const [showPostEntry, setShowPostEntry] = useState(false);
  const { auth } = useAuth();
  const { state: profile } = useProfile();

  const user = profile?.user ?? auth?.user;

  return (
    <>
      {showPostEntry ? (
        <PostEntry onClose={() => setShowPostEntry(false)} />
      ) : (
        <div className="card">
          <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />

            <div className="flex-1">
              <textarea
                onFocus={() => setShowPostEntry(!showPostEntry)}
                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                name="post"
                id="post"
                placeholder="What's on your mind?"
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPost;
