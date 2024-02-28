import { useLazyGetAssignToQuery } from '@/services/airServices/workload';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export default function useProfile({ setSelected }: any) {
  const [users, setUsers] = useState<any>([]);
  const [usersExtra, setUsersExtra] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [searchBy, setSearchBy] = useState('');

  const [usersTrigger, usersStatus] = useLazyGetAssignToQuery();
  const [usersExtraTrigger, usersExtraStatus] = useLazyGetAssignToQuery();

  useEffect(() => {
    usersTrigger?.({ params: { search: '' } });
  }, []);

  useEffect(() => {
    usersExtraTrigger?.({ params: { search: searchBy } });
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
    setUsersExtra(
      usersExtraStatus?.data?.slice(MAX_LIMIT, usersStatus?.data?.length),
    );
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
  };
}
