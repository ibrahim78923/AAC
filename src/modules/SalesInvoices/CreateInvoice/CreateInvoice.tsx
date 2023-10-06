import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import ChooseQuotes from './ChooseQuotes/ChooseQuotes';
import EditDetails from './EditDetails';

const CreateInvoice = (props: any) => {
  const { setIsListViewPgae } = props;

  //handle cancel btn function
  const cancelBtnHandler = () => {
    setIsListViewPgae(false);
  };

  return (
    <Box>
      <Typography variant="h3">Step 1</Typography>
      <ChooseQuotes />
      <Typography variant="h3">Step 2</Typography>
      <EditDetails />
      <Typography variant="h3">Step 3</Typography>
      <ChooseQuotes />
      <Stack justifyContent="space-between" alignItems="center" direction="row">
        <Button onClick={cancelBtnHandler} variant="outlined">
          Back
        </Button>
        <Box>
          <Stack gap="10px" direction="row">
            <Button onClick={cancelBtnHandler} variant="outlined">
              Cancel
            </Button>
            <Button onClick={cancelBtnHandler} variant="outlined">
              Skip
            </Button>
            <Button variant="contained">Next</Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateInvoice;
