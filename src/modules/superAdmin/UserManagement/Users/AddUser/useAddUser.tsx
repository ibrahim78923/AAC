import { usePostUserEmployeeMutation } from '@/services/superAdmin/user-management/UserList';
import { usersApi } from '@/services/superAdmin/user-management/users';

const useAddUser = () => {
  const pathName = window?.location?.pathname;
  const { usePostUsersMutation, useUpdateUsersMutation } = usersApi;
  const [postUsers] = usePostUsersMutation();
  const [updateUsers] = useUpdateUsersMutation();
  const [postUserEmployee] = usePostUserEmployeeMutation();

  return {
    pathName,
    postUsers,
    updateUsers,
    postUserEmployee,
  };
};

export default useAddUser;
