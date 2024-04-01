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
  useDeleteCompaniesMutation,
  useDeleteContactsMutation,
  useGetDealsQuery,
  useGetQuoteByIdQuery,
  useGetTaxCalculationsQuery,
  usePostAddbuyerInfoMutation,
  usePutSubmitQuoteMutation,
  // usePostAddbuyerInfoMutation,
  useUpdateQuoteMutation,
  useUpdateSubmitEmailQuoteMutation,
} from '@/services/airSales/quotes';
import { AIR_SALES } from '@/routesConstants/paths';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { PAGINATION } from '@/config';

const useUpdateQuote = () => {
  const router = useRouter();
  let quoteId: any;
  if (router?.query?.data) {
    quoteId = router?.query?.data;
  }
  const param = {
    applyOn: 'quotes',
  };
  const { data: taxCalculation } = useGetTaxCalculationsQuery(param);

  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const [createAssociationQuote] = useCreateAssociationQuoteMutation();
  const { data: dataGetDeals } = useGetDealsQuery({
    page: page,
    limit: pageLimit,
  });
  const { data: dataGetQuoteById } = useGetQuoteByIdQuery({ id: quoteId });
  const [deleteCompaniesMutation, { isLoading: isCompanyDeleteLoading }] =
    useDeleteCompaniesMutation();
  const [deleteContacts, { isLoading: isContactDeleteLoading }] =
    useDeleteContactsMutation();
  const [putSubmitQuote] = usePutSubmitQuoteMutation();
  const [updateSubmitEmailQuote] = useUpdateSubmitEmailQuoteMutation();

  const [selectedBuyerContactIds, setSelectedBuyerContactIds] = useState<
    string | null
  >('');
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string | null>(
    '',
  );

  const [deleteModalId, setDeleteModal] = useState<string | null>(null);
  const handleDeleteModal = (id: string | null) => {
    setDeleteModal(id);
  };
  const [deleteContactModalId, setDeleteContactModalId] = useState<
    string | null
  >(null);
  const handleContactDeleteModal = (id: string | null) => {
    setDeleteContactModalId(id);
  };

  const handleBuyerContactChange = (id: any) => {
    setSelectedBuyerContactIds(selectedBuyerContactIds === id ? null : id);
  };

  const handleCompanyChange = (id: any) => {
    setSelectedCompanyIds(selectedCompanyIds === id ? null : id);
  };

  const [postAddbuyerInfo] = usePostAddbuyerInfoMutation();
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
    try {
      putSubmitQuote({
        id: quoteId,
        body: { id: quoteId, isSubmitted: false },
      });
      enqueueSnackbar('Save as draft submit later', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`Something went wrong`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleSubmitBtn = async () => {
    try {
      putSubmitQuote({
        body: { id: quoteId, isSubmitted: true },
      });
      enqueueSnackbar('Save as draft submit later', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`Something went wrong`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleDeleteCompanies = async () => {
    try {
      await deleteCompaniesMutation(deleteModalId)?.unwrap();
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
      setSelectedCompanyIds(null);
      handleDeleteModal(null);
      // setIsActionsDisabled(true);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const handleDeleteContacts = async () => {
    try {
      await deleteContacts({ contactIds: [deleteContactModalId] })?.unwrap();
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
      setDeleteContactModalId(null);
      // setIsActionsDisabled(true);
      handleContactDeleteModal(null);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const [activeStep, setActiveStep] = useState(1);
  const [isOpenFormCreateDeal, setIsOpenFormCreateDeal] = useState(false);
  const [isOpenFormAddContact, setIsOpenFormAddContact] = useState(false);
  const [isOpenFormAddCompany, setIsOpenFormAddCompany] = useState(false);
  const [isOpenFormCreateProduct, setIsOpenFormCreateProduct] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleStepNext = async () => {
    // const input: any = document.getElementById('pdf-content');
    // Specify the id of the element you want to convert to PDF
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF();
    //   pdf?.addImage(imgData, 'PNG', 0, 0);
    //   pdf.save('downloaded-file.pdf');
    //   // Specify the name of the downloaded PDF file
    // });

    setActiveStep((prev: any) => prev + 1);
  };
  const handleStepBack = () => {
    setActiveStep((prev: any) => prev - 1);
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
    if (activeStep === 1) {
      try {
        await postAddbuyerInfo({
          body: {
            id: quoteId,
            buyerContactId: selectedBuyerContactIds && selectedBuyerContactIds,
            buyerCompanyId: selectedCompanyIds && selectedCompanyIds,
          },
        })?.unwrap();
        enqueueSnackbar('Buyer Info updated successfully', {
          variant: 'success',
        });

        handleStepNext();
      } catch (error: any) {
        enqueueSnackbar('An error occured', {
          variant: 'error',
        });
      }
    }
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
    handleBuyerContactChange,
    selectedBuyerContactIds,
    handleCompanyChange,
    selectedCompanyIds,
    disabledSaveAndContinueBtn: Boolean(
      selectedBuyerContactIds && selectedCompanyIds,
    ),
    handleDeleteCompanies,
    // isLoading,
    handleDeleteModal,
    deleteModalId,
    isCompanyDeleteLoading,
    handleDeleteContacts,
    isContactDeleteLoading,
    handleContactDeleteModal,
    deleteContactModalId,
    handleSubmitBtn,
    setPage,
    setPageLimit,
    updateSubmitEmailQuote,
    quoteId,
    taxCalculation,
  };
};

export default useUpdateQuote;
