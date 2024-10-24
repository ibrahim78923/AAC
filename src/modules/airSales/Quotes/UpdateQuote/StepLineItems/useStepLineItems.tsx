import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useDeleteProductsMutation,
  useGetQuoteByIdQuery,
  useGetTaxCalculationsQuery,
} from '@/services/airSales/quotes';
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

  const { data: taxCalculation } = useGetTaxCalculationsQuery({
    applyOn: 'quotes',
  });

  const taxCalculationPerc = taxCalculation?.data?.taxCalculations;
  const gettingDiscount =
    dataGetQuoteById?.data?.products?.length > 0 &&
    dataGetQuoteById?.data?.products[0]?.unitDiscount;

  const sum =
    productsData?.data?.products?.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + currentValue?.unitPrice * currentValue?.quantity,
      0,
    ) + productsData?.data?.dealAmount;

  const unitDiscount = productsData?.data?.products?.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + (currentValue?.unitDiscount * currentValue?.quantity || 0),
    0,
  );

  let totalPercentage = 0;
  if (taxCalculationPerc && Array.isArray(taxCalculationPerc)) {
    for (const tax of taxCalculationPerc) {
      totalPercentage += tax.percentage;
    }
  }
  const percentageOfSubtotal = sum * (totalPercentage / 100);

  const discount = isNaN(gettingDiscount) ? 0 : gettingDiscount;

  const subtotal = isNaN(sum) ? 0 : sum;

  const totalDisc = subtotal * (unitDiscount / 100);

  let FinalTotal;
  if (!isNaN(percentageOfSubtotal) && !isNaN(discount)) {
    FinalTotal = (percentageOfSubtotal - discount).toFixed(2);
  } else {
    FinalTotal = 'N/A';
  }

  const [deleteProducts] = useDeleteProductsMutation();

  const handleDeleteDeals = async (productId: string) => {
    try {
      const DelProdBody = {
        dealId: productsData?.data?.dealId,
        product: {
          productId,
        },
      };
      await deleteProducts({ body: DelProdBody })?.unwrap();
      enqueueSnackbar('Deals deleted successfully', {
        variant: 'success',
      });
      // setSelectedRows([]);
      // handleDeleteModal();
    } catch (error) {
      enqueueSnackbar('Error while deleting deals', {
        variant: 'error',
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

      const updatedProducts = productsData?.data?.products.filter(
        (product: any) => product.productId !== data.productId,
      );
      updatedProducts.push(productRespParams);

      const submitQuotesPayload = {
        id: dataGetQuoteById?.data?._id,
        status: 'DRAFT',
        products: updatedProducts,
        dealAmount: dataGetQuoteById?.data?.dealAmount,
        subTotal: 0,
        invoiceDiscount: 0,
        RedeemedDiscount: 0,
        tax: 0,
        total: 0,
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
    totalPercentage,
    sum,
    unitDiscount,
    taxCalculationPerc,
    totalDisc,
    FinalTotal,
    handleDeleteDeals,
    handleAction,
    productsData,
    handleQuantityChange,
    producttUpdateType,
    router,
  };
};

export default useStepLineItems;
