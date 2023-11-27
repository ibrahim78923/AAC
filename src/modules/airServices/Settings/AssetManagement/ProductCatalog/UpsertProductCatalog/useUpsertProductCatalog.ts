import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertProductCatalogDefaultValuesFunction,
  upsertProductCatalogFormFieldsDynamic,
  upsertProductCatalogValidationSchema,
} from './UpsertProductCatalog.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useUpsertProductCatalog = () => {
  const router = useRouter();
  const { productCatalogId } = router?.query;
  const theme: any = useTheme();
  const methods: any = useForm<any>({
    resolver: yupResolver(upsertProductCatalogValidationSchema),
    defaultValues: upsertProductCatalogDefaultValuesFunction(),
  });

  const { handleSubmit, reset } = methods;

  const submitUpsertProductCatalog = async () => {
    enqueueSnackbar('Product catalog Added Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
    return;
  };

  const upsertProductCatalogFormFields =
    upsertProductCatalogFormFieldsDynamic();
  return {
    router,
    theme,
    handleSubmit,
    methods,
    upsertProductCatalogFormFields,
    submitUpsertProductCatalog,
    productCatalogId,
  };
};
