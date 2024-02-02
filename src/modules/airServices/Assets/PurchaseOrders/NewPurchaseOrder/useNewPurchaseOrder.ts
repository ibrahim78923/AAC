import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  defaultValues,
  newPurchaseFieldsFunction,
  validationSchema,
} from './NewPurchaseOrder.data';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import {
  useGetPurchaseOrderByIdQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  useLazyGetVendorDropdownQuery,
  usePatchPurchaseOrderMutation,
  usePostPurchaseOrderMutation,
} from '@/services/airServices/assets/purchase-orders';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useSearchParams } from 'next/navigation';

const { PURCHASE_ORDER } = AIR_SERVICES;

const useNewPurchaseOrders = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const purchaseOrderId = searchParams.get('id');
  const [postPurchaseOrderTrigger, postPurchaseOrderStatus] =
    usePostPurchaseOrderMutation();
  const [patchPurchaseOrderTrigger, patchPurchaseOrderStatus] =
    usePatchPurchaseOrderMutation();
  const singlePurchaseOrder = useGetPurchaseOrderByIdQuery(purchaseOrderId, {
    refetchOnMountOrArgChange: true,
    skip: !!!purchaseOrderId,
  });
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
    const apiParameter = {
      body: {
        ...rest,
        locationId: location?._id,
        vendorId: vendor?._id,
        departmentId: department?._id,
        purchaseDetails: purchaseDetails?.map((purchaseDetail: any) => {
          const name =
            purchaseDetail?.itemName?.vendorproductcatalogsDetails?.name;
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
      const response = await postPurchaseOrderTrigger(apiParameter)?.unwrap();
      enqueueSnackbar({
        message: 'New Purchase Order Created successfully' ?? response?.message,
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
      handlePageBack();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const submitUpdatePurchaseOrder = async (data: any) => {
    const patchPurchaseOrderParameter = {
      id: purchaseOrderId,
      body: { ...data },
    };
    try {
      const response = await patchPurchaseOrderTrigger(
        patchPurchaseOrderParameter,
      )?.unwrap();
      enqueueSnackbar(
        response?.message ?? 'Purchase Order Updated Successfully!',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      reset();
      handlePageBack();
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
  };
};
export default useNewPurchaseOrders;
