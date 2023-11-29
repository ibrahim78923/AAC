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
import { AIR_SERVICES } from '@/constants';

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
    enqueueSnackbar(
      `Product catalog ${productCatalogId ? 'Updated' : 'Added'} Successfully`,
      {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      },
    );
    reset();
    return;
  };

  const upsertProductCatalogFormFields =
    upsertProductCatalogFormFieldsDynamic();

  const moveBack = () => {
    if (!!productCatalogId) {
      router?.push({
        pathname: AIR_SERVICES?.SINGLE_PRODUCT_CATALOG,
        query: {
          ...router?.query,
        },
      });
      return;
    }
    router?.push({
      pathname: AIR_SERVICES?.PRODUCT_CATALOG,
    });
  };
  return {
    router,
    theme,
    handleSubmit,
    methods,
    upsertProductCatalogFormFields,
    submitUpsertProductCatalog,
    productCatalogId,
    moveBack,
  };
};
