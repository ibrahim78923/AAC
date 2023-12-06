import { Box, Button, Typography } from '@mui/material';
import { SingleLoginMethodCard } from './SingleLoginMethodCard';
import { useLoginMethods } from './useLoginMethods';
import { EditLoginMethod } from '../EditLoginMethod';

export const LoginMethods = () => {
  const {
    methods,
    theme,
    timeOut,
    timeOutMethods,
    isOpenDrawer,
    setIsOpenDrawer,
  } = useLoginMethods();

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} mb={1}>
        <Typography variant="h5">Login Methods</Typography>
        <Button onClick={() => setIsOpenDrawer(true)}>Edit</Button>
      </Box>
      <SingleLoginMethodCard
        methods={methods}
        theme={theme}
        timeOut={timeOut}
        timeOutMethods={timeOutMethods}
      />
      <EditLoginMethod
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
      />
    </>
  );
};
