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
  useCreateAssociationQuoteMutation,
  useGetDealsQuery,
  useGetQuoteByIdQuery,
  // usePostAddbuyerInfoMutation,
  useUpdateQuoteMutation,
} from '@/services/airSales/quotes';
import { AIR_SALES } from '@/routesConstants/paths';

const useUpdateQuote = () => {
  const router = useRouter();
  let quoteId;
  if (router.query?.data) {
    quoteId = router.query?.data;
  }
  // const id = router?.query?.data;
  // console.log(quoteId, 'quoteIdquoteIdquoteIdquoteId');
  const [createAssociationQuote] = useCreateAssociationQuoteMutation();

  const { data: dataGetDeals } = useGetDealsQuery({ page: 1, limit: 100 });
  const { data: dataGetQuoteById } = useGetQuoteByIdQuery({ id: quoteId });

  // const [postAddbuyerInfo] = usePostAddbuyerInfoMutation();
  const methodsUpdateQuote = useForm<any>({
    resolver: yupResolver(dealValidationSchema),
    defaultValues: dealInitValues,
  });

  const { watch: watchDetail, trigger, handleSubmit } = methodsUpdateQuote;
  const detailsValues = watchDetail();
  const singleQuote = dataGetQuoteById?.data;

  useEffect(() => {
    if (singleQuote) {
      const { dealId, template, name, expiryDate, notes, termsAndConditions } =
        singleQuote;
      const dateObject: any = new Date(expiryDate);
      methodsUpdateQuote.setValue('dealId', dealId);
      methodsUpdateQuote.setValue('template', template);
      methodsUpdateQuote.setValue('name', name);
      methodsUpdateQuote.setValue('expiryDate', dateObject);
      methodsUpdateQuote.setValue('notes', notes);
      methodsUpdateQuote.setValue('termsAndConditions', termsAndConditions);
    }
  }, [singleQuote]);

  const onSubmit = async () => {
    enqueueSnackbar('Form Submitted', {
      variant: 'success',
    });
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const [activeStep, setActiveStep] = useState(1);
  const [isOpenFormCreateDeal, setIsOpenFormCreateDeal] = useState(false);
  const [isOpenFormAddContact, setIsOpenFormAddContact] = useState(false);
  const [isOpenFormAddCompany, setIsOpenFormAddCompany] = useState(false);
  const [isOpenFormCreateProduct, setIsOpenFormCreateProduct] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const handleStepNext = async () => {
    setActiveStep((prev) => prev + 1);
  };
  const handleStepBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const handleStepperCancel = () => {
    router.push(AIR_SALES?.QUOTES);
  };

  // Update Deal & Details
  const [updateQuote, { isLoading: loadingUpdateQuote }] =
    useUpdateQuoteMutation();
  const { handleSubmit: handleMethodUpdateQuote } = methodsUpdateQuote;
  const onSubmitEditQuote = async (values: any) => {
    try {
      await updateQuote({ id: router?.query?.data, body: values })?.unwrap();

      enqueueSnackbar('Deal & Details updated successfully', {
        variant: 'success',
      });
      handleStepNext();
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const handleEditQuoteSubmit = handleMethodUpdateQuote(onSubmitEditQuote);

  const handleUpdateDetails = async () => {
    let isValid = false;
    if (activeStep === 0) {
      const isDealIDValid = await trigger('dealId');
      const isTemplateValid = await trigger('template');
      const isNameValid = await trigger('name');
      const isDateValid = await trigger('expiryDate');
      isValid = isDealIDValid && isTemplateValid && isNameValid && isDateValid;
      if (isValid) {
        await handleEditQuoteSubmit();
      }
    }
    // if(activeStep === 1){
    //   // await postAddbuyerInfo(body:)
    // }
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
    methodsUpdateQuote,
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
    loadingUpdateQuote,
    createAssociationQuote,
  };
};

export default useUpdateQuote;
