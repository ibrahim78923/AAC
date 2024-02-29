import { useForm } from 'react-hook-form';
import { softwareFilterDefaultValues } from './SoftwareFilter.data';

export const useSoftwareFilter = (props: any) => {
  const { setIsOpenFilterDrawer, setFilterValues, filterValues } = props;

  const methods = useForm({
    defaultValues: softwareFilterDefaultValues(filterValues),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    setFilterValues(data);
    setIsOpenFilterDrawer(false);
  };

  const clearFilter = () => {
    setFilterValues(null);
    setIsOpenFilterDrawer(false);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    clearFilter,
  };
};
