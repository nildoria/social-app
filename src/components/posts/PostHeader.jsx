import { useState } from "react";
import ThreeDots from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcon from "../../assets/icons/time.svg";
import { useAvatar } from "../../hooks/useAvatar";

import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { getDateDifferenceFromNow } from "../../utils";

const PostHeader = ({ post }) => {
  const [showActions, setShowActions] = useState(false);

  const { avatarURL, isMe } = useAvatar(post);
  const { dispatch } = usePost();
  const { api } = useAxios();

  const handleDeletePost = async () => {
    dispatch({ type: actions.post.DATA_FETCHING });
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}`
      );
      if (response.status === 200) {
        dispatch({
          type: actions.post.POST_DELETED,
          data: post?.id,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error.response.error,
      });
    }
  };
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-full lg:h-[58px] lg:w-[58px] object-cover"
          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {`${getDateDifferenceFromNow(post?.createAt)} ago`}
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        {isMe && (
          <button onClick={() => setShowActions(!showActions)}>
            <img src={ThreeDots} alt="3dots of Action" />
          </button>
        )}

        {showActions && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              onClick={handleDeletePost}
              className="action-menu-item hover:text-red-500"
            >
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
