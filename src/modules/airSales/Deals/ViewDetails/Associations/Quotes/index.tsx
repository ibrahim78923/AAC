import { useState } from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';

import { columns } from './Quotes.data';
import { quotesData } from '@/mock/modules/airSales/Deals/ViewDetails';

import { PlusIcon } from '@/assets/icons';

import { styles } from '../Associations.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';

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

          <Typography variant="h5">Quotes</Typography>
        </Grid>
        <Grid item md={8} xs={12}>
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
              size="medium"
            />
            <PermissionsGuard
              permissions={[
                AIR_SALES_DEALS_PERMISSIONS?.DEAL_ADD_ASSOCIATE_QUOTE,
              ]}
            >
              <Button
                variant="contained"
                className="medium"
                sx={{ minWidth: '0px', gap: 0.5 }}
              >
                <PlusIcon /> Add Quotes
              </Button>
            </PermissionsGuard>
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
