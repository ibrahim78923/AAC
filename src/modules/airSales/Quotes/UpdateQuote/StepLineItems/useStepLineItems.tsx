import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetQuoteByIdQuery } from '@/services/airSales/quotes';
import { enqueueSnackbar } from 'notistack';
import { usePutSubmitQuoteMutation } from '@/services/airSales/quotes';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useCreateConsumerMutation,
  useGetConsumerDetailQuery,
} from '@/services/airSales/quotes/loyality';

const useStepLineItems = (openCreateProduct?: any) => {
  const theme = useTheme();
  const router = useRouter();
  const methods: any = useForm({});

  const [search, setSearch] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [checkedIs, setCheckedIs] = useState({
    voucher: false,
    giftBox: false,
  });

  let quoteId: any;
  if (router?.query?.data) {
    quoteId = router?.query?.data;
  }

  const producttUpdateType = {
    increment_discount: 'disc_inc',
    decrement_discount: 'disc_dec',
    increment_quantity: 'quant_inc',
    decrement_quantity: 'quant_dec',
  };

  const { data: dataGetQuoteById } = useGetQuoteByIdQuery({ id: quoteId });
  const [createConsumer] = useCreateConsumerMutation();
  const [putSubmitQuote] = usePutSubmitQuoteMutation();

  const { data: productsData } = useGetQuoteByIdQuery({
    id: quoteId,
    ...(search && { productSearchKeyword: search }),
  });

  const {
    data: consumerDetails,
    //  isLoading: consumerDetailLoading,
    ...response
  }: any = useGetConsumerDetailQuery(
    // dataGetQuoteById?.data?.buyerContactId,
    '674d7c5fc66ce35124023575',
    // { skip: !dataGetQuoteById?.data?.buyerContactId }
  );
  const consumerTotalPoints = consumerDetails?.data?.totalPointsEarned;
  const createConsumerFunction = async () => {
    if (response.error?.data?.message === 'Consumer not found.') {
      const consumerPayload = {
        firstName: dataGetQuoteById?.data?.buyerContact?.firstName,
        lastName: dataGetQuoteById?.data?.buyerContact?.lastName,
        email: dataGetQuoteById?.data?.buyerContact?.email,
        address: dataGetQuoteById?.data?.buyerContact?.address,
        phoneNumber: dataGetQuoteById?.data?.buyerContact?.phoneNumber,
        contactId: dataGetQuoteById?.data?.buyerContactId,
      };
      await createConsumer({ body: consumerPayload })?.unwrap();
    }
  };
  useEffect(() => {
    createConsumerFunction();
  }, [response.error?.data?.message === 'Consumer not found.']);

  const handleDeleteDeals = async (productId: string) => {
    const remainingProducts = productsData?.data?.products?.filter(
      (product: any) => product?.productId !== productId,
    );

    try {
      const submitQuotesPayload = {
        id: productsData?.data?._id,
        status: 'DRAFT',
        products: remainingProducts,
        dealAmount: productsData?.data?.dealAmount,
      };

      await putSubmitQuote({ body: submitQuotesPayload })?.unwrap();
      enqueueSnackbar('Product deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch {
      enqueueSnackbar('Error while deleting product', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleAction = (id: string, action: string) => {
    router.push(
      `?data=${quoteId}${
        action === 'create' ? '' : `&productId=${id}`
      }&type=${action}`,
    );
    openCreateProduct();
  };

  const handleQuantityChange = async (data: any, type: string) => {
    if (data) {
      const productRespParams = { ...data };
      switch (type) {
        case producttUpdateType?.decrement_quantity:
          productRespParams.additionalQuantity = data?.additionalQuantity - 1;
          break;
        case producttUpdateType?.increment_quantity:
          productRespParams.additionalQuantity = data?.additionalQuantity + 1;
          break;
        case producttUpdateType?.decrement_discount:
          productRespParams.unitDiscount = data?.unitDiscount - 1;
          break;
        case producttUpdateType?.increment_discount:
          productRespParams.unitDiscount = data?.unitDiscount + 1;
          break;
        default:
          break;
      }

      const updatedProducts = productsData?.data?.products?.filter(
        (product: any) => product?.productId !== data?.productId,
      );
      updatedProducts?.push(productRespParams);

      const submitQuotesPayload = {
        id: dataGetQuoteById?.data?._id,
        status: 'DRAFT',
        products: updatedProducts,
      };

      await putSubmitQuote({ body: submitQuotesPayload })?.unwrap();
      enqueueSnackbar('Product updated Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    }
  };

  return {
    setSearch,
    isChecked,
    setIsChecked,
    checkedIs,
    setCheckedIs,
    methods,
    theme,
    handleDeleteDeals,
    handleAction,
    productsData,
    handleQuantityChange,
    producttUpdateType,
    router,
    consumerTotalPoints,
  };
};

export default useStepLineItems;
