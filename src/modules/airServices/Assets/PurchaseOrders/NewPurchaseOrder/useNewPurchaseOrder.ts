import { useEffect } from 'react';
import {
  defaultValues,
  newPurchaseFieldsFunction,
  validationSchema,
} from './NewPurchaseOrder.data';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
import {
  useGetAirServicesAssetsPurchaseOrderByIdQuery,
  usePatchAirServicesAssetsPurchaseOrderMutation,
  usePostAirServicesAssetsPurchaseOrderMutation,
} from '@/services/airServices/assets/purchase-orders';
import { filteredEmptyValues } from '@/utils/api';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { PURCHASE_ORDER_STATUS } from '@/constants/strings';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import { isoDateString } from '@/lib/date-time';
import { useFormLib } from '@/hooks/useFormLib';
import { useDynamicForm } from '@/components/DynamicForm/useDynamicForm';

const { PURCHASE_ORDER } = AIR_SERVICES;

const useNewPurchaseOrders = () => {
  const router = useRouter();

  const { purchaseOrderId } = router?.query;

  const [postPurchaseOrderTrigger, postPurchaseOrderStatus] =
    usePostAirServicesAssetsPurchaseOrderMutation();
  const [patchPurchaseOrderTrigger, patchPurchaseOrderStatus] =
    usePatchAirServicesAssetsPurchaseOrderMutation();

  const dynamicFormProps = {
    productType: DYNAMIC_FIELDS?.PT_SERVICES,
    moduleType: DYNAMIC_FIELDS?.MT_PURCHASE_ORDER,
  };

  const {
    form,
    handleUploadAttachments,
    isDynamicFormLoading,
    hasDynamicFormError,
    attachmentsApiCallInProgress,
    getDynamicFormData,
  } = useDynamicForm(dynamicFormProps);

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const singlePurchaseOrder: any =
    useGetAirServicesAssetsPurchaseOrderByIdQuery(purchaseOrderId, {
      refetchOnMountOrArgChange: true,
      skip: !!!purchaseOrderId,
    });

  const loadingStatus =
    patchPurchaseOrderStatus?.isLoading ||
    postPurchaseOrderStatus?.isLoading ||
    attachmentsApiCallInProgress;

  const useFormValues = {
    validationSchema: validationSchema?.(form),
    defaultValues: defaultValues?.(),
  };

  const { watch, reset, methods, handleSubmit } = useFormLib(useFormValues);

  const vendorValue = watch('vendor');

  const submit = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues(data);

    try {
      const { body, customFields }: any = await handleUploadAttachments?.(
        data,
        filteredEmptyData,
      );

      const {
        location,
        vendor,
        department,
        purchaseDetails,
        expectedDeliveryDate,
        ...rest
      } = body;

      const taxRate = rest?.taxRatio;
      delete rest?.taxRatio;

      const apiParameter = {
        body: {
          ...rest,
          taxRate,
          locationId: location?._id,
          vendorId: vendor?._id,
          departmentId: department?._id,
          status: PURCHASE_ORDER_STATUS?.OPEN,
          currency: 'Pound',
          expectedDeliveryDate: isoDateString(expectedDeliveryDate),
          purchaseDetails: purchaseDetails?.map((purchaseDetail: any) => {
            const name = purchaseDetail?.itemName?._id;
            delete purchaseDetail?.itemName;
            return { itemName: name, ...purchaseDetail };
          }),
          customFields,
        },
      };

      if (!!purchaseOrderId) {
        submitUpdatePurchaseOrder(apiParameter);
        return;
      }
      await postPurchaseOrderTrigger(apiParameter)?.unwrap();
      successSnackbar('New Purchase Order Created Successfully!');
      handlePageBack();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const submitUpdatePurchaseOrder = async (data: any) => {
    const patchPurchaseOrderParameter = {
      body: {
        id: purchaseOrderId,
        ...data?.body,
      },
    };
    try {
      await patchPurchaseOrderTrigger(patchPurchaseOrderParameter)?.unwrap();
      successSnackbar('Purchase Order Updated Successfully!');
      handlePageBack();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handlePageBack = () => {
    router?.push(PURCHASE_ORDER);
    reset();
  };

  const newPurchaseFields = newPurchaseFieldsFunction();

  useEffect(() => {
    if (singlePurchaseOrder?.data) {
      reset(() => defaultValues(singlePurchaseOrder?.data?.data, form));
    }
  }, [singlePurchaseOrder?.data, reset, form]);

  const showLoader = singlePurchaseOrder?.isLoading || isDynamicFormLoading;

  const refresh = () => {
    if (!singlePurchaseOrder?.isUninitialized) {
      singlePurchaseOrder?.refetch();
    }
    getDynamicFormData();
  };

  const hasError = singlePurchaseOrder?.isError || hasDynamicFormError;

  return {
    methods,
    submit,
    handlePageBack,
    newPurchaseFields,
    purchaseOrderId,
    vendorValue,
    router,
    loadingStatus,
    watch,
    form,
    handleSubmit,
    showLoader,
    hasError,
    refresh,
    getDynamicFormData,
  };
};

export default useNewPurchaseOrders;
