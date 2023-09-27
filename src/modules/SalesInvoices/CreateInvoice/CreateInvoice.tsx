import { Box, Button, Stack } from '@mui/material';
import React from 'react';
import ChooseQuotes from './ChooseQuotes/ChooseQuotes';

const CreateInvoice = (props: any) => {
  const { setIsListViewPgae } = props;

  //handle cancel btn function
  const cancelBtnHandler = () => {
    setIsListViewPgae(false);
  };

  return (
    <Box>
      <ChooseQuotes />
      <Stack justifyContent="space-between" alignItems="center" direction="row">
        <Button onClick={cancelBtnHandler}>Back</Button>
        <Box>
          <Button onClick={cancelBtnHandler}>Cancel</Button>
          <Button onClick={cancelBtnHandler}>Skip</Button>
          <Button variant="contained">Next</Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateInvoice;
