import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  FilterSalesWorkflow,
  salesWorkflowsFilterValues,
} from './FilterSalesWorkflow.data';

export const useFilterSalesWorkflow = (props: any) => {
  const { setIsFilterOpen } = props;
  const filterMethod = useForm({
    resolver: yupResolver(FilterSalesWorkflow),
    defaultValues: salesWorkflowsFilterValues,
  });
  const { handleSubmit, reset } = filterMethod;
  const onSubmit = () => {
    reset();
    setIsFilterOpen(false);
  };
  return {
    handleSubmit,
    onSubmit,
    filterMethod,
  };
};
