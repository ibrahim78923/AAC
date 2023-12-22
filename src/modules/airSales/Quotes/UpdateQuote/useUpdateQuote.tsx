import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  dealInitValues,
  dealValidationSchema,
  signatureInitValues,
} from './UpdateQuote.data';
import {
  useGetDealsQuery,
  usePostQuoteMutation,
  useGetQuoteByIdQuery,
} from '@/services/airSales/quotes';
import { AIR_SALES } from '@/routesConstants/paths';

const useUpdateQuote = () => {
  const router = useRouter();

  const { data: dataGetDeals } = useGetDealsQuery({ page: 1, limit: 100 });

  const { data: dataGetQuoteById } = useGetQuoteByIdQuery(router?.query?.data);

  const methodsAddQuote = useForm({
    resolver: yupResolver(dealValidationSchema),
    defaultValues: dealInitValues,
  });

  const { watch: watchDetail, trigger, handleSubmit } = methodsAddQuote;
  const detailsValues = watchDetail();

  const singleQuote = dataGetQuoteById?.data['0'];

  useEffect(() => {
    if (singleQuote) {
      const { dealId, template, name, expiryDate, notes, termsAndConditions } =
        singleQuote;
      const dateObject: any = new Date(expiryDate);
      methodsAddQuote.setValue('dealId', dealId);
      methodsAddQuote.setValue('template', template);
      methodsAddQuote.setValue('name', name);
      methodsAddQuote.setValue('expiryDate', dateObject);
      methodsAddQuote.setValue('notes', notes);
      methodsAddQuote.setValue('termsAndConditions', termsAndConditions);
    }
  }, [singleQuote]);

  const onSubmit = async () => {
    enqueueSnackbar('Form Submitted', {
      variant: 'success',
    });
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  // Step add deal / Create Quote
  const { handleSubmit: handleMethodAddQuote } = methodsAddQuote;
  const [postAddQuote, { isLoading: loadingAddQuote }] = usePostQuoteMutation();
  const onSubmitCreateQuote = async (values: any) => {
    try {
      await postAddQuote({ body: values })?.unwrap();
      enqueueSnackbar('Quote added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleAddQuoteSubmit = handleMethodAddQuote(onSubmitCreateQuote);

  const [activeStep, setActiveStep] = useState(1);
  const [isOpenFormCreateDeal, setIsOpenFormCreateDeal] = useState(false);
  const [isOpenFormAddContact, setIsOpenFormAddContact] = useState(false);
  const [isOpenFormAddCompany, setIsOpenFormAddCompany] = useState(false);
  const [isOpenFormCreateProduct, setIsOpenFormCreateProduct] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleUpdateDetails = async () => {
    let isValid = false;
    if (activeStep === 0) {
      await handleAddQuoteSubmit();
      const isDealIDValid = await trigger('dealId');
      const isTemplateValid = await trigger('template');
      const isNameValid = await trigger('name');
      const isDateValid = await trigger('expiryDate');
      isValid = isDealIDValid && isTemplateValid && isNameValid && isDateValid;
    }

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleStepNext = async () => {
    setActiveStep((prev) => prev + 1);
  };
  const handleStepBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const handleStepperCancel = () => {
    router.push(AIR_SALES?.QUOTES);
  };

  const handleOpenFormCreateDeal = () => {
    setIsOpenFormCreateDeal(true);
  };
  const handleCloseFormCreateDeal = () => {
    setIsOpenFormCreateDeal(false);
  };

  const handleOpenFormAddContact = () => {
    setIsOpenFormAddContact(true);
  };
  const handleCloseFormAddContact = () => {
    setIsOpenFormAddContact(false);
  };

  const handleOpenFormAddCompany = () => {
    setIsOpenFormAddCompany(true);
  };
  const handleCloseFormAddCompany = () => {
    setIsOpenFormAddCompany(false);
  };

  const handleOpenFormCreateProduct = () => {
    setIsOpenFormCreateProduct(true);
  };
  const handleCloseFormCreateProduct = () => {
    setIsOpenFormCreateProduct(false);
  };

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  // Step Signature
  const methodsSignature = useForm({
    defaultValues: signatureInitValues,
  });

  return {
    dataGetQuoteById,
    dataGetDeals,
    methodsAddQuote,
    detailsValues,
    activeStep,
    handleStepNext,
    handleStepBack,
    handleStepperCancel,
    handleFormSubmit,
    isOpenFormCreateDeal,
    setIsOpenFormCreateDeal,
    handleOpenFormCreateDeal,
    handleCloseFormCreateDeal,
    isOpenFormAddContact,
    handleOpenFormAddContact,
    handleCloseFormAddContact,
    isOpenFormAddCompany,
    handleOpenFormAddCompany,
    handleCloseFormAddCompany,
    isOpenFormCreateProduct,
    handleOpenFormCreateProduct,
    handleCloseFormCreateProduct,
    handleOpenDialog,
    handleCloseDialog,
    isOpenDialog,
    methodsSignature,
    handleUpdateDetails,
    loadingAddQuote,
  };
};

export default useUpdateQuote;
