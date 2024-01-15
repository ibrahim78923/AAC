import { useForm } from 'react-hook-form';
import { softwareFilterDefaultValues } from './SoftwareFilter.data';

export const useSoftwareFilter = (props: any) => {
  const { setIsOpenFilterDrawer, setFilterValues } = props;

  const methods = useForm({
    defaultValues: softwareFilterDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    setFilterValues(data);
    setIsOpenFilterDrawer(false);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};
