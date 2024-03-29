import { useEffect, useState } from 'react';
import {
  useGetAddToPurchaseOrderByIdForReceivedItemsQuery,
  usePatchAddToItemMutation,
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
  const { purchaseOrderId } = router?.query;
  const [patchAddToItemTrigger] = usePatchAddToItemMutation();
  const [errorOccurred, setErrorOccurred] = useState(false);
  const { setIsDrawerOpen } = props;
  const getSingleAddToPurchaseOrderParameter = {
    pathParam: {
      purchaseOrderId,
    },
  };

  const { data } = useGetAddToPurchaseOrderByIdForReceivedItemsQuery(
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

  const submitHandler = async (data: any) => {
    const isReceivedComplete = data?.receivedItem?.every(
      (receiveItem: any) => receiveItem?.received == receiveItem.quantity,
    );

    const isReceivedItemNullOrMore = data?.receivedItem?.some(
      (receiveItem: any) =>
        receiveItem?.received == 0 ||
        receiveItem?.received > receiveItem?.quantity,
    );

    if (isReceivedItemNullOrMore) {
      setErrorOccurred(true);
      setIsDrawerOpen(false);
      return;
    }

    const sendData = data?.receivedItem?.map((item: any) => {
      const purchaseDetails = item?.data?.purchaseDetails?.map(
        (secondItem: any) => ({
          ...secondItem,
          received: item?.received,
        }),
      );

      return {
        id: item?.data?._id,
        orderName: item?.data?.orderName,
        orderNumber: item?.data?.orderName,
        vendorId: item?.data?.vendorId,
        currency: item?.data?.currency,
        expectedDeliveryDate: item?.data?.expectedDeliveryDate,
        locationId: item?.data?.locationId,
        departmentId: item?.data?.departmentId,
        termAndCondition: item?.data?.termAndCondition,
        subTotal: item?.data?.subTotal,
        status: isReceivedComplete
          ? PURCHASE_ORDER_STATUS?.RECEIVED
          : PURCHASE_ORDER_STATUS?.PARTLY_RECEIVED,
        purchaseDetails: purchaseDetails,
      };
    });

    const putAddToItemParameter = {
      body: sendData?.[0],
    };
    try {
      await patchAddToItemTrigger(putAddToItemParameter)?.unwrap();

      successSnackbar('Purchase Order items count updated successfully');
      setIsDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    setErrorOccurred(false);
    method?.reset?.();
  };

  return {
    errorOccurred,
    submitHandler,
    handleSubmit,
    fields,
    control,
    method,
  };
};
