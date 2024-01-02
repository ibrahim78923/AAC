import { useState } from 'react';
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
const useCreateQuote = () => {
  const router = useRouter();
  const { data: dataGetDeals } = useGetDealsQuery({ page: 1, limit: 20 });
  const methodsAddQuote = useForm({
    resolver: yupResolver(dealValidationSchema),
    defaultValues: dealInitValues,
  });
  const { watch, trigger } = methodsAddQuote;
  const watchFields = watch();

  // Step add deal / Create Quote
  const { handleSubmit: handleMethodAddQuote, reset: resetAddQuoteForm } =
    methodsAddQuote;

  const [postAddQuote, { isLoading: loadingAddQuote }] = usePostQuoteMutation();
  const onSubmitCreateQuote = async (values: any) => {
    try {
      const response = await postAddQuote({ body: values })?.unwrap();
      const id = response?.data?._id;
      enqueueSnackbar('Quote added successfully', {
        variant: 'success',
      });
      resetAddQuoteForm();
      router.push({ pathname: AIR_SALES?.UPDATE_QUOTE, query: { data: id } });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
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
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleStepBack = () => {
    setActiveStep((prev) => prev - 1);
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
  };
};

export default useCreateQuote;
