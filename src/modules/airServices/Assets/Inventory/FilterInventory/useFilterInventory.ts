import { useRouter } from 'next/router';
import {
  inventoryFilterFormDefaultValues,
  inventoryFilterFormFieldsDataFunction,
} from './FilterInventory.data';
import { useForm } from 'react-hook-form';
import usePath from '@/hooks/usePath';
import { FilterInventoryI } from './FilterInventory.interface';
import { PAGINATION } from '@/config';

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
    setPage?.(PAGINATION?.CURRENT_PAGE);
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

  const inventoryFilterFormFieldsData = inventoryFilterFormFieldsDataFunction();

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
