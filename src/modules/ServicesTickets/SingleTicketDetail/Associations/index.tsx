import { useState } from 'react';
import { PlusSharedIcon } from '@/assets/icons';
import { Grid, Button, Box, useMediaQuery } from '@mui/material';
import { AddAssociationsDrawer } from './AddAssociationsDrawer';

export const Associations = () => {
  const [associationDrawerOpen, setAssociationsDrawerOpen] = useState(false);
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <>
      {' '}
      <AddAssociationsDrawer
        open={associationDrawerOpen}
        setDrawerOpen={setAssociationsDrawerOpen}
      />
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{ fontWeight: 500 }}
              fullWidth={matches}
              endIcon={<PlusSharedIcon />}
              disableElevation
              onClick={() => setAssociationsDrawerOpen(true)}
              variant="contained"
            >
              Add Associations
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
