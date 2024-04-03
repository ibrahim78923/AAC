import { useGetUsersByIdQuery } from '@/services/superAdmin/user-management/users';
import { getSession } from '@/utils';

const useEditProfile = () => {
  const { user }: any = getSession();
  const { data: getUserData, isLoading: profileDataLoading } =
    useGetUsersByIdQuery(user?._id);
  return {
    getUserData,
    profileDataLoading,
  };
};

export default useEditProfile;
