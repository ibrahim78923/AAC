import { useForm } from 'react-hook-form';

const useFilterCompany = () => {
  const methods: any = useForm({});

  const { handleSubmit } = methods;

  const onSubmit = async () => {};
  return { methods, handleSubmit, onSubmit };
};

export default useFilterCompany;
