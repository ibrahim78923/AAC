import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  defaultValues,
  newPurchaseFieldsFunction,
  validationSchema,
} from './NewPurchaseOrder.data';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { AIR_SERVICES } from '@/constants/routes';
import {
  useGetAirServicesAssetsPurchaseOrderByIdQuery,
  usePatchAirServicesAssetsPurchaseOrderMutation,
  usePostAirServicesAssetsPurchaseOrderMutation,
} from '@/services/airServices/assets/purchase-orders';
import { filteredEmptyValues } from '@/utils/api';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { PURCHASE_ORDER_STATUS } from '@/constants/strings';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { isoDateString } from '@/lib/date-time';

const { PURCHASE_ORDER } = AIR_SERVICES;

const useNewPurchaseOrders = () => {
  const router = useRouter();
  const [form, setForm] = useState<any>([]);

  const { purchaseOrderId } = router?.query;

  const [postPurchaseOrderTrigger, postPurchaseOrderStatus] =
    usePostAirServicesAssetsPurchaseOrderMutation();
  const [patchPurchaseOrderTrigger, patchPurchaseOrderStatus] =
    usePatchAirServicesAssetsPurchaseOrderMutation();

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_PURCHASE_ORDER,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

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
    postAttachmentStatus?.isLoading;

  const methods = useForm({
    resolver: yupResolver(validationSchema?.(form)),
    defaultValues: defaultValues?.(),
  });

  const { watch, reset } = methods;
  const vendorValue = watch('vendor');

  const submit = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues(data);

    const customFields: any = {};
    const body: any = {};
    const attachmentPromises: Promise<any>[] = [];
    try {
      dynamicAttachmentsPost({
        form,
        data,
        attachmentPromises,
        customFields,
        postAttachmentTrigger,
      });

      await Promise?.all(attachmentPromises);

      const customFieldKeys = new Set(
        form?.map((field: any) => field?.componentProps?.label),
      );

      Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
        if (customFieldKeys?.has(key)) {
          if (value instanceof Date) {
            value = isoDateString(value);
          }
          if (
            typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
            !Array?.isArray(value) &&
            value !== null
          ) {
            customFields[key] = { ...customFields[key], ...value };
          } else {
            customFields[key] = value;
          }
        } else {
          body[key] = value;
        }
      });

      if (Object?.keys(customFields)?.length > 0) {
        body.customFields = customFields;
      }

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
    singlePurchaseOrder,
    form,
    getDynamicFieldsStatus,
  };
};

export default useNewPurchaseOrders;
