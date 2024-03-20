import { PAGINATION } from '@/config';
import { useGetProductsUsersQuery } from '@/services/airSales/settings/users';
import { useState } from 'react';

const useUserManagement = () => {
  const [teamId, setTeamId] = useState();
  const [checkedUser, setCheckedUser] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isAddTeam, setIsAddTeam] = useState({
    isToggle: false,
    type: 'add',
  });
  const [isTeamDrawer, setIsTeamDrawer] = useState(false);
  const [isAddUserDrawer, setIsAddUserDrawer] = useState({
    isToggle: false,
    type: 'add',
  });
  const [searchUser, setSearchUser] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const productUserParams = {
    page: page,
    limit: pageLimit,
    search: searchUser ? searchUser : undefined,
  };
  const {
    data: productsUsers,
    isLoading,
    isSuccess,
  } = useGetProductsUsersQuery(productUserParams);

  return {
    activeTab,
    setActiveTab,
    isAddTeam,
    setIsAddTeam,
    teamId,
    setTeamId,
    isTeamDrawer,
    setIsTeamDrawer,
    productsUsers,
    searchUser,
    setSearchUser,
    setPage,
    isLoading,
    isSuccess,
    setPageLimit,
    isAddUserDrawer,
    setIsAddUserDrawer,
    checkedUser,
    setCheckedUser,
    isOpenDelete,
    setIsOpenDelete,
  };
};

export default useUserManagement;
