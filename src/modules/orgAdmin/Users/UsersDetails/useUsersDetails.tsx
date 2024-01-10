import { useState } from 'react';
import { useTheme } from '@mui/material';
import { userListApi } from '@/services/superAdmin/user-management/UserList';
import { enqueueSnackbar } from 'notistack';

const useUsersDetails = (employeeDataById?: any) => {
  const theme = useTheme();
  const [tabValue, setTabVal] = useState<number>();
  const [isOpenAddAccountDrawer, setIsOpenAddAccountDrawer] = useState(false);
  const { useUpdateUserImgMutation } = userListApi;
  const [updateUserImg] = useUpdateUserImgMutation();
  const [searchAccount, setSearchAccount] = useState('');

  // function for select user image
  const handleChangeImg = async (e: any) => {
    if (e?.target?.files?.length) {
      const formData = new FormData();
      formData?.append('avatar', e?.target?.files[0]);
      try {
        await updateUserImg({ id: employeeDataById, body: formData })?.unwrap();
        enqueueSnackbar('Image updated successfully', {
          variant: 'success',
        });
      } catch (error: any) {
        enqueueSnackbar(error?.data?.message, {
          variant: 'error',
        });
      }
    }
  };

  return {
    tabValue,
    setTabVal,
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    theme,
    handleChangeImg,
    searchAccount,
    setSearchAccount,
  };
};

export default useUsersDetails;
