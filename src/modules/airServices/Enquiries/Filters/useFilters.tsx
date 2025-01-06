import { IChildModalState } from '../Enquiries.interface';
import { useFormLib } from '@/hooks/useFormLib';

export const useFilters = ({ setFilter, onClose }: IChildModalState) => {
  const { methods, reset, handleSubmit } = useFormLib({
    defaultValues: { status: '' },
  });

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
