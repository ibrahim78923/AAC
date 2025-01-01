import { userDataArray, userDefaultValues } from './UsersFilter.data';
import { useState } from 'react';
import { filteredEmptyValues } from '@/utils/api';
import { UsersFilterDataI, UsersFilterI } from './UsersFilter.interface';
import { useFormLib } from '@/hooks/useFormLib';

export const useUsersFilter = (props: UsersFilterI) => {
  const { filterValues, setFilterValues } = props;
  const useFormValues = {
    defaultValues: userDefaultValues(filterValues),
  };

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const openFilterDrawer = () => {
    setIsFilterOpen(true);
  };

  const closeFilterDrawer = () => {
    setIsFilterOpen(false);
  };
  const { handleSubmit, methods, reset } = useFormLib(useFormValues);

  const resetFormAndCloseDrawer = () => {
    reset(userDefaultValues({}));
    setFilterValues({});
    setIsFilterOpen(false);
  };

  const submitFilter = (data: UsersFilterDataI) => {
    const filterData = filteredEmptyValues(data);
    setFilterValues(filterData);
    closeFilterDrawer();
  };

  const userFieldsData = userDataArray();

  return {
    userFieldsData,
    methods,
    handleSubmit,
    submitFilter,
    openFilterDrawer,
    closeFilterDrawer,
    isFilterOpen,
    resetFormAndCloseDrawer,
  };
};
