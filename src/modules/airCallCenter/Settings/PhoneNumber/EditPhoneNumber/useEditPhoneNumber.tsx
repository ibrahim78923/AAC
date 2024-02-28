import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  propertiesDefaultValues,
  propertiesValidationSchema,
} from './Properties/Properties.data';
import { useState } from 'react';

const useEditPhoneNumber = () => {
  const [callerIds, setcallerIds] = useState([]);

  const methods: any = useForm({
    resolver: yupResolver(propertiesValidationSchema),
    defaultValues: propertiesDefaultValues,
  });
  const { watch } = methods;
  const maskValue = watch('maskNumber');

  return {
    methods,
    maskValue,
    callerIds,
    setcallerIds,
  };
};

export default useEditPhoneNumber;
