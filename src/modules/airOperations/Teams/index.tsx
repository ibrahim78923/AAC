import { useAppDispatch } from '@/redux/store';
import { Header } from './Header';
import { TeamsList } from './TeamsList';
import { resetComponentState } from '@/redux/slices/airOperations/teams/slice';
import { useEffect } from 'react';

export const Teams = () => {
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
      <TeamsList />
    </>
  );
};
