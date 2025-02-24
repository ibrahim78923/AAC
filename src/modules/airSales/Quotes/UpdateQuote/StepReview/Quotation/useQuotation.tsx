import { useState } from 'react';
import { useGetMoreDiscountQuery } from '@/services/airSales/quotes/loyality';
import useStepLineItems from '../../StepLineItems/useStepLineItems';

const useQuotation = (calculationData: any) => {
  const { productsData, consumerDetails } = useStepLineItems();
  const [fetchData, setFetchData] = useState(false);
  const { data: moreDiscountData, isLoading: getMoreDisocuntLoading }: any =
    useGetMoreDiscountQuery(
      {
        consumerId: consumerDetails?.data?._id,
        quetoAmount: calculationData?.calculationsArray[4]?.amount,
        amount: calculationData?.calculationsArray[4]?.amount,
        productQuantity: productsData?.data?.products?.length,
      },
      { skip: !fetchData },
    );

  const moreDiscountValue = moreDiscountData?.totalDiscount;

  const revisedSubtotal =
    calculationData?.calculationsArray[4]?.amount - (moreDiscountValue ?? 0);
  if (moreDiscountData?.totalDiscount) {
    const finalTotal =
      (parseFloat(calculationData?.calculationsArray[5]?.amount) / 100) *
        revisedSubtotal +
      revisedSubtotal;

    calculationData.finalTotal = finalTotal;
  }

  if (calculationData?.calculationsArray) {
    calculationData.calculationsArray?.push({
      name: 'Revised Sub Total',
      amount: revisedSubtotal,
    });
  }

  return {
    fetchData,
    setFetchData,
    moreDiscountValue,
    getMoreDisocuntLoading,
  };
};

export default useQuotation;
