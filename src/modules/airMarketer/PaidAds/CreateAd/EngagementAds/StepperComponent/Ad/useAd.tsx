import { useTheme } from '@mui/material';
import { AdDefaultValues, AdValidation } from './Ad.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const useAd = () => {
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(AdValidation),
    defaultValues: AdDefaultValues,
  });

  const { watch } = methods;
  const isNewAdValue = watch('creative') ? watch('creative') : 'existingAd';

  return {
    theme,
    methods,
    isNewAdValue,
  };
};

export default useAd;
