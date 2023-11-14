import { useForm } from 'react-hook-form';

const useCustomizeCompany = () => {
  const methods: any = useForm({});

  const { handleSubmit } = methods;

  const onSubmit = async () => {};
  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useCustomizeCompany;
