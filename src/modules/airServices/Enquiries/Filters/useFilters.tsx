import { useForm } from 'react-hook-form';

export default function useFilters({ setFilter, onClose }: any) {
  const methods: any = useForm({
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
