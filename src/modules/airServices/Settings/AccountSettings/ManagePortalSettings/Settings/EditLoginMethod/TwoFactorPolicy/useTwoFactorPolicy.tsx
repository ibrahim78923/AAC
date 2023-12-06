import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import {
  twoFactorPolicyDefaultValues,
  twoFactorPolicyValidationSchema,
} from './TwoFactorPolicy.data';

export const useTwoFactorPolicy = () => {
  const methods: any = useForm<any>({
    resolver: yupResolver(twoFactorPolicyValidationSchema),
    defaultValues: twoFactorPolicyDefaultValues,
  });
  const radioBtnValue = methods?.getValues();
  const defaultDisable = radioBtnValue?.twoFactorPolicy === '';
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setDisable(radioBtnValue?.twoFactorPolicy === 'Don’t Mandate 2FA');
  }, [methods?.watch()]);

  return {
    methods,
    disable,
    defaultDisable,
  };
};
