import { useGetUsersByIdQuery } from '@/services/superAdmin/user-management/users';
import { getSession } from '@/utils';
import { useState } from 'react';

const useEditProfile = () => {
  const [openRequestAgentModal, setOpenRequestAgentModal] = useState(false);
  const { user }: any = getSession();
  const { data: getUserData, isLoading: profileDataLoading } =
    useGetUsersByIdQuery(user?._id);
  const handleRequestAgent = () => {
    setOpenRequestAgentModal(true);
  };
  return {
    getUserData,
    profileDataLoading,
    openRequestAgentModal,
    setOpenRequestAgentModal,
    handleRequestAgent,
  };
};

export default useEditProfile;
