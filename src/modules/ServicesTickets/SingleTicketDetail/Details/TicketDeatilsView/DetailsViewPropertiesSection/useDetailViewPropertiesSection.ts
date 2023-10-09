import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './DetailsViewPropeSect.data';
import { useForm } from 'react-hook-form';
export default function useDeatilViewPropertiesSection() {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues,
  });
  const {
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    // console.log(data);
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
  };
}
