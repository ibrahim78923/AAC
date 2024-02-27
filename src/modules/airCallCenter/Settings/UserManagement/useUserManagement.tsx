import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import dayjs from 'dayjs';
// import { enqueueSnackbar } from 'notistack';
// import { yupResolver } from '@hookform/resolvers/yup';

const useUserManagement = () => {
  const [tabValue, setTabValue] = useState('users');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return {
    tabValue,
    handleChangeTab,
  };
};

export default useUserManagement;
