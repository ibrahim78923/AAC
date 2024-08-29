import { useRouter } from 'next/router';
import {
  inventoryFilterFormDefaultValues,
  inventoryFilterFormFieldsDataFunction,
} from './FilterInventory.data';
import { useForm } from 'react-hook-form';
import usePath from '@/hooks/usePath';
import {
  useLazyGetAssetTypeQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  useLazyGetUsersDropdownQuery,
} from '@/services/airServices/assets/inventory';
import { FilterInventoryI } from './FilterInventory.interface';

export const useFilterInventory = (props: FilterInventoryI) => {
  const {
    setIsDrawerOpen,
    setInventoryFilterLists,
    inventoryFilterLists,
    setPage,
  } = props;

  const router = useRouter();

  const methods: any = useForm({
    defaultValues: inventoryFilterFormDefaultValues(inventoryFilterLists),
  });

  const { makePath } = usePath();
  const { handleSubmit, reset } = methods;
  const submitInventoryFilterForm = async (data: any) => {
    const inventoryFilteredFields = Object?.entries(data || {})
      ?.filter(
        ([, value]) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    if (!Object?.keys(inventoryFilteredFields ?? {})?.length) {
      closeInventoryFilterForm();
      setInventoryFilterLists?.(inventoryFilteredFields);
      return;
    }
    setPage?.(1);
    setInventoryFilterLists?.(inventoryFilteredFields);
    closeInventoryFilterForm();
  };

  const closeInventoryFilterForm = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['inventoryListsAction'],
      }),
    );
    reset();
    setIsDrawerOpen?.(false);
  };

  const resetInventoryFilterForm = async () => {
    if (!!Object?.keys(inventoryFilterLists)?.length) {
      setInventoryFilterLists({});
    }
    reset();
    setIsDrawerOpen?.(false);
  };

  const apiQueryAssetType = useLazyGetAssetTypeQuery();
  const apiQueryUsers = useLazyGetUsersDropdownQuery();
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryLocations = useLazyGetLocationsDropdownQuery();
  const apiQueryUsersCreatedBy = useLazyGetUsersDropdownQuery();

  const inventoryFilterFormFieldsData = inventoryFilterFormFieldsDataFunction(
    apiQueryDepartment,
    apiQueryLocations,
    apiQueryUsers,
    apiQueryAssetType,
    apiQueryUsersCreatedBy,
  );

  return {
    inventoryFilterFormFieldsData,
    router,
    methods,
    submitInventoryFilterForm,
    handleSubmit,
    closeInventoryFilterForm,
    resetInventoryFilterForm,
  };
};
