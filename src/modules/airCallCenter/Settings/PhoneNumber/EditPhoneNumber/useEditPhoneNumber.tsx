import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  propertiesDefaultValues,
  propertiesValidationSchema,
} from './Properties/Properties.data';

const useEditPhoneNumber = () => {
  const methods: any = useForm({
    resolver: yupResolver(propertiesValidationSchema),
    defaultValues: propertiesDefaultValues,
  });

  return {
    methods,
  };
};

export default useEditPhoneNumber;
