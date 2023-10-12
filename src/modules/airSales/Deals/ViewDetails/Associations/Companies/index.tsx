import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { styles } from '../Associations.style';
import Search from '@/components/Search';
import { PlusSharedIcon } from '@/assets/icons';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { columns } from '../../Tasks/Tasks.data';
import { TasksTableData } from '@/mock/modules/Deals';

const Companies = () => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 0px 0px 0px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={6} sx={styles.countBox}>
          <Typography sx={styles.associationCount(theme)} variant="body3">
            02
          </Typography>

          <Typography variant="subtitle2">Companies</Typography>
        </Grid>
        <Grid item md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
            <Search
              searchBy={searchName}
              setSearchBy={setSearchName}
              label="Search By Name"
              size="small"
            />
            <Button
              variant="contained"
              sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
              // onClick={() => setOpenDrawer('Add')}
            >
              <PlusSharedIcon /> Add New Task
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable columns={columns} data={TasksTableData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Companies;
