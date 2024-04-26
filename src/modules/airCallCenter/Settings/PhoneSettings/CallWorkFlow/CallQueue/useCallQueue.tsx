import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  callQueueDefaultValues,
  callQueueValidationSchema,
} from './CallQueue.data';

const useCallQueue = () => {
  const navigate = useRouter();
  //states
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(callQueueValidationSchema),
    defaultValues: callQueueDefaultValues,
  });

  const { handleSubmit, watch } = methods;

  const callerValue = watch('caller');

  const onSubmit = () => {
    // console.log(values)
  };

  //functions

  return {
    theme,
    navigate,
    methods,
    handleSubmit,
    onSubmit,
    callerValue,
  };
};

export default useCallQueue;
