import { useEffect, useState } from 'react';
import {
  useGetAirServicesAssetsPurchaseOrderDetailsAddToReceivedItemsQuery,
  usePatchAirServicesAssetsPurchaseOrderDetailsAddToItemMutation,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details';

import { useFieldArray, useForm } from 'react-hook-form';
import {
  addItemDefaultValuesFunction,
  addItemValidationSchemaOne,
} from './ReceivedItems.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { PURCHASE_ORDER_STATUS } from '@/constants/strings';

export const useReceivedItems = (props: any) => {
  const router = useRouter();
  const [errorOccurred, setErrorOccurred] = useState(false);
  const { purchaseOrderId } = router?.query;
  const [patchAddToItemTrigger, patchAddToItemStatus] =
    usePatchAirServicesAssetsPurchaseOrderDetailsAddToItemMutation();

  const { setIsDrawerOpen } = props;
  const getSingleAddToPurchaseOrderParameter = {
    pathParam: {
      purchaseOrderId,
    },
  };

  const { data, isLoading, isFetching, isError }: { [key: string]: any } =
    useGetAirServicesAssetsPurchaseOrderDetailsAddToReceivedItemsQuery(
      getSingleAddToPurchaseOrderParameter,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!purchaseOrderId,
      },
    );

  const method = useForm<any>({
    resolver: yupResolver(addItemValidationSchemaOne),
    defaultValues: addItemDefaultValuesFunction(data),
  });
  const { handleSubmit, reset, control } = method;

  useEffect(() => {
    reset(() => addItemDefaultValuesFunction(data));
  }, [reset, data]);

  const { fields } = useFieldArray({
    control,
    name: 'receivedItem',
  });

  const submitHandler = async (formData: any) => {
    const isReceivedComplete = formData?.receivedItem?.every(
      (receiveItem: any) => receiveItem?.received == receiveItem?.quantity,
    );

    const isReceivedItemNullOrMore = formData?.receivedItem?.some(
      (receiveItem: any) => receiveItem?.received > receiveItem?.quantity,
    );

    if (isReceivedItemNullOrMore) {
      setErrorOccurred(true);
      return;
    }

    const purchaseDetail = data?.data?.purchaseDetails;
    const purchaseDetails = purchaseDetail?.map(
      (secondItem: { [key: string]: any }, index: number) => ({
        ...secondItem,
        received: formData?.receivedItem?.[index]?.received,
      }),
    );

    const body = {
      id: data?.data?._id,
      orderName: data?.data?.orderName,
      orderNumber: data?.data?.orderNumber,
      vendorId: data?.data?.vendorId,
      currency: data?.data?.currency,
      expectedDeliveryDate: data?.data?.expectedDeliveryDate,
      locationId: data?.data?.locationId,
      departmentId: data?.data?.departmentId,
      termAndCondition: data?.data?.termAndCondition,
      subTotal: data?.data?.subTotal,
      status: isReceivedComplete
        ? PURCHASE_ORDER_STATUS?.RECEIVED
        : PURCHASE_ORDER_STATUS?.PARTLY_RECEIVED,
      purchaseDetails: purchaseDetails,
    };

    const putAddToItemParameter = {
      body,
    };

    try {
      await patchAddToItemTrigger(putAddToItemParameter)?.unwrap();
      successSnackbar('Purchase Order items count updated successfully');
      setIsDrawerOpen(false);
      reset?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    setErrorOccurred(false);
  };

  return {
    errorOccurred,
    submitHandler,
    handleSubmit,
    fields,
    control,
    method,
    isLoading,
    patchAddToItemStatus,
    isFetching,
    isError,
  };
};
