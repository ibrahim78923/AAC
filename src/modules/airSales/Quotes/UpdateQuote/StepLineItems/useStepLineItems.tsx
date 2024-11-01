import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetQuoteByIdQuery } from '@/services/airSales/quotes';
import { enqueueSnackbar } from 'notistack';
import { usePutSubmitQuoteMutation } from '@/services/airSales/quotes';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useStepLineItems = (openCreateProduct?: any) => {
  const theme = useTheme();
  const router = useRouter();
  const methods: any = useForm({});

  const [search, setSearch] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedReward, setIsCheckedReward] = useState(false);

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
  const [putSubmitQuote] = usePutSubmitQuoteMutation();

  const { data: productsData } = useGetQuoteByIdQuery({
    id: quoteId,
    ...(search && { productSearchKeyword: search }),
  });

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
    isCheckedReward,
    setIsCheckedReward,
    methods,
    theme,
    handleDeleteDeals,
    handleAction,
    productsData,
    handleQuantityChange,
    producttUpdateType,
    router,
  };
};

export default useStepLineItems;
