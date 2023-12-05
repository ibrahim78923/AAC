import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  styleFormDefaultValues,
  styleFormvalidationSchema,
} from './CreateForm.data';

const useCreateForm = () => {
  const [value, setValue] = useState('1');
  const [showView, setShowView] = useState(true);
  const [editFormName, setEditFormName] = useState(true);
  const [pageName, setPageName] = useState('Profile');
  const [isDraweropen, setIsDraweropen] = useState(false);

  const router = useRouter();
  const { formData }: any = router.query;

  const formValue = JSON?.parse(formData);
  const [inputValue, setInputValue] = useState(formValue?.Name);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (value === '1') {
      setPageName('Success');
    } else {
      setPageName('Profile');
    }
  };

  const handleCloseDrawer = () => {
    setIsDraweropen(false);
  };
  const styleFormMethods = useForm({
    resolver: yupResolver(styleFormvalidationSchema),
    defaultValues: styleFormDefaultValues,
  });

  const { handleSubmit, reset } = styleFormMethods;

  const onSubmit = () => {
    setIsDraweropen(false);
    reset();
  };

  return {
    setIsDraweropen,
    isDraweropen,
    handleCloseDrawer,
    handleSubmit,
    onSubmit,
    styleFormMethods,
    value,
    pageName,
    setPageName,
    handleChange,
    editFormName,
    setEditFormName,
    showView,
    setShowView,
    inputValue,
    setInputValue,
  };
};

export default useCreateForm;
