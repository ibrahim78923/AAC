import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from './Filter.data';
import { useRouter } from 'next/router';

const useFilter = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewFilter, setIsNewFilter] = useState(true);

  const methodsFilterForm = useForm({
    defaultValues,
  });

  const submitFilterForm = async () => {
    setIsDrawerOpen(false);
  };

  const resetFilterForm = async () => {
    methodsFilterForm?.reset();
    setIsDrawerOpen(false);
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    methodsFilterForm,
    submitFilterForm,
    resetFilterForm,
    isNewFilter,
    setIsNewFilter,
    router,
  };
};
export default useFilter;
