import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  newNumberDefaultValues,
  newNumberValidationSchema,
} from './BuyNewNumber.data';
import { useState } from 'react';

const useBuyNewNumber = () => {
  const [isNumberDetail, setIsNumberDetail] = useState(false);

  const methods: any = useForm({
    resolver: yupResolver(newNumberValidationSchema),
    defaultValues: newNumberDefaultValues,
  });
  // const { handleSubmit } = methods;

  const handleNextDetail = () => {
    setIsNumberDetail(true);
  };

  return {
    methods,
    isNumberDetail,
    handleNextDetail,
  };
};

export default useBuyNewNumber;
