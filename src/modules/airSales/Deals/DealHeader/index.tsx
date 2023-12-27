import React from 'react';

import { Typography, Box, Button, SvgIcon } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import ImportDealsDrawer from '../ImportDealsDrawer';

import CreateDeal from '../CreateDeal';
import ViewAllDeals from '../ViewAllDeals';
import useDealHeader from './useDealHeader';

import { styles } from './DealHeader.style';

import { ImportIcon, MenuIcon } from '@/assets/icons';

const DealHeader = () => {
  const {
    IsViewAll,
    isImportDeal,
    isCreateDeal,
    handleCreateDealOpen,
    handleImportDealOpen,
    handleViewAll,
  } = useDealHeader();

  return (
    <Box sx={styles?.HeaderStyle}>
      <Box display="flex" alignItems={'center'} gap={'10px'}>
        <SvgIcon onClick={handleViewAll} sx={{ cursor: 'pointer' }}>
          <MenuIcon />
        </SvgIcon>
        <Typography variant="h4" sx={styles?.HeaderTypography}>
          Deals
        </Typography>
      </Box>
      <Box sx={styles?.HeaderChildStyle}>
        <Button
          variant="outlined"
          sx={{ height: '35px', width: { xs: '100%', sm: '100px' } }}
          color="inherit"
          className="small"
          onClick={handleImportDealOpen}
          startIcon={<ImportIcon />}
        >
          Import
        </Button>
        {/* <Box> */}
        <Button
          variant="contained"
          color="primary"
          className="small"
          onClick={handleCreateDealOpen}
          startIcon={<AddCircle />}
          sx={{ height: '35px', width: { xs: '100%', sm: '140px' } }}
        >
          Create Deal
        </Button>
        {/* </Box> */}
      </Box>
      <ImportDealsDrawer open={isImportDeal} onClose={handleImportDealOpen} />
      <CreateDeal open={isCreateDeal} onClose={handleCreateDealOpen} />
      <ViewAllDeals open={IsViewAll} onClose={handleViewAll} />
    </Box>
  );
};

export default DealHeader;
