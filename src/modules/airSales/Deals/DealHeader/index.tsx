import { Typography, Box, Button, SvgIcon } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import ImportDealsDrawer from '../ImportDealsDrawer';

import CreateDeal from '../CreateDeal';
import ViewAllDeals from '../ViewAllDeals';
import useDealHeader from './useDealHeader';

import { styles } from './DealHeader.style';

import { ImportIcon, MenuIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';

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
        <PermissionsGuard
          permissions={[AIR_SALES_DEALS_PERMISSIONS?.IMPORT_DEALS]}
        >
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
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SALES_DEALS_PERMISSIONS?.CREATE_DEALS]}
        >
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
        </PermissionsGuard>
      </Box>
      <ImportDealsDrawer open={isImportDeal} onClose={handleImportDealOpen} />
      <CreateDeal open={isCreateDeal} onClose={handleCreateDealOpen} />
      <ViewAllDeals open={IsViewAll} onClose={handleViewAll} />
    </Box>
  );
};

export default DealHeader;
