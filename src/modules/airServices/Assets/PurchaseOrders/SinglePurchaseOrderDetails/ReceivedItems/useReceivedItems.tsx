import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import {
  useGetAddToPurchaseOrderByIdQuery,
  usePatchAddToItemMutation,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useForm } from 'react-hook-form';

export const useReceivedItems = (props: any) => {
  const purchaseOrderId = '65a115b847cea622057735dc';
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

  const submitHandler = async () => {
    const updatedPurchaseOrderDetail = purchaseOrderDetail.map((item: any) => ({
      ...item,
      // received: receivedAmounts,
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
        if (item?._id === item?._id && item?.received > item?.quantity) {
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
      updatedPurchaseOrderDetail?.forEach((item: any) => {
        if (item?._id === item?._id && item?.received < item?.quantity) {
          booVariable = true;
        } else {
          setErrorOccurred(true);
          setIsDrawerOpen(true);
          // setReceivedAmount(0);
        }
      });
      if (booVariable) {
        setErrorOccurred(false);
        const message = 'Purchase Order items count update successfully';
        const variant = 'success';
        enqueueSnackbar(message, {
          variant: variant,
        });
        setIsDrawerOpen(false);
        //setReceivedAmount(0);
      }
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const { control } = useForm();
  return {
    errorOccurred,
    submitHandler,
    purchaseOrderDetail,
    control,
  };
};
