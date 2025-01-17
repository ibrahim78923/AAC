import {
  usePostInvoiceMutation,
  useLazyGetQuoteByIdForInvoiceQuery,
  useLazyGetBankAccountsListForInvoicesQuery,
} from '@/services/airSales/invoices';
import { errorSnackbar } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  sendEmailDefaultValues,
  sendEmailValidationSchema,
} from './QuoteInvoice.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';

const useQuoteInvoice = (quoteId: any) => {
  const router = useRouter();
  const [quoteDataById, setQuoteDataById] = useState<any>(null);
  const [comments, setComments] = useState('');
  const [accountNo, setAccountNo] = useState<string | number>('');
  const [isEmailModal, setIsEmailModal] = useState(false);

  const [
    lazyGetQuoteTrigger,
    { isFetching: fetchingQuoteById, isLoading: loadingQuoteById, isSuccess },
  ] = useLazyGetQuoteByIdForInvoiceQuery();
  const getInvoiceData = async () => {
    if (!quoteId) {
      errorSnackbar('Quote ID is required.');
      return;
    }
    try {
      const response: any = await lazyGetQuoteTrigger({
        id: quoteId,
        params: {},
      })?.unwrap();
      setQuoteDataById(response?.data);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const additionalAmount = quoteDataById?.products?.reduce(
    (acc: any, curr: any) =>
      acc + curr?.unitPrice * curr?.additionalQuantity - curr?.unitDiscount,
    0,
  );

  const subtotal = quoteDataById?.subTotal;
  // const unitDiscount = quoteDataById?.products?.reduce(
  //   (acc: any, curr: any) => acc + curr?.unitDiscount * curr?.quantity,
  //   0,
  // );

  useEffect(() => {
    if (quoteId) {
      getInvoiceData();
    }
    setAccountNo('');
  }, [quoteId]);

  const methodsSendEmail = useForm({
    resolver: yupResolver(sendEmailValidationSchema),
    defaultValues: sendEmailDefaultValues,
  });
  const { handleSubmit: handleMethodAddFaq } = methodsSendEmail;
  const openModalEmail = () => {
    setIsEmailModal(true);
  };
  const closeModalEmail = () => {
    setIsEmailModal(false);
  };

  // Get Bank Accounts
  const bankAccountsList = useLazyGetBankAccountsListForInvoicesQuery();
  const methodsBankAccounts: any = useForm({
    defaultValues: { bankAccount: null },
  });
  const { watch } = methodsBankAccounts;
  const watchBankAccout = watch('bankAccount');
  useEffect(() => {
    if (watchBankAccout) {
      setAccountNo(watchBankAccout?._id);
    } else {
      setAccountNo('');
    }
  }, [watchBankAccout]);

  // Create Invoice
  const [postCreateInvoice, { isLoading: loadingPostInvoice }] =
    usePostInvoiceMutation();

  const onSubmitCreateInvoice = async (values: any) => {
    const payload = {
      quoteId: quoteId,
      dealId: quoteDataById?.dealId,
      comments: comments,
      customerEmail: values?.customerEmail,
      status: 'PUBLISHED',
      total: quoteDataById?.total,
      subTotal: subtotal,
      // receiverBankAccountId: accountNo,
    };
    try {
      await postCreateInvoice({ body: payload })?.unwrap();
      closeModalEmail();
      router.push(AIR_SALES?.SALES_INVOICES);
      enqueueSnackbar('Invoice added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleAddInvoiceSubmit = handleMethodAddFaq(onSubmitCreateInvoice);

  return {
    comments,
    setComments,
    quoteDataById,
    fetchingQuoteById,
    loadingQuoteById,
    isSuccess,
    watchBankAccout,
    methodsBankAccounts,
    bankAccountsList,
    handleAddInvoiceSubmit,
    setAccountNo,
    accountNo,
    isEmailModal,
    openModalEmail,
    closeModalEmail,
    methodsSendEmail,
    loadingPostInvoice,
    subtotal,
    additionalAmount,
  };
};

export default useQuoteInvoice;
