import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  basicIvrDefaultValues,
  basicIvrValidationSchema,
} from './BasicIVR.data';

const useBasicIVR = () => {
  const navigate = useRouter();
  //states
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(basicIvrValidationSchema),
    defaultValues: basicIvrDefaultValues,
  });
  // const { handleSubmit } = methods;
  // const handleNextDetail = () => {
  //   setIsNumberDetail(true)
  // }

  //functions

  return {
    theme,
    navigate,
    methods,
  };
};

export default useBasicIVR;
