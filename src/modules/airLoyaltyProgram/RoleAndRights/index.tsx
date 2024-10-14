import { Box } from '@mui/material';
import { Header } from './Header';
import { RoleAndRightsList } from './RoleAndRightsList';
import { useAppDispatch } from '@/redux/store';
import { resetComponentState } from '@/redux/slices/airLoyaltyProgram/roles-and-right/slice';
import { useEffect } from 'react';

export const RolesAndRight = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return (
    <>
      <Box
        py={2}
        borderRadius={2}
        boxShadow={1}
        border={`1px solid`}
        borderColor="custom.off_white_three"
      >
        <Header />
        <br />
        <RoleAndRightsList />
      </Box>
    </>
  );
};
