import { useForm } from 'react-hook-form';
import { defaultValues } from './ResetTaskFilter.data';

const useResetTasksFilter = () => {
  const methods: any = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = () => {};

  return {
    handleSubmit,
    onSubmit,
    methods,
  };
};
export default useResetTasksFilter;
