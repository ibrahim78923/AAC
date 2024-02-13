import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  // addInventoryDefaultValuesOneUpdate,
  addInventoryValidationSchemaOne,
  addInventoryValidationSchemaUpdate,
  addToInventoryItemAddedFormFieldsDataFunction,
  addInventoryDefaultValuesFunction,
  addToInventoryItemStatusDefaultValuesFunction,
} from './AddToInventory.data';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import {
  useGetAddToPurchaseOrderByIdQuery,
  useGetAllAssetsListQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  usePatchAddToPurchaseOrderMutation,
  usePostAssetPurchaseOrderMutation,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details';
// import { useRouter } from 'next/router';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export default function useAddToInventoryDrawer(props: any) {
  const [selectedAssetId, setSelectedAssetId] = useState(null);

  const handleRadioValueChange = (event: any) => {
    setSelectedAssetId(event.target.value);
  };
  // const router = useRouter();
  const [search, setSearch] = useState('');
  const purchaseOrderId = '65ba6631395b6d48702e37e6';
  const { setIsADrawerOpen } = props;
  const [postPurchaseOrderTrigger] = usePostAssetPurchaseOrderMutation();
  const [patchNewInventoryTrigger] = usePatchAddToPurchaseOrderMutation();

  const methodsTwo = useForm({
    defaultValues: addToInventoryItemStatusDefaultValuesFunction(),
  });
  const { handleSubmit: handleSubmitTwo, reset: resetTwo } = methodsTwo;
  const methodsYes = useForm<any>({
    resolver: yupResolver(addInventoryValidationSchemaOne),
    defaultValues: addInventoryDefaultValuesFunction(),
  });

  const { handleSubmit: handleSubmitYes } = methodsYes;

  const methodsNo = useForm<any>({
    resolver: yupResolver(addInventoryValidationSchemaUpdate),
    // defaultValues,
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

  const handleRadioChange = (event: { target: { value: string } }) => {
    setToShow(event?.target?.value === 'Add New');
  };

  const submitHandlerYes = handleSubmitYes((data: any) => {
    const tableData: any = {
      displayName: data?.displayName,
      impact: data?.impact,
      location: data?.location,
      department: data?.department,
    };
    const dataArray: any = Array.from(
      { length: data?.description },
      () => tableData,
    );
    resetTwo({ test: dataArray });
    setBoolVariable(false);
    methodsYes?.reset();
  });

  const submitHandlerNo = handleSubmitNo(async () => {
    const updateData: any = selectedAssetId;
    const putAddToPurchaseOrderParameter = {
      purchaseOrderId: purchaseOrderId,
      inventoryId: updateData,
    };
    try {
      const response = await patchNewInventoryTrigger({
        body: putAddToPurchaseOrderParameter,
      })?.unwrap();
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
    methodsNo?.reset();
  });
  const submitHandlerTwo = handleSubmitTwo(async (data: any) => {
    const inventoryData = [];
    for (const item of data['test']) {
      const mapped_item = {
        location_id: item.location._id,
        department_id: item?.department?._id,
        impact: item['impact'],
        displayName: item['displayName'],
        purchaseOrderIds: purchaseOrderId,
      };
      inventoryData.push(mapped_item);
    }
    const postPurchaseOrderParameter = {
      body: {
        inventoryData,
      },
    };

    try {
      const response: any = await postPurchaseOrderTrigger(
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

    setIsADrawerOpen(false);
    setBoolVariable(true);
    methodsTwo?.reset();
  });
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryLocations = useLazyGetLocationsDropdownQuery();
  const param = {};
  const { data: allAssetsData } = useGetAllAssetsListQuery({ param });
  const updateDate = allAssetsData?.data;
  const addToInventoryItemAddedFormFieldsData =
    addToInventoryItemAddedFormFieldsDataFunction(
      apiQueryDepartment,
      apiQueryLocations,
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
    search,
    setSearch,
    allAssetsData,
    updateDate,
    handleRadioValueChange,
    selectedAssetId,
    setSelectedAssetId,
    apiQueryLocations,
    apiQueryDepartment,
  };
}
