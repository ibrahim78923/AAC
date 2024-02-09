import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import {
  useGetAddToPurchaseOrderByIdQuery,
  usePatchAddToItemMutation,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useFieldArray, useForm } from 'react-hook-form';
import { addItemDefaultValuesFunction } from './ReceivedItems.data';

export const useReceivedItems = (props: any) => {
  const purchaseOrderId = '65ba6631395b6d48702e37e6';
  const [patchAddToItemTrigger] = usePatchAddToItemMutation();
  const [errorOccurred, setErrorOccurred] = useState(false);
  const { setIsDrawerOpen } = props;
  let booVariable: boolean;

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
  const purchaseOrderDetail = data?.data?.purchaseDetails;

  const method = useForm({
    // resolver: yupResolver(addItemValidationSchemaOne),
    defaultValues: addItemDefaultValuesFunction(),
  });
  const { handleSubmit, reset, control } = method;
  // reset({ test: purchaseOrderDetail });
  const { fields } = useFieldArray({
    control,
    name: 'test',
  });

  const submitHandler = async (data: any) => {
    const updatedPurchaseOrderDetail = purchaseOrderDetail.map((item: any) => ({
      ...item,
      received: data?.test?.[0]?.received,
    }));
    const putAddToItemParameter = {
      body: updatedPurchaseOrderDetail,
      pathParam: {
        id: purchaseOrderId,
      },
    };

    try {
      await patchAddToItemTrigger(putAddToItemParameter)?.unwrap();

      updatedPurchaseOrderDetail?.forEach((item: any) => {
        if (item?._id === item?._id && item?.received < item?.quantity) {
          booVariable = true;
        } else {
          setErrorOccurred(true);
          setIsDrawerOpen(false);
        }
      });
      if (booVariable) {
        const message = 'Purchase Order items count update successfully';
        const variant = 'success';
        enqueueSnackbar(message, {
          variant: variant,
        });
        setIsDrawerOpen(false);
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  useEffect(() => {
    reset(() => addItemDefaultValuesFunction(purchaseOrderDetail?.[0]));
  }, [purchaseOrderDetail, reset]);
  return {
    errorOccurred,
    submitHandler,
    handleSubmit,
    fields,
    control,
    method,
  };
};
