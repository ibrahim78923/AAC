import { useForm } from 'react-hook-form';
import { defaultValues } from './FilterContractsForm.data';

export const useFilterContractsForm = (props: any) => {
  const { setIsDrawerOpen } = props;

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    setIsDrawerOpen(false);
  };

  return {
    methods,
    defaultValues,
    handleSubmit,
    onSubmit,
  };
};
