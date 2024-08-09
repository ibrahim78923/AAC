import { useForm } from 'react-hook-form';
import { IChildModalState } from '../Enquiries.interface';

export default function useFilters({ setFilter, onClose }: IChildModalState) {
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

  return {
    handleSubmit,
    submitEnquiriesFilters,
    resetEnquiriesFilters,
    methods,
  };
}
