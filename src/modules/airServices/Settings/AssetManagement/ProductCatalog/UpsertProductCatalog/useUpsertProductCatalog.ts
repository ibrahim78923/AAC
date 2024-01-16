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
import {
  useGetProductCatalogByIdQuery,
  useLazyGetAssetTypeQuery,
  usePatchProductCatalogMutation,
  usePostProductCatalogMutation,
} from '@/services/airServices/settings/asset-management/product-catalog';
import { useEffect } from 'react';
//TODO: will need to fix data body after integration issue fix.
export const useUpsertProductCatalog = () => {
  const router = useRouter();
  const { productCatalogId } = router?.query;
  const theme: any = useTheme();
  const [postProductCatalogTrigger, postProductCatalogStatus] =
    usePostProductCatalogMutation();
  const [patchProductCatalogTrigger, patchProductCatalogStatus] =
    usePatchProductCatalogMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(upsertProductCatalogValidationSchema),
    defaultValues: upsertProductCatalogDefaultValuesFunction(),
  });

  const getSingleProductCatalogParameter = {
    pathParam: {
      productCatalogId,
    },
  };

  const { data, isLoading, isFetching } = useGetProductCatalogByIdQuery(
    getSingleProductCatalogParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!productCatalogId,
    },
  );

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(() => upsertProductCatalogDefaultValuesFunction(data?.data?.[0]));
  }, [data, reset]);

  const submitUpsertProductCatalog = async (data: any) => {
    const body = {
      ...data,
      assetType: data?.assetType?._id,
    };
    if (!!productCatalogId) {
      submitUpdateProductCatalog(body);
      return;
    }
    const postProductCatalogParameter = {
      body,
    };

    try {
      const response = await postProductCatalogTrigger(
        postProductCatalogParameter,
      )?.unwrap();
      enqueueSnackbar(
        response?.message ?? 'ProductCatalog Added Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      moveBack?.();
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const submitUpdateProductCatalog = async (data: any) => {
    const patchProductCatalogParameter = {
      body: {
        id: productCatalogId,
        ...data,
      },
    };
    try {
      const response = await patchProductCatalogTrigger(
        patchProductCatalogParameter,
      )?.unwrap();
      enqueueSnackbar(
        response?.message ?? 'ProductCatalog Created Successfully!',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      moveBack?.();
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const apiQueryAssetType = useLazyGetAssetTypeQuery();
  const upsertProductCatalogFormFields =
    upsertProductCatalogFormFieldsDynamic(apiQueryAssetType);

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
    postProductCatalogStatus,
    patchProductCatalogStatus,
    isLoading,
    isFetching,
  };
};
