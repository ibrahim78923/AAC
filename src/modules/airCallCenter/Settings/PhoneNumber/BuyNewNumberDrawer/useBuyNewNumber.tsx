import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  newNumberDefaultValues,
  newNumberValidationSchema,
} from './BuyNewNumber.data';
import { useState } from 'react';
import { successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';

const useBuyNewNumber = (props: any) => {
  const { isBuyNewNumber, setIsBuyNewNumber } = props;
  const [isNumberDetail, setIsNumberDetail] = useState(false);
  const [isEditNumber, serIsEditNumber] = useState(false);
  const theme = useTheme();

  const methods: any = useForm({
    resolver: yupResolver(newNumberValidationSchema) as any,
    defaultValues: newNumberDefaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = () => {
    successSnackbar('Number added successfully');

    setIsBuyNewNumber?.(false);
  };

  const handleNextDetail = () => {
    setIsNumberDetail(true);
  };
  const [value, setValue] = useState('Local');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue.toString());
  };

  return {
    methods,
    isNumberDetail,
    handleNextDetail,
    setIsNumberDetail,
    isEditNumber,
    serIsEditNumber,
    handleSubmit,
    onSubmit,
    isBuyNewNumber,
    setIsBuyNewNumber,
    theme,
    value,
    setValue,
    handleChange,
  };
};

export default useBuyNewNumber;
