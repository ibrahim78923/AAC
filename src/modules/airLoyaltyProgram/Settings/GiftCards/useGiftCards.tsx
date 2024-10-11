import { useForm } from 'react-hook-form';

export const useGiftCards = () => {
  const methods = useForm({
    defaultValues: {
      maxAmountLimit: '',
    },
  });

  return {
    methods,
  };
};
