import {
  useGetDealPipeLineQuery,
  usePostDealsMutation,
} from '@/services/airSales/deals';
import {
  createDealData,
  defaultValues,
  validationSchema,
} from './CreateDeal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { ASSOCIATIONS_API_PARAMS_FOR, indexNumbers } from '@/constants';
import { useEffect, useState } from 'react';
import { usePostAssociationCompaniesMutation } from '@/services/commonFeatures/companies';
import { errorSnackbar, filteredEmptyValues } from '@/utils/api';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useForm } from 'react-hook-form';

const useCreateDeal = () => {
  const [form, setForm] = useState<any>([]);

  const [postDeals, { isLoading: isCreateDealLodaing }] =
    usePostDealsMutation();
  const [postAssociation, { isLoading: createAssociationDealsLoading }] =
    usePostAssociationCompaniesMutation();
  const { data: dealPipelines } = useGetDealPipeLineQuery({ meta: false });

  const defaultPipelineData = dealPipelines?.data?.find(
    (item: any) => item?.isDefault,
  );

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SALES,
      moduleType: DYNAMIC_FIELDS?.MT_DEALS,
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

  const methods: any = useForm<any>({
    resolver: yupResolver(validationSchema(form)),
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;

  useEffect(() => {
    setValue('dealPipelineId', defaultPipelineData);
  }, [dealPipelines?.data]);

  const dealPipelineId = watch('dealPipelineId');

  const [postAttachmentTrigger] = usePostDynamicFormAttachmentsMutation();

  const onSubmit = async (data: any) => {
    data.dealPipelineId = data?.dealPipelineId?._id;
    data.ownerId = data?.ownerId?._id;
    data.amount = Number(data?.amount);

    const updatedProducts =
      data?.products?.map((item: string) => ({
        productId: item,
        quantity: 1,
        unitDiscount: 0,
      })) || [];

    data.products = updatedProducts;
    const filteredEmptyData = filteredEmptyValues(data);

    const customFields: any = {};
    const body: any = {};
    const attachmentPromises: Promise<any>[] = [];

    try {
      dynamicAttachmentsPost({
        form,
        data,
        attachmentPromises,
        customFields,
        postAttachmentTrigger,
      });

      await Promise?.all(attachmentPromises);

      const customFieldKeys = new Set(
        form?.map((field: any) => field?.componentProps?.label),
      );

      Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
        if (customFieldKeys?.has(key)) {
          if (value instanceof Date) {
            value = value?.toISOString();
          }
          if (
            typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
            !Array?.isArray(value) &&
            value !== null
          ) {
            customFields[key] = { ...customFields[key], ...value };
          } else {
            customFields[key] = value;
          }
        } else {
          body[key] = value;
        }
      });

      if (Object?.keys(customFields)?.length > indexNumbers?.ZERO) {
        body.customFields = customFields;
      }

      const response = await postDeals({ body: body })?.unwrap();
      if (response?.data) {
        try {
          const associationPayload = {
            recordId: response?.data?._id,
            recordType: ASSOCIATIONS_API_PARAMS_FOR?.DEALS,
            operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
          };
          await postAssociation({ body: associationPayload })?.unwrap();
          enqueueSnackbar('Deal created successfully', { variant: 'success' });
        } catch (error: any) {
          const errMsg = error?.data?.message;
          enqueueSnackbar(errMsg ?? 'Error occurred', {
            variant: NOTISTACK_VARIANTS?.ERROR,
          });
        }
      }
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };
  const dealDataArray = createDealData({ dealPipelineId });

  return {
    form,
    methods,
    dealDataArray,
    onSubmit,
    handleSubmit,
    isCreateDealLodaing,
    createAssociationDealsLoading,
    dealPipelines,
    defaultPipelineData,
    getDynamicFieldsStatus,
    getDynamicFormData,
  };
};

export default useCreateDeal;
