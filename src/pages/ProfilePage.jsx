import { useEffect } from "react";
import { actions } from "../actions";
import MyPosts from "../components/profile/MyPosts";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();

  const { api } = useAxios();
  const { auth } = useAuth();

  const profileActions = actions.profile;

  useEffect(() => {
    dispatch({ type: profileActions.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        if (response.status === 200) {
          dispatch({ type: profileActions.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: profileActions.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div>Fetching profile data...</div>;
  }
  return (
    <>
      <div>
        Welcome, {state?.user?.firstName} {state?.user?.lastName}
        <ProfileInfo />
        <MyPosts />
      </div>
    </>
  );
};

export default ProfilePage;
