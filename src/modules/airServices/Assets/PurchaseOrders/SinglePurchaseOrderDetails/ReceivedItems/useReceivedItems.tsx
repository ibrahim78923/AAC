import { useEffect, useState } from 'react';
import {
  useGetAddToPurchaseOrderByIdQuery,
  usePatchAddToItemMutation,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details';

import { useFieldArray, useForm } from 'react-hook-form';
import {
  addItemDefaultValuesFunction,
  addItemValidationSchemaOne,
} from './ReceivedItems.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useReceivedItems = (props: any) => {
  const purchaseOrderId = '65ba6631395b6d48702e37e6';
  const [patchAddToItemTrigger] = usePatchAddToItemMutation();
  const [errorOccurred, setErrorOccurred] = useState(false);
  const { setIsDrawerOpen } = props;
  const getSingleAddToPurchaseOrderParameter = {
    pathParam: {
      purchaseOrderId,
    },
  };

  const { data } = useGetAddToPurchaseOrderByIdQuery(
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
  }, [data, reset]);
  const { fields } = useFieldArray({
    control,
    name: 'test',
  });

  const submitHandler = async (data: any) => {
    const dr = data?.test?.some(
      (x: any) => x?.received == 0 || x?.received > x?.quantity,
    );

    if (dr) {
      setErrorOccurred(true);
      setIsDrawerOpen(false);
      return;
    }

    const sendData = data.test.map((item: any) => {
      const purchaseDetails = item?.data?.purchaseDetails.map(
        (secondItem: any) => ({
          ...secondItem,
          received: item.received,
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
        status: item?.data?.status,
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
    } catch (error) {
      errorSnackbar();
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
  };
};
