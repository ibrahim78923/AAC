import { Box, Button, Typography } from '@mui/material';
import { SingleLoginMethodCard } from './SingleLoginMethodCard';
import { EditLoginMethod } from '../EditLoginMethod';
import { useState } from 'react';
import { useTheme } from '@mui/material';

export const LoginMethods = ({ timeOut }: any) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} mb={1}>
        <Typography variant="h5">Login Methods</Typography>
        <Button onClick={() => setIsOpenDrawer(true)}>Edit</Button>
      </Box>
      <SingleLoginMethodCard theme={theme} timeOut={timeOut} />
      <EditLoginMethod
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
      />
    </>
  );
};
