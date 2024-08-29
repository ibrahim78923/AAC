import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import StepDeal from './StepDeal';
import { dealInitValues, dealValidationSchema } from './CreateQuote.data';
import {
  useGetDealsQuery,
  usePostQuoteMutation,
} from '@/services/airSales/quotes';
import { AIR_SALES } from '@/routesConstants/paths';
import { PAGINATION } from '@/config';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import { errorSnackbar, filteredEmptyValues } from '@/utils/api';
const useCreateQuote = () => {
  const router = useRouter();
  const getDealsParams = {
    page: PAGINATION?.PAGE_COUNT,
    limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
  };
  const { data: dataGetDeals } = useGetDealsQuery({ params: getDealsParams });

  const [form, setForm] = useState<any>([]);

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SALES,
      moduleType: DYNAMIC_FIELDS?.MT_QUOTE,
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

  const methodsAddQuote = useForm<any>({
    resolver: yupResolver(dealValidationSchema(form)),
    defaultValues: dealInitValues,
  });

  const { watch, trigger } = methodsAddQuote;

  const watchFields = watch();
  const { handleSubmit: handleMethodAddQuote, reset: resetAddQuoteForm } =
    methodsAddQuote;

  const [postAddQuote, { isLoading: loadingAddQuote }] = usePostQuoteMutation();

  const onSubmitCreateQuote = async (data: any) => {
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

      if (Object?.keys(customFields)?.length > 0) {
        body.customFields = customFields;
      }

      const response = await postAddQuote({ body: body })?.unwrap();
      const id = response?.data?._id;
      enqueueSnackbar('Quote added successfully', {
        variant: 'success',
      });
      resetAddQuoteForm();
      router.push({ pathname: AIR_SALES?.UPDATE_QUOTE, query: { data: id } });
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const handleAddQuoteSubmit = handleMethodAddQuote(onSubmitCreateQuote);

  const [activeStep, setActiveStep] = useState(0);
  const [isOpenFormCreateDeal, setIsOpenFormCreateDeal] = useState(false);

  const handleStepNext = async () => {
    let isValid = false;
    if (activeStep === 0) {
      await handleAddQuoteSubmit();
      const isDealIDValid = await trigger('dealId');
      const isTemplateValid = await trigger('template');
      const isNameValid = await trigger('name');
      const isDateValid = await trigger('expiryDate');
      isValid = isDealIDValid && isTemplateValid && isNameValid && isDateValid;
    } else if (activeStep === 1) {
    } else {
      isValid = true;
    }

    if (isValid) {
      setActiveStep((prev: any) => prev + 1);
    }
  };
  const handleStepBack = () => {
    setActiveStep((prev: any) => prev - 1);
  };
  const handleStepperCancel = () => {
    router?.push(AIR_SALES?.QUOTES);
  };

  const handleOpenFormCreateDeal = () => {
    setIsOpenFormCreateDeal(true);
  };
  const handleCloseFormCreateDeal = () => {
    setIsOpenFormCreateDeal(false);
  };

  const createQuoteSteps = [
    {
      key: 'deal',
      label: 'Deal & Details',
      component: (
        <StepDeal
          openCreateDeal={handleOpenFormCreateDeal}
          values={watchFields}
          methods={methodsAddQuote}
          form={form}
          getDynamicFieldsStatus={getDynamicFieldsStatus}
        />
      ),
    },
    {
      key: 'buyerInfo',
      label: 'Buyer Info',
      component: <>Buyer Info</>,
    },
    {
      key: 'yourInfo',
      label: 'Your Info',
      component: <>Your Info</>,
    },
    {
      key: 'lineItems',
      label: 'Line Items',
      component: <>Line Items</>,
    },
    {
      key: 'signature',
      label: 'Signature',
      component: <>Signature</>,
    },
    {
      key: 'review',
      label: 'Review',
      component: <>Review</>,
    },
  ];

  return {
    dataGetDeals,
    methodsAddQuote,
    createQuoteSteps,
    activeStep,
    handleStepNext,
    handleStepBack,
    handleStepperCancel,
    handleAddQuoteSubmit,
    isOpenFormCreateDeal,
    setIsOpenFormCreateDeal,
    handleOpenFormCreateDeal,
    handleCloseFormCreateDeal,
    loadingAddQuote,
    getDynamicFieldsStatus,
    form,
  };
};

export default useCreateQuote;
