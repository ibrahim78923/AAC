import { useLazyGetAirServicesAllUsersInWorkloadQuery } from '@/services/airServices/workload';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export default function useProfile({ setSelected }: any) {
  const [users, setUsers] = useState<any>([]);
  const [usersExtra, setUsersExtra] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [searchBy, setSearchBy] = useState('');

  const [usersTrigger, usersStatus] =
    useLazyGetAirServicesAllUsersInWorkloadQuery();
  const [usersExtraTrigger, usersExtraStatus] =
    useLazyGetAirServicesAllUsersInWorkloadQuery();

  useEffect(() => {
    usersTrigger?.({
      params: { search: '', admin: true },
    });
  }, []);

  useEffect(() => {
    usersExtraTrigger?.({
      params: { search: searchBy, admin: true },
    });
  }, [searchBy]);

  const debouncedSearch = debounce((value: any) => {
    setSearchBy(value);
  }, 100);

  const addToArray = (user: any) => {
    setSelected(user);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'basic-menu' : undefined;

  const MAX_LIMIT = 5;

  const handleClose = () => {
    setAnchorEl(null);
    setSearchBy('');
  };

  useEffect(() => {
    setUsers(usersStatus?.data?.slice(0, MAX_LIMIT));
    if (usersStatus?.data?.length > MAX_LIMIT) {
      setUsersExtra(
        usersExtraStatus?.data?.slice(MAX_LIMIT, usersStatus?.data?.length),
      );
    }
    if (searchBy?.length) {
      setUsersExtra(usersExtraStatus?.data);
    }
  }, [usersStatus?.data, usersExtraStatus?.data]);

  return {
    usersStatus,
    users,
    MAX_LIMIT,
    addToArray,
    setAnchorEl,
    usersExtra,
    anchorEl,
    id,
    debouncedSearch,
    handleClose,
    usersExtraStatus,
  };
}
