import React, { useState } from 'react';
import { Grid, Button, useMediaQuery } from '@mui/material';
import { DownIcon, PlusSharedIcon } from '@/assets/icons';

import { expenseStyles } from './Expense.style';
import ExpenseTable from './ExpenseTable';

const Expense = () => {
  const [expensData, setexpensData] = useState([]);
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid container sx={expenseStyles.headingContainer}>
        <Grid item sx={expenseStyles.buttonsBox} xs={12}>
          <Button
            endIcon={<DownIcon />}
            disableElevation
            disabled={!!!expensData.length}
            variant="contained"
            fullWidth={matches}
            sx={expenseStyles.actionButton}
          >
            Actions
          </Button>
          <Button
            sx={expenseStyles.addMeetingButton}
            fullWidth={matches}
            startIcon={<PlusSharedIcon />}
            disableElevation
            // onClick={() => setDrawerOpen(true)}
            variant="contained"
          >
            Add New Expense
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mb: '374px' }}>
        <ExpenseTable expensData={expensData} setexpensData={setexpensData} />
      </Grid>
    </Grid>
  );
};

export default Expense;
