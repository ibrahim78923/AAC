import {
  useGetAirServicesAssetsPurchaseOrderAllAssetsListQuery,
  useGetAirServicesAssetsPurchaseOrderDetailsByIdQuery,
  usePatchAirServicesAssetsPurchaseOrderDetailsAddToPurchaseOrderMutation,
  usePostAirServicesAssetsPurchaseOrderDetailsMutation,
} from '@/services/airServices/assets/purchase-orders/single-purchase-order-details';
import { useRouter } from 'next/router';
import {
  ADDED_INVENTORY_METHODS,
  addItemsToInventoryCountFormFieldsDynamic,
  addItemsToInventoryFormDefaultValues,
  addItemsToInventoryFormFieldsDynamic,
  addItemsToInventoryFormValidationSchema,
} from './AddItemsToInventory.data';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAddItemsToInventory = (props: any) => {
  const { setIsDrawerOpen } = props;
  const [assetsSearch, setAssetsSearch] = useState('');
  const [showItemsList, setShowItemsList] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModal] = useState<any>({});

  const [postPurchaseOrderTrigger, postPurchaseOrderStatus] =
    usePostAirServicesAssetsPurchaseOrderDetailsMutation();
  const [
    patchAddToExistingInventoryTrigger,
    patchAddToExistingInventoryStatus,
  ] = usePatchAirServicesAssetsPurchaseOrderDetailsAddToPurchaseOrderMutation();

  const router = useRouter();
  const { purchaseOrderId } = router?.query;

  const addItemsToInventoryParameter = {
    pathParams: { purchaseOrderId },
  };

  const addToItemsInventoryDetails: any =
    useGetAirServicesAssetsPurchaseOrderDetailsByIdQuery?.(
      addItemsToInventoryParameter,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!purchaseOrderId,
      },
    );

  const method = useForm<any>({
    defaultValues: addItemsToInventoryFormDefaultValues?.(),
    resolver: yupResolver(
      addItemsToInventoryFormValidationSchema?.(
        addToItemsInventoryDetails?.data?.data,
      ),
    ),
  });

  const { handleSubmit, control, getValues, reset } = method;

  const { fields, append } = useFieldArray({
    control,
    name: 'inventoryData',
  });

  const watchAddInventoryMethod = useWatch({
    control,
    name: 'addInventoryMethod',
    defaultValue: 'addNew',
  });

  const allAssetsApiDataParameter = {
    queryParams: {
      page: 1,
      limit: 50,
      search: assetsSearch,
    },
  };

  const allAssets = useGetAirServicesAssetsPurchaseOrderAllAssetsListQuery?.(
    allAssetsApiDataParameter,
    { refetchOnMountOrArgChange: true },
  );

  const addItemsToInventoryCountFormFields =
    addItemsToInventoryCountFormFieldsDynamic?.(
      addToItemsInventoryDetails?.data?.data?.totalItemAdded,
    );
  const addItemsToInventoryFormFields = addItemsToInventoryFormFieldsDynamic?.(
    watchAddInventoryMethod,
    allAssets,
    setAssetsSearch,
  );

  const submitAddedInventoryItems = async (formData: any) => {
    if (watchAddInventoryMethod === ADDED_INVENTORY_METHODS?.UPDATE_EXISTING) {
      updateExistingInventory?.(formData);
      return;
    }
    if (
      watchAddInventoryMethod === ADDED_INVENTORY_METHODS?.ADD_NEW &&
      !showItemsList
    ) {
      append(
        Array?.from?.(
          {
            length:
              +formData?.addedItemsCount <
              ADDED_INVENTORY_METHODS?.REVIEWED_AT_ONE_TIME
                ? +formData?.addedItemsCount
                : ADDED_INVENTORY_METHODS?.REVIEWED_AT_ONE_TIME,
          },
          () => ({
            displayName: formData?.displayName,
            impact: formData?.impact,
            location: formData?.location,
            department: formData?.department,
          }),
        ),
      );
      setShowItemsList(true);
    }
    if (
      watchAddInventoryMethod === ADDED_INVENTORY_METHODS?.ADD_NEW &&
      showItemsList
    ) {
      submitNewInventory?.(formData);
      return;
    }
  };

  const submitNewInventory = async (formData: any) => {
    if (+formData?.addedItemsCount !== formData?.inventoryData?.length) {
      setIsConfirmModal({ isOpen: true, formData, reset, setIsDrawerOpen });
      return;
    }

    const addedInventoryList = formData?.inventoryData?.map(
      (inventory: any) => ({
        displayName: inventory?.displayName,
        purchaseOrderIds: [purchaseOrderId],
        locationId: inventory?.location?._id,
        departmentId: inventory?.department?._id,
      }),
    );
    const postPurchaseOrderParameter = {
      body: {
        purcahseId: purchaseOrderId,
        inventoryData: addedInventoryList,
      },
    };

    try {
      await postPurchaseOrderTrigger(postPurchaseOrderParameter)?.unwrap();
      successSnackbar(
        `${formData?.inventoryData?.length} item Added to Inventory Successfully`,
      );
      setIsDrawerOpen(false);
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const updateExistingInventory = async (formData: any) => {
    const putAddToPurchaseOrderParameter = {
      purchaseOrderId: purchaseOrderId,
      inventoryId: formData?.existingInventory,
    };

    try {
      await patchAddToExistingInventoryTrigger({
        body: putAddToPurchaseOrderParameter,
      })?.unwrap();
      successSnackbar('Item Added to Inventory  Successfully');
      setIsDrawerOpen(false);
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    addItemsToInventoryCountFormFields,
    addToItemsInventoryDetails,
    method,
    handleSubmit,
    addItemsToInventoryFormFields,
    showItemsList,
    setShowItemsList,
    submitAddedInventoryItems,
    getValues,
    fields,
    append,
    isConfirmModalOpen,
    setIsConfirmModal,
    patchAddToExistingInventoryStatus,
    postPurchaseOrderStatus,
    watchAddInventoryMethod,
  };
};
