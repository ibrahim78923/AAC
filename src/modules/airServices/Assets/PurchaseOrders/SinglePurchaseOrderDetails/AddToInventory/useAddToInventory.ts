import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addToInventoryItemStatusValidationSchema,
  addInventoryDefaultValuesOneUpdate,
  addInventoryValidationSchemaOne,
  addInventoryValidationSchemaUpdate,
  addToInventoryItemAddedFormFieldsDataFunction,
  addInventoryDefaultValuesFunction,
  addToInventoryItemStatusDefaultValuesFunction,
} from './AddToInventory.data';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import {
  useGetAddToPurchaseOrderByIdQuery,
  useLazyGetAssociateAssetsDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  usePatchAddToPurchaseOrderMutation,
  usePostPurchaseOrderMutation,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details';
// import { useRouter } from 'next/router';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export default function useAddToInventoryDrawer(props: any) {
  // const router = useRouter();

  const purchaseOrderId = '65a115b847cea622057735dc';
  const { setIsADrawerOpen } = props;
  const [postPurchaseOrderTrigger] = usePostPurchaseOrderMutation();
  const [patchNewVendorTrigger] = usePatchAddToPurchaseOrderMutation();
  const methodsTwo: any = useForm({
    resolver: yupResolver(addToInventoryItemStatusValidationSchema),
    defaultValues: addToInventoryItemStatusDefaultValuesFunction(),
  });

  const { handleSubmit: handleSubmitTwo } = methodsTwo;
  const methodsYes: any = useForm({
    resolver: yupResolver(addInventoryValidationSchemaOne),
    defaultValues: addInventoryDefaultValuesFunction(),
  });

  const { handleSubmit: handleSubmitYes, reset } = methodsYes;

  const methodsNo: any = useForm({
    resolver: yupResolver(addInventoryValidationSchemaUpdate),
    defaultValues: addInventoryDefaultValuesOneUpdate,
  });
  const { handleSubmit: handleSubmitNo } = methodsNo;
  const onSubmit = async () => {};

  const [boolVariable, setBoolVariable] = useState(true);
  const [toShow, setToShow] = useState(true);

  const getSingleAddToPurchaseOrderParameter = {
    pathParam: {
      purchaseOrderId,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetAddToPurchaseOrderByIdQuery(getSingleAddToPurchaseOrderParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!purchaseOrderId,
    });
  const purchaseOrderDetail = data?.data;
  const inventoryId = purchaseOrderDetail?.inventoryId;

  const handleRadioChange = (event: { target: { value: string } }) => {
    setToShow(event?.target?.value === 'Add New');
  };
  useEffect(() => {
    reset(() => addInventoryDefaultValuesFunction(data));
  }, [data, reset]);
  const submitHandlerYes = handleSubmitYes(async (data: any) => {
    const { department, location, ...otherData } = data;
    const postPurchaseOrderParameter = {
      body: {
        departmentId: department?._id,
        locationId: location?._id,
        purchaseOrderIds: purchaseOrderId,
        ...otherData,
      },
    };

    try {
      const response = await postPurchaseOrderTrigger(
        postPurchaseOrderParameter,
      )?.unwrap();
      enqueueSnackbar(
        response?.message ?? 'item added to inventory Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    setBoolVariable(false);
    methodsYes?.reset();
  });

  const submitHandlerNo = handleSubmitNo(async (data: any) => {
    const updateData: any = {};
    for (const key in addInventoryDefaultValuesOneUpdate) {
      if (data?.[key] !== undefined) {
        updateData[key] = data?.[key];
      }
    }
    const putAddToPurchaseOrderParameter = {
      body: {
        purchaseOrderId: purchaseOrderId,
        inventoryId: inventoryId,
        // ...updateData,
      },
    };
    try {
      const response = await patchNewVendorTrigger(
        putAddToPurchaseOrderParameter,
      )?.unwrap();
      enqueueSnackbar(
        response?.message ?? 'item added to inventory Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    // methodsNo?.reset(addInventoryDefaultValuesOneUpdate);
  });
  const submitHandlerTwo = handleSubmitTwo(() => {
    enqueueSnackbar('item added to inventory Successfully', {
      variant: 'success',
    });
    setIsADrawerOpen(false);
    setBoolVariable(true);
    methodsTwo?.reset();
  });

  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryLocations = useLazyGetLocationsDropdownQuery();

  const apiQueryAssociateAsset = useLazyGetAssociateAssetsDropdownQuery();

  const addToInventoryItemAddedFormFieldsData =
    addToInventoryItemAddedFormFieldsDataFunction(
      apiQueryDepartment,
      apiQueryLocations,
      // apiQueryAllAssets,
      apiQueryAssociateAsset,
    );
  const filteredYes = addToInventoryItemAddedFormFieldsData?.filter(
    (item: any) => {
      return item?.toShow === 'Yes';
    },
  );
  const filteredNo = addToInventoryItemAddedFormFieldsData?.filter(
    (item: any) => {
      return item?.toShow === 'No';
    },
  );
  return {
    purchaseOrderDetail,
    methodsTwo,
    handleSubmitTwo,
    onSubmit,
    handleSubmitYes,
    methodsNo,
    methodsYes,
    handleSubmitNo,
    boolVariable,
    filteredYes,
    filteredNo,
    submitHandlerTwo,
    submitHandlerNo,
    submitHandlerYes,
    handleRadioChange,
    toShow,
    setToShow,
    addToInventoryItemAddedFormFieldsData,
    isLoading,
    isFetching,
    isError,
  };
}
