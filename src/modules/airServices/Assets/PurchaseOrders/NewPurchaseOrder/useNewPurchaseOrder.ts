import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  defaultValues,
  newPurchaseFieldsFunction,
  validationSchema,
} from './NewPurchaseOrder.data';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { AIR_SERVICES } from '@/constants';
import {
  useGetPurchaseOrderByIdQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  useLazyGetVendorDropdownQuery,
  usePatchPurchaseOrderMutation,
  usePostPurchaseOrderMutation,
} from '@/services/airServices/assets/purchase-orders';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, successSnackbar } from '@/utils/api';

const { PURCHASE_ORDER } = AIR_SERVICES;

const useNewPurchaseOrders = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const purchaseOrderId = searchParams.get('purchaseOrderId');
  const [postPurchaseOrderTrigger, postPurchaseOrderStatus] =
    usePostPurchaseOrderMutation();
  const [patchPurchaseOrderTrigger, patchPurchaseOrderStatus] =
    usePatchPurchaseOrderMutation();
  const singlePurchaseOrder: any = useGetPurchaseOrderByIdQuery(
    purchaseOrderId,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!purchaseOrderId,
    },
  );
  const loadingStatus =
    patchPurchaseOrderStatus?.isLoading || postPurchaseOrderStatus?.isLoading;
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues(),
  });
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryLocations = useLazyGetLocationsDropdownQuery();
  const apiQueryVendor: any = useLazyGetVendorDropdownQuery();
  const { watch, reset } = methods;
  const vendorValue = watch('vendor');

  const submit = async (data: any) => {
    const { location, vendor, department, purchaseDetails, ...rest } = data;
    const taxRate = rest?.taxRatio;
    delete rest?.taxRatio;
    const apiParameter = {
      body: {
        ...rest,
        taxRate,
        locationId: location?._id,
        vendorId: vendor?._id,
        departmentId: department?._id,
        purchaseDetails: purchaseDetails?.map((purchaseDetail: any) => {
          const name = purchaseDetail?.itemName?._id;
          delete purchaseDetail?.itemName;
          return { itemName: name, ...purchaseDetail };
        }),
      },
    };
    if (!!purchaseOrderId) {
      submitUpdatePurchaseOrder(apiParameter);
      return;
    }
    try {
      await postPurchaseOrderTrigger(apiParameter)?.unwrap();
      successSnackbar('New Purchase Order Created successfully');
      reset();
      handlePageBack();
    } catch (error: any) {
      errorSnackbar();
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
      reset();
      handlePageBack();
    } catch (error) {
      errorSnackbar();
    }
  };
  const handlePageBack = () => {
    router?.push(PURCHASE_ORDER);
    reset();
  };
  const newPurchaseFields = newPurchaseFieldsFunction(
    apiQueryDepartment,
    apiQueryLocations,
    apiQueryVendor,
  );
  useEffect(() => {
    if (singlePurchaseOrder?.data) {
      reset(() => defaultValues(singlePurchaseOrder?.data?.data));
    }
  }, [singlePurchaseOrder?.data, reset]);
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
  };
};
export default useNewPurchaseOrders;
