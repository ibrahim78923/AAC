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

  const { data: dataGetQuoteById } = useGetQuoteByIdQuery({ id: quoteId });

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

  // const [putSubmitQuote] = usePutSubmitQuoteMutation();

  return {
    search,
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
  };
};

export default useStepLineItems;
