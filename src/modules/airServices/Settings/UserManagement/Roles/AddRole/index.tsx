import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { AddRoleIcon } from '@/assets/icons';
import { useAddRole } from './useAddRole';

const AddRole = () => {
  const { addNewRole } = useAddRole();
  return (
    <Grid container>
      <Grid item lg={4} xs={12}>
        <Card
          sx={{ height: '14.8rem', cursor: 'pointer' }}
          onClick={addNewRole}
        >
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5">Add Role</Typography>
            <Box marginLeft={'auto'} marginTop={'4rem'}>
              <AddRoleIcon />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddRole;
