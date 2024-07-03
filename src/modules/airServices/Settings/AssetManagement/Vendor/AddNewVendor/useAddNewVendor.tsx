import { useForm } from 'react-hook-form';
import {
  newVendorDefaultValues,
  newVendorValidationSchema,
} from './AddNewVendor.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetVendorsByIdQuery,
  usePatchNewVendorMutation,
  usePostNewVendorMutation,
} from '@/services/airServices/settings/asset-management/vendor';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';

export const useAddNewVendor = (props: any) => {
  const router = useRouter();
  const { vendorId } = router?.query;
  const { setIsADrawerOpen } = props;

  const [form, setForm] = useState<any>([]);

  const [postNewVendorTrigger, postNewVendorStatus] =
    usePostNewVendorMutation();
  const [patchNewVendorTrigger, patchNewVendorStatus] =
    usePatchNewVendorMutation();

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_VENDOR,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const { data: vinData, isLoading } = useGetVendorsByIdQuery(
    {
      params: {
        id: vendorId,
      },
    },
    {
      skip: !!!vendorId,
      refetchOnMountOrArgChange: true,
    },
  );

  const methodsNewVendor: any = useForm<any>({
    resolver: yupResolver(newVendorValidationSchema?.(form)),
    defaultValues: newVendorDefaultValues?.(),
  });

  const { handleSubmit, reset } = methodsNewVendor;

  useEffect(() => {
    reset(() => newVendorDefaultValues(vinData?.data, form));
  }, [vinData, reset, form]);

  const onSubmit = async (data: any) => {
    const filteredEmptyData: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});

    const customFields: any = {};
    const body: any = {};

    Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
      if (form?.some((field: any) => field?.componentProps?.label === key)) {
        customFields[key] = value;
      } else {
        body[key] = value;
      }
    });

    if (Object?.keys(customFields)?.length > 0) {
      body.customFields = customFields;
    }

    if (!!vendorId) {
      submitUpdateNewVendor(body);
      return;
    }

    try {
      await postNewVendorTrigger({ body })?.unwrap();
      successSnackbar('Vendor Added Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitUpdateNewVendor = async (data: any) => {
    const patchNewVendorParameter = {
      body: {
        id: vendorId,
        ...data,
      },
    };
    try {
      await patchNewVendorTrigger(patchNewVendorParameter)?.unwrap();
      successSnackbar('Vendor Updated Successfully!');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const handleClose = () => {
    setIsADrawerOpen?.(false);
    reset?.();
  };

  return {
    methodsNewVendor,
    newVendorValidationSchema,
    newVendorDefaultValues,
    handleSubmit,
    onSubmit,
    submitUpdateNewVendor,
    isLoading,
    handleClose,
    patchNewVendorStatus,
    postNewVendorStatus,
    getDynamicFieldsStatus,
    form,
  };
};
