import { usePostInvoiceMutation } from '@/services/airSales/invoices';
import { useLazyGetQuoteByIdQuery } from '@/services/airSales/quotes';
import { useGetReceiverBankAccountsQuery } from '@/services/orgAdmin/settings/receivers-bank-acconts';
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

  const [lazyGetQuoteTrigger, { isFetching, isLoading }] =
    useLazyGetQuoteByIdQuery();
  const getInvoiceData = async () => {
    try {
      const response: any = await lazyGetQuoteTrigger({
        id: quoteId,
      })?.unwrap();
      setQuoteDataById(response?.data);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const subtotal = quoteDataById?.products?.reduce(
    (acc: any, curr: any) => acc + curr?.unitPrice * curr?.quantity,
    0,
  );

  const unitDiscount = quoteDataById?.products?.reduce(
    (acc: any, curr: any) => acc + curr?.unitDiscount * curr?.quantity,
    0,
  );

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

  // Get Bank Account
  const receiversParams = {};
  const { data: receiversData } =
    useGetReceiverBankAccountsQuery(receiversParams);

  // Create Invoice
  const [postCreateInvoice, { isLoading: loadingPostInvoice }] =
    usePostInvoiceMutation();

  const onSubmitCreateInvoice = async (values: any) => {
    const payload = {
      quoteId: quoteId,
      dealId: quoteDataById?.dealId,
      comments: comments,
      customerEmail: values?.customerEmail,
      status: 'DRAFT',
      total: subtotal - unitDiscount,
      subTotal: subtotal,
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
    isFetching,
    isLoading,
    receiversData,
    handleAddInvoiceSubmit,
    setAccountNo,
    accountNo,
    isEmailModal,
    openModalEmail,
    closeModalEmail,
    methodsSendEmail,
    loadingPostInvoice,
    unitDiscount,
    subtotal,
  };
};

export default useQuoteInvoice;
