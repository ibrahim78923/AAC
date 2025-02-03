import { userDataArray, userDefaultValues } from './UsersFilter.data';
import { filteredEmptyValues } from '@/utils/api';
import { UsersFilterDataI, UsersFilterI } from './UsersFilter.interface';
import { useFormLib } from '@/hooks/useFormLib';

export const useUsersFilter = (props: UsersFilterI) => {
  const { filterValues, setFilterValues, setIsPortalOpen } = props;
  const useFormValues = {
    defaultValues: userDefaultValues(filterValues),
  };

  const closeDrawer = () => {
    setIsPortalOpen({ isOpen: false, action: '' });
  };
  const { handleSubmit, methods, reset } = useFormLib(useFormValues);

  const resetFormAndCloseDrawer = () => {
    reset(userDefaultValues({}));
    setFilterValues({});
    closeDrawer();
  };

  const submitFilter = (data: UsersFilterDataI) => {
    const filterData = filteredEmptyValues(data);
    setFilterValues(filterData);
    closeDrawer();
  };

  const userFieldsData = userDataArray();

  return {
    userFieldsData,
    methods,
    handleSubmit,
    submitFilter,
    resetFormAndCloseDrawer,
    closeDrawer,
  };
};
