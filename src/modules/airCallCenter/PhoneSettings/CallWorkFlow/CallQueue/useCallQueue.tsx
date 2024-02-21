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

  const { handleSubmit } = methods;

  const onSubmit = () => {
    // console.log(values)
  };
  // const handleNextDetail = () => {
  //   setIsNumberDetail(true)
  // }

  //functions

  return {
    theme,
    navigate,
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useCallQueue;
