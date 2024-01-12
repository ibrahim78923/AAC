import { useState } from 'react';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material';

const useUserDetailsList = () => {
  const theme = useTheme();
  const navigate = useRouter();
  const [searchEmployee, setSearchEmployee] = useState('');
  const [tabVal, setTabVal] = useState<number>();
  const [userStatus, setUserStatus] = useState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenAddAccountDrawer, setIsOpenAddAccountDrawer] = useState(false);
  const [isOpenAddCompanyDrawer, setISOpenCompanyDrawer] = useState(false);
  const [isOpenAdduserDrawer, setIsOpenAdduserDrawer] = useState(false);
  const [employeeDataById, setEmployeeDataById] = useState();
  const [isActiveEmp, setIsActiveEmp] = useState(0);
  const [searchAccount, setSearchAccount] = useState();
  const [employeeFilter, setEmployeeFilter] = useState({
    status: '',
    product: '',
    company: '',
  });
  const [page, setPage] = useState(1);

  const handleEmpListPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
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
    tabVal,
    setTabVal,
    theme,
    navigate,
    employeeDataById,
    setEmployeeDataById,
    isActiveEmp,
    setIsActiveEmp,
    searchAccount,
    setSearchAccount,
    searchEmployee,
    setSearchEmployee,
    employeeFilter,
    setEmployeeFilter,
    resetFilters,
    handleEmpListPaginationChange,
    page,
  };
};
export default useUserDetailsList;
