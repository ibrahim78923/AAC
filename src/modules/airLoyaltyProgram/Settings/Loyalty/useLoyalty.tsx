import { useForm } from 'react-hook-form';

export const useLoyalty = () => {
  const methods = useForm({
    defaultValues: {
      maxPointsLimit: '',
      exchangeRate: '',
    },
  });

  return {
    methods,
  };
};
