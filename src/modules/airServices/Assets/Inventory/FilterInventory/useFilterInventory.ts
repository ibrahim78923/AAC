import { useTheme } from '@mui/material';
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

export const useFilterInventory = (props: any) => {
  const { setIsDrawerOpen, setInventoryFilterLists, inventoryFilterLists } =
    props;

  const router = useRouter();
  const theme: any = useTheme();

  const methods: any = useForm({
    defaultValues: inventoryFilterFormDefaultValues(inventoryFilterLists),
  });

  const { makePath } = usePath();
  const { handleSubmit, reset } = methods;
  const submitInventoryFilterForm = async (data: any) => {
    const inventoryFilteredFields: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});
    if (!Object?.keys(inventoryFilteredFields ?? {})?.length) {
      closeInventoryFilterForm();
      return;
    }
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
    // reset();
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
    theme,
    methods,
    submitInventoryFilterForm,
    handleSubmit,
    closeInventoryFilterForm,
    resetInventoryFilterForm,
  };
};
