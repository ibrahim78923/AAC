import React, { useState } from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

import Search from '@/components/Search';

import { columns } from './Quotes.data';
import { quotesData } from '@/mock/modules/airSales/Deals/ViewDetails';
import TanstackTable from '@/components/Table/TanstackTable';

import { PlusSharedIcon } from '@/assets/icons';

import { styles } from '../Associations.style';

const Quotes = () => {
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
        <Grid item md={4} sx={styles?.countBox}>
          <Typography sx={styles?.associationCount(theme)} variant="body3">
            02
          </Typography>

          <Typography variant="subtitle2">Quotes</Typography>
        </Grid>
        <Grid item md={8}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Search
              searchBy={searchName}
              setSearchBy={setSearchName}
              label="Search By Name"
              size="small"
            />
            <Button
              variant="contained"
              sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
            >
              <PlusSharedIcon /> Add Quotes
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable columns={columns()} data={quotesData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Quotes;
