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
  useDeleteQuoteCompaniesMutation,
  useDeleteContactsMutation,
  useGetDealsQuery,
  useGetQuoteByIdQuery,
  useGetTaxCalculationsQuery,
  usePostAddbuyerInfoMutation,
  usePostManageAssociateMutation,
  usePutSubmitQuoteMutation,
  useUpdateQuoteMutation,
  useUpdateSubmitEmailQuoteMutation,
} from '@/services/airSales/quotes';
import { AIR_SALES, quoteStatus } from '@/routesConstants/paths';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { PAGINATION } from '@/config';
import { indexNumbers } from '@/constants';

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
  const { data: dataGetQuoteById, isLoading: BuyerInfoLoading } =
    useGetQuoteByIdQuery({ id: quoteId });
  const [deleteCompaniesMutation, { isLoading: isCompanyDeleteLoading }] =
    useDeleteQuoteCompaniesMutation();
  const [deleteContacts, { isLoading: isContactDeleteLoading }] =
    useDeleteContactsMutation();

  const [putSubmitQuote, { isLoading: loadingSubmit }] =
    usePutSubmitQuoteMutation();

  const [updateSubmitEmailQuote] = useUpdateSubmitEmailQuoteMutation();

  const [selectedBuyerContactIds, setSelectedBuyerContactIds] = useState<
    string | null
  >('');

  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string | null>(
    '',
  );

  const activeCompanyId = dataGetQuoteById?.data?.buyerCompanyId;
  const activeContactId = dataGetQuoteById?.data?.buyerContactId;

  const [loyalityCalculation, setLoyalityCalculation] = useState<any>({
    rewardsDiscount: [],
    vouchersDiscount: [],
    giftCardDiscount: [],
    totalRedeamDiscount: dataGetQuoteById?.data?.loyaltyRedeemedDiscount,
  });

  useEffect(() => {
    setSelectedCompanyIds(activeCompanyId && activeCompanyId);
    setSelectedBuyerContactIds(activeContactId && activeContactId);
  }, [dataGetQuoteById]);

  const [deleteModalId, setDeleteModal] = useState<string | null>(null);
  const handleDeleteModal = (id: string | null) => {
    setDeleteModal(id);
  };
  const [deleteContactModalId, setDeleteContactModalId] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState({
    contactsModal: { isToggle: false, id: '' },
    companyModal: { isToggle: false, id: '' },
  });
  const handleContactDeleteModal = (id: string | null) => {
    setDeleteContactModalId(id);
  };

  const handleBuyerContactChange = (id: any) => {
    setSelectedBuyerContactIds(selectedBuyerContactIds === id ? null : id);
  };

  const handleCompanyChange = (id: any) => {
    setSelectedCompanyIds(selectedCompanyIds === id ? null : id);
  };

  const [postAddbuyerInfo, { isLoading: updateBuyerInfoLoading }] =
    usePostAddbuyerInfoMutation();
  const [postManageAssociate, { isLoading: postManageLoading }] =
    usePostManageAssociateMutation();
  const methodsUpdateQuote = useForm<any>({
    resolver: yupResolver(dealValidationSchema),
    defaultValues: dealInitValues,
  });

  const { watch: watchDetail, trigger, handleSubmit } = methodsUpdateQuote;
  const detailsValues = watchDetail();
  const singleQuote = dataGetQuoteById?.data;

  const [productsArray, setProductsArray] = useState([]);

  useEffect(() => {
    if (singleQuote) {
      setProductsArray(singleQuote?.products);
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

  const totalAdditionalPrice = productsArray?.reduce(
    (accumulator: number, currentValue: any) => {
      const additionalQuantity = currentValue?.additionalQuantity || 0;
      const unitPrice = currentValue?.unitPrice || 0;
      const unitDiscount = currentValue?.unitDiscount || 0;

      const totalPrice =
        additionalQuantity !== 0
          ? unitPrice * additionalQuantity - additionalQuantity * unitDiscount
          : 0;

      return accumulator + totalPrice;
    },
    0,
  );

  const unitDiscount = productsArray?.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator +
      (currentValue?.unitDiscount * currentValue?.additionalQuantity || 0),
    0,
  );
  const totalDiscount = unitDiscount || 0;
  const updateRedeamDiscount = loyalityCalculation?.totalRedeamDiscount
    ? loyalityCalculation?.totalRedeamDiscount
    : dataGetQuoteById?.data?.loyaltyRedeemedDiscount;

  const sum =
    totalAdditionalPrice +
    singleQuote?.dealAmount -
    (totalDiscount + (updateRedeamDiscount ? updateRedeamDiscount : 0));

  const total = (taxCalculation?.data / 100) * sum + sum;
  const FinalTotal = parseFloat(total?.toFixed(2));

  const calculations = {
    calculationsArray: [
      { name: 'Deal Amount', amount: singleQuote?.dealAmount },
      { name: 'Additional Amount', amount: totalAdditionalPrice },
      { name: 'Total Discount', amount: unitDiscount?.toFixed(1) },
      {
        name: 'Redeam Discount',
        amount: updateRedeamDiscount?.toFixed(1) ?? 0,
      },
      { name: 'Sub Total', amount: sum?.toFixed(1) },
      { name: 'Tax', amount: `${taxCalculation?.data} %` },
      // { name: 'taxAmount', amount: taxCalculation?.data },
    ],
    finalTotal: FinalTotal,
  };

  const handleLoyalityCalulation = (
    reward: any,
    vouchers: any,
    giftcard: any,
    totalRedeam: any,
    subTotal: any,
  ) => {
    setLoyalityCalculation({
      ...loyalityCalculation,
      rewardsDiscount: reward,
      vouchersDiscount: vouchers,
      giftCardDiscount: giftcard,
      totalRedeamDiscount: totalRedeam,
      subTotal: subTotal,
    });
  };

  const onSubmit = async () => {
    try {
      await putSubmitQuote({
        id: quoteId,
        body: {
          id: quoteId,
          status: quoteStatus?.draft,
          products: productsArray,
          dealAmount: singleQuote?.dealAmount?.dealAmount,
          subTotal: sum,
          invoiceDiscount: 2,
          tax: taxCalculation?.data,
          total: FinalTotal,
          loyaltyRewards: loyalityCalculation?.rewardsDiscount,
          loyaltyGiftCards: loyalityCalculation?.giftCardDiscount[0],
          loyaltyVouchers: loyalityCalculation?.vouchersDiscount[0],
          loyaltyRedeemedDiscount: loyalityCalculation?.totalRedeamDiscount,
        },
      })?.unwrap();
      enqueueSnackbar('Save as draft submit later', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      router?.push(AIR_SALES?.QUOTES);
    } catch (error) {
      enqueueSnackbar(`Something went wrong`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleSubmitBtn = async () => {
    const status = quoteStatus?.published;
    try {
      putSubmitQuote({
        body: { id: quoteId, status: status },
      });
      enqueueSnackbar('Save as draft submit later', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
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
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const handleManageAssociationCompanies = async (
    contactId?: any,
    companyId?: any,
  ) => {
    const param: any = {
      recordId: dataGetQuoteById?.data?.dealId,
      recordType: 'deals',
      operation: 'REMOVE',
    };
    if (contactId?.length > indexNumbers?.ZERO) {
      param.contactsIds = [contactId];
    } else if (companyId?.length > indexNumbers?.ZERO) {
      param.companiesIds = [companyId];
    }
    try {
      await postManageAssociate({ body: param })?.unwrap();
      enqueueSnackbar('Record has been deleted.', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsModalOpen({
        contactsModal: { isToggle: false, id: '' },
        companyModal: { isToggle: false, id: '' },
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleDeleteSubmitBtn = () => {
    const contactId = isModalOpen?.contactsModal?.id;
    const companyId = isModalOpen?.companyModal?.id;

    if (contactId) {
      handleManageAssociationCompanies(contactId, undefined);
    } else if (companyId) {
      handleManageAssociationCompanies(undefined, companyId);
    }
  };

  const handleDeleteContacts = async () => {
    try {
      await deleteContacts({ contactId: deleteContactModalId })?.unwrap();
      enqueueSnackbar('Record has been deleted.', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setDeleteContactModalId(null);
      handleContactDeleteModal(null);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: NOTISTACK_VARIANTS?.ERROR,
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
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      handleStepNext();
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: NOTISTACK_VARIANTS?.ERROR,
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
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });

        handleStepNext();
      } catch (error: any) {
        enqueueSnackbar('An error occured', {
          variant: NOTISTACK_VARIANTS?.ERROR,
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
    loadingSubmit,
    setSelectedCompanyIds,
    BuyerInfoLoading,
    updateBuyerInfoLoading,
    postManageLoading,
    postManageAssociate,
    handleManageAssociationCompanies,
    isModalOpen,
    setIsModalOpen,
    handleDeleteSubmitBtn,
    productsArray,
    calculations,
    setIsOpenFormCreateProduct,
    handleLoyalityCalulation,
    loyalityCalculation,
  };
};
export default useUpdateQuote;
