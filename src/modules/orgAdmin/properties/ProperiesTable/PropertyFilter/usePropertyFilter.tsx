import { useForm } from 'react-hook-form';

const usePropertyFilter = (setIsFilterDrawerOpen: any) => {
  const methods = useForm({});
  const { handleSubmit } = methods;
  const onSubmit = () => {
    setIsFilterDrawerOpen(false);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default usePropertyFilter;
