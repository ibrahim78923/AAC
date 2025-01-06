import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  upsertProductCatalogDefaultValuesFunction,
  upsertProductCatalogFormFieldsDynamic,
  upsertProductCatalogValidationSchema,
} from './UpsertProductCatalog.data';
import { AIR_SERVICES } from '@/constants/routes';
import {
  useGetProductCatalogByIdQuery,
  usePatchProductCatalogMutation,
  usePostProductCatalogMutation,
} from '@/services/airServices/settings/asset-management/product-catalog';
import { useEffect } from 'react';
import { filteredEmptyValues } from '@/utils/api';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertProductCatalog = () => {
  const router = useRouter();
  const { productCatalogId } = router?.query;
  const theme: any = useTheme();
  const [postProductCatalogTrigger, postProductCatalogStatus] =
    usePostProductCatalogMutation();
  const [patchProductCatalogTrigger, patchProductCatalogStatus] =
    usePatchProductCatalogMutation();
  const { methods, reset, handleSubmit } = useFormLib({
    validationSchema: upsertProductCatalogValidationSchema,
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

  useEffect(() => {
    reset(() => upsertProductCatalogDefaultValuesFunction(data?.data?.[0]));
  }, [data, reset]);

  const submitUpsertProductCatalog = async (formData: any) => {
    const newFormData = filteredEmptyValues(formData);
    const body = {
      ...newFormData,
      assetType: newFormData?.assetType?._id,
    };

    if (!!productCatalogId) {
      submitUpdateProductCatalog(body);
      return;
    }
    const postProductCatalogParameter = {
      body,
    };

    try {
      await postProductCatalogTrigger(postProductCatalogParameter)?.unwrap();
      successSnackbar('Product catalog added successfully');
      moveBack?.();
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateProductCatalog = async (formData: any) => {
    const patchProductCatalogParameter = {
      body: {
        id: productCatalogId,
        ...formData,
      },
    };
    try {
      await patchProductCatalogTrigger(patchProductCatalogParameter)?.unwrap();
      successSnackbar('Product catalog updated successfully!');
      moveBack?.();
      reset();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
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
    postProductCatalogStatus,
    patchProductCatalogStatus,
    isLoading,
    isFetching,
  };
};
