import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

const useUserDetailsList = () => {
  const theme = useTheme();
  const navigate = useRouter();
  const [search, setSearch] = useState('');
  const [searchEmployee, setSearchEmployee] = useState('');
  const [tabVal, setTabVal] = useState<number>();
  const [userStatus, setUserStatus] = useState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenAddAccountDrawer, setIsOpenAddAccountDrawer] = useState(false);
  const [isOpenAddCompanyDrawer, setISOpenCompanyDrawer] = useState(false);
  const [isOpenAdduserDrawer, setIsOpenAdduserDrawer] = useState(false);
  const [employeeDataById, setEmployeeDataById] = useState();
  const [isActiveEmp, setIsActiveEmp] = useState(0);
  const [employeeFilter, setEmployeeFilter] = useState({
    status: '',
    product: '',
    company: '',
  });

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };
  const handleCloseAddCompanyDrawer = () => {
    setISOpenCompanyDrawer(false);
  };
  const handleAddUserDrawer = () => {
    setIsOpenAdduserDrawer(false);
  };

  const resetFilters = () => {
    setEmployeeFilter({
      status: '',
      product: '',
      company: '',
    });
  };

  return {
    handleCloseDrawer,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenAddCompanyDrawer,
    setISOpenCompanyDrawer,
    handleCloseAddCompanyDrawer,
    handleAddUserDrawer,
    isOpenAdduserDrawer,
    setIsOpenAdduserDrawer,
    userStatus,
    setUserStatus,
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    search,
    setSearch,
    tabVal,
    setTabVal,
    theme,
    navigate,
    employeeDataById,
    setEmployeeDataById,
    isActiveEmp,
    setIsActiveEmp,
    searchEmployee,
    setSearchEmployee,
    employeeFilter,
    setEmployeeFilter,
    resetFilters,
  };
};
export default useUserDetailsList;
