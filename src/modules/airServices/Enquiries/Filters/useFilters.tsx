import { useForm } from 'react-hook-form';
import { IChildModalState } from '../Enquiries.interface';

export const useFilters = ({ setFilter, onClose }: IChildModalState) => {
  const methods = useForm({
    defaultValues: { status: '' },
  });

  const { handleSubmit, reset } = methods;

  const submitEnquiriesFilters = (data: any) => {
    setFilter(data?.status?.toLowerCase());
    onClose?.();
  };

  const resetEnquiriesFilters = () => {
    reset();
    setFilter('');
    onClose?.();
  };

  const statusOptions = ['Done', 'Pending'];

  return {
    handleSubmit,
    submitEnquiriesFilters,
    resetEnquiriesFilters,
    methods,
    statusOptions,
  };
};
export default useFilters;
