import { useForm } from 'react-hook-form';
import { userDataArray, userDefaultValues } from './UsersFilter.data';
import { useLazyGetDepartmentDropdownQuery } from '@/services/airServices/assets/software/single-software-detail/users';
import { useState } from 'react';
import { filteredEmptyValues } from '@/utils/api';

export const useUsersFilter = (props: any) => {
  const { filterValues, setFilterValues } = props;
  const methods: any = useForm({
    defaultValues: userDefaultValues(filterValues),
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const openFilterDrawer = () => {
    setIsFilterOpen(true);
  };

  const closeFilterDrawer = () => {
    setIsFilterOpen(false);
  };
  const resetFormAndCloseDrawer = () => {
    methods.reset(userDefaultValues({}));
    setFilterValues({});
    setIsFilterOpen(false);
  };

  const { handleSubmit } = methods;
  const submitFilter = (data: any) => {
    const filterData = filteredEmptyValues(data);
    setFilterValues(filterData);
    closeFilterDrawer();
  };
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();

  const userFieldsData = userDataArray(apiQueryDepartment);

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
