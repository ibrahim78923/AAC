import { useState } from 'react';
import { useTheme } from '@mui/material';
import { userListApi } from '@/services/superAdmin/user-management/UserList';

const useUsersDetails = (employeeDataById?: any) => {
  const theme = useTheme();
  const [tabValue, setTabVal] = useState<number>();
  const [isOpenAddAccountDrawer, setIsOpenAddAccountDrawer] = useState(false);
  const { useUpdateUserImgMutation } = userListApi;
  const [updateUserImg] = useUpdateUserImgMutation();
  const [searchAccount, setSearchAccount] = useState('');

  // function for select user image
  const handleChangeImg = (e: any) => {
    if (e?.target?.files?.length) {
      const formData = new FormData();
      formData?.append('avatar', e?.target?.files[0]);
      updateUserImg({ id: employeeDataById, body: formData });
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
