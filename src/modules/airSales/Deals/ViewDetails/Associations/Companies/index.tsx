import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';

import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import CompaniesEditorDrawer from './CompaniesEditorDrawer';
import TanstackTable from '@/components/Table/TanstackTable';

import useCompanies from './useCompanies';

import { columns } from './Companies.data';
// import { companiesData } from '@/mock/modules/airSales/Deals/ViewDetails';

import { PlusIcon } from '@/assets/icons';

import { styles } from '../Associations.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';

const Companies = ({ companiesData, dealId, isLoading, handleSearch }: any) => {
  const {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
  } = useCompanies();

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 0px 0px 0px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={4} xs={12} sx={styles?.countBox}>
          {isLoading ? (
            <Skeleton variant="text" height={40} width={120} />
          ) : (
            <>
              <Typography sx={styles?.associationCount(theme)} variant="body3">
                {companiesData?.length < 10
                  ? `0${companiesData?.length}`
                  : companiesData?.length}
              </Typography>
              <Typography variant="h5">Companies</Typography>
            </>
          )}
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
              placeholder="Search By Name"
              onChange={({ target }) => handleSearch(target.value)}
            />
            <PermissionsGuard
              permissions={[
                AIR_SALES_DEALS_PERMISSIONS?.DEAL_ADD_ASSOCIATE_COMPANY,
              ]}
            >
              <Button
                variant="contained"
                className="medium"
                sx={{ minWidth: '0px', gap: 0.5 }}
                onClick={() => setOpenDrawer('Add')}
              >
                <PlusIcon /> Add Companies
              </Button>
            </PermissionsGuard>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({ setOpenDrawer, setIsOpenAlert })}
            data={companiesData}
          />
        </Grid>
      </Grid>
      {openDrawer && (
        <CompaniesEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          dealId={dealId}
        />
      )}
      <AlertModals
        message={"You're about to remove a record. Are you sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmit={() => {}}
      />
    </Box>
  );
};

export default Companies;
