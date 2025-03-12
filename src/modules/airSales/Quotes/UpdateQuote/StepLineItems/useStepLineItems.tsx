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
} from '@/services/airSales/quotes/loyality';
import { isNullOrEmpty } from '@/utils';
import { debounce } from 'lodash';
import { voucherOperator } from './StepLineItems.data';
import { useDispatch } from 'react-redux';
import {
  setConsumersData,
  setGiftCardData,
  setRedeemReward,
  setRewardId,
  setVoucherData,
} from '@/redux/slices/airSales/Quotes/quotesSlice';
import { indexNumbers } from '@/constants';

const useStepLineItems = (openCreateProduct?: any, calculations?: any) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [isChecked, setIsChecked] = useState(false);

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
  const [loyaltyRewards, setLoyaltyRewards] = useState<
    { _id: string; value: number }[]
  >([]);
  const [giftCard, setGiftCard] = useState<{ _id: string; value: number }[]>(
    [],
  );
  const [Voucher, setVoucher] = useState<{ _id: string; value: number }[]>([]);
  const [inputValueDiscount, setInputValueDiscount] = useState<any>(0);

  const { data: productsData } = useGetQuoteByIdQuery({
    id: quoteId,
    ...(search && { productSearchKeyword: search }),
  });

  const isGiftCardTrue =
    productsData?.data?.loyaltyGiftCards &&
    Object.keys(productsData?.data?.loyaltyGiftCards).length >
      indexNumbers?.ZERO;
  const isVoucherTrue =
    productsData?.data?.loyaltyVouchers &&
    Object.keys(productsData?.data?.loyaltyVouchers).length >
      indexNumbers?.ZERO;

  const [checkedIs, setCheckedIs] = useState({
    voucher: isVoucherTrue,
    giftBox: isGiftCardTrue,
  });

  const methods = useForm({});

  const {
    data: consumerDetails,
    isLoading: consumerDetailLoading,
    refetch,
  }: any = useGetConsumerDetailQuery(
    { consumerId: dataGetQuoteById?.data?.buyerContactId },
    { skip: !dataGetQuoteById?.data?.buyerContactId },
  );

  const isConsumerDetailsDataAvailable =
    consumerDetails?.data && Object?.keys(consumerDetails?.data)?.length === 0;

  const createConsumerFunction = async () => {
    if (isConsumerDetailsDataAvailable) {
      const consumerPayload = {
        firstName: dataGetQuoteById?.data?.buyerContact?.firstName,
        lastName: dataGetQuoteById?.data?.buyerContact?.lastName,
        email: dataGetQuoteById?.data?.buyerContact?.email,
        address: dataGetQuoteById?.data?.buyerContact?.address,
        phoneNumber: dataGetQuoteById?.data?.buyerContact?.phoneNumber,
        age: dataGetQuoteById?.data?.buyerContact?.age,
        contactId: dataGetQuoteById?.data?.buyerContactId,
        numberOfTransactions: 0,
        totalPointsEarned: 0,
        totalPointRedeemed: 0,
        currentPointBalance: 0,
        status: 'INACTIVE',
      };
      await createConsumer({ body: consumerPayload })?.unwrap();
      refetch();
    }
  };

  const consumerTotalPoints = consumerDetails?.data?.totalPointsEarned;

  const { data: ExchangeRate, isLoading: exchangeRateLoading }: any =
    useGetExchangeRateQuery(ConsumerTotalPointsValue, {
      skip: isNullOrEmpty(ConsumerTotalPointsValue),
    });

  const { data: singleTierDetails, isLoading: loadingSingleTierDetails }: any =
    useGetRewardQuery(consumerDetails?.data?._id, {
      skip: !consumerDetails?.data?._id,
    });

  const param = {
    cardNumber: debouncedValue,
  };
  const { data: giftCardData, isError: isErrorGiftCard }: any =
    useGetGiftCardGetBYQuery(param, {
      skip: isNullOrEmpty(debouncedValue),
    });

  const paramVoucher = {
    // consumerId: consumerDetails?.data?._id,
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

  const totalEscrowRedeemedPoints = Math?.abs(
    productsData?.data?.loyaltyRewards?.reduce((acc: number, item: any) => {
      return acc + (item?.requiredPoints ?? 0);
    }, 0),
  );

  useEffect(() => {
    setInputValue(productsData?.data?.loyaltyGiftCards?.cardNumber);
    setVoucherInputValue(productsData?.data?.loyaltyVouchers?.voucherCode);
    setInputValueDiscount(
      productsData?.data?.loyaltyGiftCards?.escrowAmount ?? 0,
    );
    setGiftCard([
      {
        _id: productsData?.data?.loyaltyGiftCards?._id,
        value: productsData?.data?.loyaltyGiftCards?.escrowAmount,
      },
    ]);

    const loyaltyRewardsIds =
      productsData?.data?.loyaltyRewards?.map((item: any) => item?._id) || [];
    setCheckedItems((prev: any) => {
      const newCheckedItems = { ...prev };
      loyaltyRewardsIds.forEach((id: any) => {
        newCheckedItems[id] = true;
      });
      return newCheckedItems;
    });
    if (productsData?.data?.loyaltyRewards) {
      const rewardsArray = productsData?.data?.loyaltyRewards?.map(
        (item: any) => {
          return {
            _id: item?._id,
            value: item?.requiredPoints,
          };
        },
      );
      setLoyaltyRewards(rewardsArray || []);
    }
  }, [isVoucherTrue, isGiftCardTrue, productsData?.data]);

  useEffect(() => {
    setConsumerTotalPointsValue(
      productsData?.data
        ? consumerTotalPoints - totalEscrowRedeemedPoints
        : consumerTotalPoints,
    );
  }, [consumerDetails?.data]);

  const [RedeemRewardData, setRedeemRewardData] = useState<any[]>([]);

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

    setUpdateSubTotal((prevValue: any) => {
      const exchangeRate: any = (
        ExchangeRate?.data?.calculatedExchangeRate / ConsumerTotalPointsValue
      )?.toFixed(2);
      const newValue = !isChecked
        ? exchangeRate * item?.requiredPoints
        : -exchangeRate * item?.requiredPoints;
      return prevValue + newValue;
    });

    setLoyaltyRewards((prevRewards) => {
      if (isChecked) {
        return [
          ...prevRewards,
          {
            _id: item?._id,
            value: item?.requiredPoints,
          },
        ];
      } else {
        return prevRewards?.filter((reward) => reward?._id !== item?._id);
      }
    });

    // Update redeemReward array
    setRedeemRewardData((prevRewards: any[]) => {
      let updatedRewards;
      if (isChecked) {
        updatedRewards = [
          ...prevRewards,
          ...RedeemRewardData,
          {
            id: item?._id,
            escrowRedeemedPoints: item?.requiredPoints || 0,
            redeemedRewardPerConsumer: {
              consumerId: consumerDetails?.data?._id,
              quotesId: quoteId,
              redeemedLimit: 1,
              escrowStatus: 'Reserved',
            },
          },
        ];
      } else {
        updatedRewards = prevRewards?.filter(
          (reward: any) => reward?.id !== item?._id,
        );
      }

      dispatch(setRedeemReward(updatedRewards));
      return updatedRewards;
    });

    dispatch(setRewardId(item?._id));
  };

  // set consumer data in redux
  const [totalLoyaltyRewardsValue, setTotalLoyaltyRewardsValue] = useState(0);
  useEffect(() => {
    const totalValue = loyaltyRewards?.reduce(
      (acc, reward) => acc + reward?.value,
      0,
    );
    setTotalLoyaltyRewardsValue(totalValue);
  }, [loyaltyRewards]);

  useEffect(() => {
    const consumersPayLoad = {
      currentPointBalance: totalLoyaltyRewardsValue,
      totalPointRedeemed: consumerDetails?.data?.totalPointRedeemed,
      totalPointsEarned: consumerTotalPoints,
      numberOfTransactions: 1,
      ids: [consumerDetails?.data?._id],
    };

    dispatch(setConsumersData(consumersPayLoad));
  }, [totalLoyaltyRewardsValue]);

  // set consumer data in redux

  useEffect(() => {
    const patchParameter = {
      queryParams: { cardNumber: giftCardData?.data?.cardNumber },
      body: {
        currentamount: giftCardData?.data?.currentamount - inputValueDiscount,
        escrowAmount: inputValueDiscount,
        transactionAmount: inputValueDiscount,
        escrowAmountStatus: 'Pending',
        quotesId: quoteId,
      },
    };

    dispatch(setGiftCardData(patchParameter));
  }, [inputValueDiscount]);

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

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setGiftCard([{ _id: giftCardData?.data?._id, value: inputValueDiscount }]);
    setUpdateSubTotal(updateSubTotal - parseFloat(inputValueDiscount));
    setDisabledButton(true);
    enqueueSnackbar('Discount Added', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  const [discountVoucherValue, setDiscountVoucherValue] = useState(0);

  useEffect(() => {
    if (VoucherData?.data?.length > 0) {
      const voucher: any = VoucherData.data[0];
      const { addAmount, percentageOff }: any = voucher;
      let discountVoucher = 0;

      if (
        voucher?.operator === voucherOperator?.LESS_THAN &&
        updateSubTotal < addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher?.operator === voucherOperator?.GREATER_THAN &&
        updateSubTotal > addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher?.operator === voucherOperator?.EQUAL_TO &&
        updateSubTotal === addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher?.operator === voucherOperator?.LESS_THAN_OR_EQUAL &&
        updateSubTotal <= addAmount
      ) {
        discountVoucher = parseFloat(
          String(updateSubTotal * (percentageOff / 100)),
        );
      } else if (
        voucher?.operator === voucherOperator?.GREATER_THAN_OR_EQUAL &&
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
      // Update Voucher state
      setVoucher([{ _id: voucher?._id, value: discountVoucher }]);

      if (discountVoucher != 0) {
        const VoucherParameter = {
          queryParams: {
            voucherCode: VoucherData?.data[0]?.voucherCode,
            consumerId: consumerDetails?.data?._id,
          },
          body: {
            ascrowRedeemedVoucherLimit: 2,
            redeemedVoucherLimit: 0,
            redeemedPerConsumer: {
              consumerId: consumerDetails?.data?._id,
              earnDiscountAmount: percentageOff,
              escrowStatus: 'Reserved',
              quotesId: quoteId,
              redeemedLimit: 1,
            },
          },
        };
        dispatch(setVoucherData(VoucherParameter));
      }
    }
    if (VoucherData?.data?.message) {
      enqueueSnackbar(`${VoucherData?.data?.message}`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  }, [VoucherData?.data]);

  const totalLoyaltyRewardsSum = loyaltyRewards?.reduce((acc, item) => {
    return (
      acc +
      Math.abs(
        (ExchangeRate?.data?.calculatedExchangeRate /
          ConsumerTotalPointsValue) *
          item?.value,
      )
    );
  }, 0);

  const totalSumDiscount =
    (Number(giftCard[0]?.value) || 0) +
    (Number(Voucher[0]?.value) || 0) +
    (Number(totalLoyaltyRewardsSum) || 0);

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
    exchangeRateLoading,
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
    updateSubTotal,
    setDiscountVoucherValue,
    setUpdateSubTotal,
    discountVoucherValue,
    setInputValueDiscount,
    totalLoyaltyRewardsSum,
    totalSumDiscount,
    setVoucher,
    setGiftCard,
    Voucher,
    giftCard,
    loyaltyRewards,
    consumerDetailLoading,
    VoucherData,
    createConsumerFunction,
    consumerDetails,
    isConsumerDetailsDataAvailable,
  };
};

export default useStepLineItems;
