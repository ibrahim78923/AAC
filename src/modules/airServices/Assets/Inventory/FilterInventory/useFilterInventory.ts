import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  inventoryFilterFormDefaultValues,
  inventoryFilterFormFieldsDataFunction,
} from './FilterInventory.data';
import { useForm } from 'react-hook-form';
import { useLazyGetOrganizationsQuery } from '@/services/dropdowns';
import usePath from '@/hooks/usePath';

export const useFilterInventory = (props: any) => {
  const { setIsDrawerOpen, setInventoryFilterLists, inventoryFilterLists } =
    props;

  const router = useRouter();
  const theme: any = useTheme();

  const methods: any = useForm({
    defaultValues: inventoryFilterFormDefaultValues(inventoryFilterLists),
  });
  const { makePath } = usePath();
  const { handleSubmit } = methods;
  const submitInventoryFilterForm = async (data: any) => {
    const inventoryFilteredFields: any = Object?.entries(data || {})
      ?.filter(
        ([, value]: any) => value !== undefined && value != '' && value != null,
      )
      ?.reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: value }), {});
    if (!Object?.keys(inventoryFilteredFields || {})?.length) {
      closeInventoryFilterForm();
      return;
    }
    setInventoryFilterLists(inventoryFilteredFields);
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
  const apiQueryOrganizations = useLazyGetOrganizationsQuery();
  const inventoryFilterFormFieldsData = inventoryFilterFormFieldsDataFunction(
    apiQueryOrganizations,
    apiQueryOrganizations,
    apiQueryOrganizations,
  );
  return {
    inventoryFilterFormFieldsData,
    router,
    theme,
    methods,
    submitInventoryFilterForm,
    handleSubmit,
    closeInventoryFilterForm,
  };
};
