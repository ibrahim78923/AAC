import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  // addInventoryDefaultValuesOneUpdate,
  addInventoryValidationSchemaOne,
  addInventoryValidationSchemaUpdate,
  addToInventoryItemAddedFormFieldsDataFunction,
  addInventoryDefaultValuesFunction,
  addToInventoryItemStatusDefaultValuesFunction,
} from './AddToInventory.data';
import { useState } from 'react';

import {
  useGetAddToPurchaseOrderByIdQuery,
  useGetAllAssetsListQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  usePatchAddToPurchaseOrderMutation,
  usePostAssetPurchaseOrderMutation,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details';
import { useRouter } from 'next/router';

import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useAddToInventoryDrawer(props: any) {
  const [selectedAssetId, setSelectedAssetId] = useState(null);

  const handleRadioValueChange = (event: any) => {
    setSelectedAssetId(event.target.value);
  };
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { purchaseOrderId } = router?.query;

  const { setIsADrawerOpen } = props;
  const [postPurchaseOrderTrigger] = usePostAssetPurchaseOrderMutation();
  const [patchNewInventoryTrigger] = usePatchAddToPurchaseOrderMutation();

  const methodsTwo = useForm({
    defaultValues: addToInventoryItemStatusDefaultValuesFunction(),
  });
  const { fields } = useFieldArray({
    control: methodsTwo?.control,
    name: 'addToInventory',
  });
  const { handleSubmit: handleSubmitTwo, reset: resetTwo } = methodsTwo;
  const methodsYes = useForm<any>({
    resolver: yupResolver(addInventoryValidationSchemaOne),
    defaultValues: addInventoryDefaultValuesFunction(),
  });

  const { handleSubmit: handleSubmitYes } = methodsYes;

  const methodsNo = useForm<any>({
    resolver: yupResolver(addInventoryValidationSchemaUpdate),
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
    resetTwo({ addToInventory: dataArray });
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
      await patchNewInventoryTrigger({
        body: putAddToPurchaseOrderParameter,
      })?.unwrap();
      successSnackbar('Item Added to Inventory  Successfully');
    } catch (error: any) {
      errorSnackbar();
    }
    setIsADrawerOpen(false);
    setSelectedAssetId?.(null);
    methodsNo?.reset();
  });
  const submitHandlerTwo = handleSubmitTwo(async (data: any) => {
    const inventoryData = [];
    for (const item of data['addToInventory']) {
      const mapped_item = {
        location_id: item?.location?._id,
        department_id: item?.department?._id,
        impact: item['impact'],
        displayName: item['displayName'],
        purchaseOrderIds: purchaseOrderId,
      };
      inventoryData?.push(mapped_item);
    }
    const postPurchaseOrderParameter = {
      body: {
        inventoryData,
      },
    };

    try {
      await postPurchaseOrderTrigger(postPurchaseOrderParameter)?.unwrap();
      successSnackbar('Item Added to Inventory  Successfully');
    } catch (error) {
      errorSnackbar();
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
    fields,
  };
}
