import { useAppDispatch } from '@/redux/store';
import { Header } from './Header';
import { UserList } from './UserList';
import { useEffect } from 'react';
import { resetComponentState } from '@/redux/slices/airLoyaltyProgram/users/slice';

export const User = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return (
    <>
      <Header />
      <br />
      <UserList />
    </>
  );
};
