import { useForm } from 'react-hook-form';
import { userDataArray, userDefaultValues } from './UsersFilter.data';
import { useLazyGetDepartmentDropdownQuery } from '@/services/airServices/assets/software/single-software-detail/users';
import { useState } from 'react';

export const useUsersFilter = (props: any) => {
  const { userDetailsFilterLists, setFilterValues } = props;
  const methods: any = useForm({
    defaultValues: userDefaultValues(userDetailsFilterLists),
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const openFilterDrawer = () => {
    setIsFilterOpen(true);
  };

  const closeFilterDrawer = () => {
    setIsFilterOpen(false);
  };
  const { handleSubmit, reset } = methods;
  const submitFilter = (data: any) => {
    setFilterValues(data);
    reset();
    closeFilterDrawer();
  };
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();

  const userFieldsData = userDataArray(apiQueryDepartment);

  return {
    userFieldsData,
    methods,
    handleSubmit,
    reset,
    submitFilter,
    openFilterDrawer,
    closeFilterDrawer,
    isFilterOpen,
  };
};
