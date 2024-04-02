import { useGetUsersByIdQuery } from '@/services/superAdmin/user-management/users';
import { getSession } from '@/utils';

const useEditProfile = () => {
  const { user }: any = getSession();
  const { data: getUserData } = useGetUsersByIdQuery(user?._id);
  return {
    getUserData,
  };
};

export default useEditProfile;
