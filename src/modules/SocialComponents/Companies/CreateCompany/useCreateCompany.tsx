import { useForm } from 'react-hook-form';

const useCreateCompany = () => {
  const methods: any = useForm({});

  const { handleSubmit } = methods;

  const onSubmit = async () => {};
  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useCreateCompany;
