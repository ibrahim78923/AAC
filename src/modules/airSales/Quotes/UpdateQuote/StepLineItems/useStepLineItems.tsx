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
  useGetExchangeRateQuery,
  useGetGiftCardGetBYQuery,
  useGetRewardQuery,
  useGetSingleVouchersQuotesQuery,
  // usePutGiftCardValueMutation,
  // usePutLoyaltyProgramConsumersPointsUpdateMutation,
  // useUpdateRedeemRewardMutation,
} from '@/services/airSales/quotes/loyality';
import { isNullOrEmpty } from '@/utils';
import { debounce } from 'lodash';
import { voucherOperator } from './StepLineItems.data';

const useStepLineItems = (openCreateProduct?: any, calculations?: any) => {
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
  const [checkedItems, setCheckedItems] = useState<any>({});
  const [debouncedValue, setDebouncedValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [VoucherInputValue, setVoucherInputValue] = useState<any>('');
  const [VoucherDebouncedValue, setVoucherDebouncedValue] = useState<any>('');
  const [ConsumerTotalPointsValue, setConsumerTotalPointsValue] =
    useState<any>();
  const [updateSubTotal, setUpdateSubTotal] = useState<any>();
  const [onePointExchangeRate, setOnePointExchangeRate] = useState<any>(0);

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
    '672b49c61c76da9dcf9fd990',
    // { skip: !dataGetQuoteById?.data?.buyerContactId }
  );
  const consumerTotalPoints = consumerDetails?.data?.totalPointsEarned;

  const { data: ExchangeRate }: any = useGetExchangeRateQuery(
    ConsumerTotalPointsValue,
    { skip: isNullOrEmpty(ConsumerTotalPointsValue) },
  );

  const { data: singleTierDetails, isLoading: loadingSingleTierDetails }: any =
    useGetRewardQuery('672b49c61c76da9dcf9fd990');

  const param = {
    cardNumber: debouncedValue,
  };
  const { data: giftCardData, isError: isErrorGiftCard }: any =
    useGetGiftCardGetBYQuery(param, {
      skip: isNullOrEmpty(debouncedValue),
    });

  const paramVoucher = {
    consumerId: '672b49c61c76da9dcf9fd990',
    voucherCode: VoucherDebouncedValue,
  };
  const { data: VoucherData, isError: isErrorVoucher }: any =
    useGetSingleVouchersQuotesQuery(paramVoucher, {
      skip: isNullOrEmpty(VoucherDebouncedValue),
    });

  const subTotal = calculations?.calculationsArray?.find(
    (item: any) => item?.name === 'Sub Total',
  )?.amount;

  useEffect(() => {
    setUpdateSubTotal(parseFloat(subTotal?.replace('£', '').trim()));
  }, [!isNullOrEmpty(subTotal)]);

  // Debounce the input value
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(inputValue);
    }, 300); // Adjust the debounce delay as needed

    handler();

    return () => {
      handler?.cancel();
    };
  }, [inputValue]);

  // Debounce the input value
  useEffect(() => {
    const handler = debounce(() => {
      setVoucherDebouncedValue(VoucherInputValue);
    }, 300); // Adjust the debounce delay as needed

    handler();

    return () => {
      handler?.cancel();
    };
  }, [VoucherInputValue]);

  useEffect(() => {
    setConsumerTotalPointsValue(consumerTotalPoints);
  }, [consumerDetails?.data]);

  // const [updateRedeemReward, { isLoading: loadingUpdateRedeemReward }] =
  //   useUpdateRedeemRewardMutation();
  // const [trigger, { isLoading: loadingUpdateConsumer }] =
  //   usePutLoyaltyProgramConsumersPointsUpdateMutation();

  const handleCheckboxChange = async (item: any) => {
    const isChecked = !checkedItems[item?._id];

    if (isChecked && ConsumerTotalPointsValue < item?.requiredPoints) {
      // If the user doesn't have enough points to use
      enqueueSnackbar('Rewards Points are not enough to use', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      return;
    }

    setCheckedItems((prev: any) => ({ ...prev, [item?._id]: isChecked }));

    setConsumerTotalPointsValue((prevValue: any) =>
      isChecked
        ? prevValue - item?.requiredPoints
        : prevValue + item?.requiredPoints,
    );

    setOnePointExchangeRate((prevValue: any) => {
      const exchangeRate: any = (
        ExchangeRate?.data?.calculatedExchangeRate / ConsumerTotalPointsValue
      )?.toFixed(2);
      const newValue = isChecked
        ? exchangeRate * item?.requiredPoints
        : -exchangeRate * item?.requiredPoints;
      return prevValue + newValue;
    });

    setUpdateSubTotal((prevValue: any) => {
      const exchangeRate: any = (
        ExchangeRate?.data?.calculatedExchangeRate / ConsumerTotalPointsValue
      )?.toFixed(2);
      const newValue = !isChecked
        ? exchangeRate * item?.requiredPoints
        : -exchangeRate * item?.requiredPoints;
      return prevValue + newValue;
    });

    // const payLoad = {
    //   escrowRedeemedPoints: isChecked ? item?.requiredPoints : 0,
    //   redeemedRewardPerConsumer: {
    //     consumerId: '672b49c61c76da9dcf9fd990',
    //     redeemedLimit: 1,
    //     escrowStatus: 'Reserved',
    //   },
    // };

    // const consumersPayLoad = {
    //   currentPointBalance: item?.requiredPoints,
    //   totalPointRedeemed: consumerDetails?.data?.totalPointRedeemed,
    //   totalPointsEarned: consumerTotalPoints,
    //   numberofTransactions: 1,
    //   ids: ['672b49c61c76da9dcf9fd990'],
    // };

    // try {
    //   await updateRedeemReward({ id: item?._id, body: payLoad })?.unwrap();
    //   await trigger(consumersPayLoad)?.unwrap();
    //   enqueueSnackbar('Reward updated', {
    //     variant: NOTISTACK_VARIANTS?.SUCCESS,
    //   });
    // } catch (error: any) {
    //   enqueueSnackbar('Error while updating reward', {
    //     variant: NOTISTACK_VARIANTS?.ERROR,
    //   });
    // }
  };

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
  const [disabledButton, setDisabledButton] = useState(true);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInputValueDiscount(value);

    // Real-time validation
    if (
      Number(value) > giftCardData?.data?.currentamount ||
      Number(value) > updateSubTotal
    ) {
      setDisabledButton(true);
      enqueueSnackbar(`Value cannot exceed from Current Amount or Sub Total`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    } else {
      setDisabledButton(false);
    }
  };

  const [inputValueDiscount, setInputValueDiscount] = useState<any>(0);
  // const [updateApi, { isLoading: updateGiftCardIsLoading }] =
  //   usePutGiftCardValueMutation();
  const [discountsData, setDiscountsData] = useState([
    { id: '1', label: 'Loyalty Discounts', value: '' },
    { id: '2', label: 'Voucher or gift card', value: '' },
    { id: '3', label: 'Total Redeemed Discounts', value: '' },
  ]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    // Update the "Voucher or gift card" value
    setDiscountsData(
      (prevData) =>
        prevData?.map((item: any) =>
          item.label === 'Voucher or gift card'
            ? {
                ...item,
                value: `${
                  parseFloat(inputValueDiscount) + discountVoucherValue
                }`,
              }
            : item,
        ),
    );

    setUpdateSubTotal(updateSubTotal - parseFloat(inputValueDiscount));
    setDisabledButton(true);
    enqueueSnackbar('Discount Added', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });

    // const patchParameter = {
    //   queryParams: { cardNumber: giftCardData?.data?.cardNumber },
    //   body: {
    //     currentamount: giftCardData?.data?.currentamount - inputValueDiscount,
    //     escrowAmount: inputValueDiscount,
    //     transactionAmount: inputValueDiscount,
    //     escrowAmountStatus: 'Pending',
    //     quotesId: quoteId,
    //   },
    // };

    // try {
    //   await updateApi(patchParameter).unwrap();
    //   enqueueSnackbar('Update successful', {
    //     variant: NOTISTACK_VARIANTS?.SUCCESS,
    //   });
    //   refetch();
    // } catch (error) {
    //   enqueueSnackbar('Error while updating', {
    //     variant: NOTISTACK_VARIANTS?.ERROR,
    //   });
    // }
  };
  const [discountVoucherValue, setDiscountVoucherValue] = useState(0);

  useEffect(() => {
    if (VoucherData?.data?.length > 0) {
      const voucher = VoucherData.data[0];
      const { addAmount, percentageOff }: any = voucher;
      let discountVoucher = 0;

      if (
        voucher.operator === voucherOperator.LESS_THAN &&
        updateSubTotal < addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher.operator === voucherOperator.GREATER_THAN &&
        updateSubTotal > addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher.operator === voucherOperator.EQUAL_TO &&
        updateSubTotal === addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher.operator === voucherOperator.LESS_THAN_OR_EQUAL &&
        updateSubTotal <= addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher.operator === voucherOperator.GREATER_THAN_OR_EQUAL &&
        updateSubTotal >= addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else {
        enqueueSnackbar('you can not avail this voucher', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      }
      setUpdateSubTotal(updateSubTotal - discountVoucher);
      setDiscountVoucherValue(discountVoucher);
    }
    setDiscountsData(
      (prevData) =>
        prevData?.map((item: any) =>
          item.label === 'Voucher or gift card'
            ? {
                ...item,
                value: `${(
                  parseFloat(inputValueDiscount) + discountVoucherValue
                )?.toFixed(2)}`,
              }
            : item,
        ),
    );
  }, [VoucherData?.data[0]]);

  useEffect(() => {
    setDiscountsData(
      (prevData) =>
        prevData?.map((item: any) =>
          item.label === 'Voucher or gift card'
            ? {
                ...item,
                value: `${(
                  parseFloat(inputValueDiscount) + discountVoucherValue
                )?.toFixed(2)}`,
              }
            : item,
        ),
    );
  }, [discountVoucherValue, inputValueDiscount]);

  useEffect(() => {
    setDiscountsData(
      (prevData) =>
        prevData?.map((item: any) =>
          item.label === 'Loyalty Discounts'
            ? { ...item, value: `${onePointExchangeRate}` }
            : item,
        ),
    );
  }, [onePointExchangeRate]);

  useEffect(() => {
    setDiscountsData(
      (prevData) =>
        prevData?.map((item: any) =>
          item.label === 'Total Redeemed Discounts'
            ? {
                ...item,
                value: `${(
                  onePointExchangeRate +
                  parseFloat(inputValueDiscount) +
                  discountVoucherValue
                )?.toFixed(2)}`,
              }
            : item,
        ),
    );
  }, [onePointExchangeRate, inputValueDiscount, discountVoucherValue]);

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
    ConsumerTotalPointsValue,
    ExchangeRate,
    singleTierDetails,
    handleCheckboxChange,
    checkedItems,
    loadingSingleTierDetails,
    setInputValue,
    inputValue,
    isErrorGiftCard,
    giftCardData,
    onSubmit,
    inputValueDiscount,
    handleInputChange,
    disabledButton,
    VoucherInputValue,
    setVoucherInputValue,
    isErrorVoucher,
    discountsData,
    updateSubTotal,
    setDiscountVoucherValue,
    setUpdateSubTotal,
    discountVoucherValue,
    setInputValueDiscount,
  };
};

export default useStepLineItems;
