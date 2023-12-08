import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  filterWorkflowsValidationSchema,
  defaultValues,
} from './FilterWorkflow.data';

export const useFilterWorkflow = (props: any) => {
  const { setIsDrawerOpen } = props;
  const methods = useForm({
    resolver: yupResolver(filterWorkflowsValidationSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = async () => {
    setIsDrawerOpen(false);
  };
  return {
    handleSubmit,
    onSubmit,
    methods,
  };
};
