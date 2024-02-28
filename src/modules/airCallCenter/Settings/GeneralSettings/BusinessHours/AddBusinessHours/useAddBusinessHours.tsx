import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './AddBusinessHours.data';
// import dayjs from 'dayjs';
// import { enqueueSnackbar } from 'notistack';

const useAddBusinessHours = () => {
  const methodsAddBusinessHours = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const [days, setDays] = useState(() => []);
  const handleSelectDays = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: any,
  ) => {
    setDays(newFormats);
  };
  return {
    methodsAddBusinessHours,
    days,
    handleSelectDays,
  };
};

export default useAddBusinessHours;
