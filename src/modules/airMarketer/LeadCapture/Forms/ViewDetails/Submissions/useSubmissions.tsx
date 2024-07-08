import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  submissionsDefaultValues,
  submissionsValidationSchema,
} from './Submissions.data';
import { useTheme } from '@mui/material';
import { useGetFormSubmissionsQuery } from '@/services/airMarketer/lead-capture/forms';

const useSubmissions = (formId: string) => {
  const theme = useTheme();
  const { data: dataGetFormSubmissions, isLoading: loadingFormSubmissions } =
    useGetFormSubmissionsQuery({ id: formId });

  const [isFIlterDraweropen, setIsFIlterDraweropen] = useState(false);
  const [searchByClientName, setSearchByClientName] = useState('');

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
    theme,
    dataGetFormSubmissions,
    loadingFormSubmissions,

    setIsFIlterDraweropen,
    isFIlterDraweropen,
    handleCloseDrawer,
    handleSubmit,
    onSubmit,
    submissionsMethods,
    searchByClientName,
    setSearchByClientName,
  };
};

export default useSubmissions;
