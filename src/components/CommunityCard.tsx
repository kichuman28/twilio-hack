import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { likePost, unlikePost } from "../utils/FirebaseFunctions";
import { PostWithAuthor } from "../utils/types";

interface CommunityCardProps {
  post: PostWithAuthor;
  currentUser: string | undefined;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ post, currentUser }) => {
  const { id, createdBy, content, mediaPath, likes } = post;
  const [liked, setLiked] = useState(likes.includes(currentUser));

  const handleLike = async () => {
    if (liked) {
      await unlikePost(id, currentUser!);
    } else {
      await likePost(id, currentUser!);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-secondary outline outline-slate-300 outline-1 rounded-md py-2 flex flex-col gap-2 px-6 my-6">
      <div className="flex items-center gap-2">
        <img
          className="h-12 w-auto rounded-full"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="User Avatar"
        />
        <p>{createdBy}</p>
      </div>
      <p>{content}</p>
      {mediaPath && (
        <img
          className="h-52 w-auto rounded-md"
          src={mediaPath}
          alt="Post Media"
        />
      )}
      <div className="flex items-center gap-2">
        <button onClick={handleLike}>
          <FontAwesomeIcon
            className={`text-xl ${
              liked ? "text-red-600" : "text-textPrimary"
            } mr-auto`}
            icon={liked ? faHeartSolid : faHeart}
          />
        </button>
        <p>{likes.length}</p>
      </div>
    </div>
  );
};

export default CommunityCard;
