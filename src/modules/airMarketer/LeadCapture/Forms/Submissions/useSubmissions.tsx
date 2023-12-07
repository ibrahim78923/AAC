import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  submissionsDefaultValues,
  submissionsValidationSchema,
} from './Submissions.data';
import { useTheme } from '@mui/material';

const useSubmissions = () => {
  const [isFIlterDraweropen, setIsFIlterDraweropen] = useState(false);
  const [searchByClientName, setSearchByClientName] = useState('');
  const theme = useTheme();
  const handleCloseDrawer = () => {
    setIsFIlterDraweropen(false);
  };
  const submissionsMethods = useForm({
    resolver: yupResolver(submissionsValidationSchema),
    defaultValues: submissionsDefaultValues,
  });

  const { handleSubmit, reset } = submissionsMethods;

  const onSubmit = () => {
    setIsFIlterDraweropen(false);
    reset();
  };

  return {
    setIsFIlterDraweropen,
    isFIlterDraweropen,
    handleCloseDrawer,
    handleSubmit,
    onSubmit,
    submissionsMethods,
    searchByClientName,
    setSearchByClientName,
    theme,
  };
};

export default useSubmissions;
