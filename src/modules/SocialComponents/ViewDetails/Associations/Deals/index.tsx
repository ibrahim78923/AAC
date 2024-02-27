import { Box, Button, Grid, Typography } from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import Search from '@/components/Search';
import DealsEditorDrawer from './DealsEditorDrawer';
import TanstackTable from '@/components/Table/TanstackTable';

import { columns } from './Deals.data';

import { PlusIcon } from '@/assets/icons';

import { styles } from '../Associations.style';
import useDeals from './useDeals';

const Deals = (companyId: any) => {
  const {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    searchName,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    getCompanyDeals,
    handleDeleteDeals,
    setDealRecord,
  } = useDeals(companyId);

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

          <Typography variant="subtitle2">Deals</Typography>
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
              className="small"
              sx={{ minWidth: '0px', gap: 0.5 }}
              onClick={() => setOpenDrawer('Add')}
            >
              <PlusIcon /> Add Deal
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({ setOpenDrawer, setIsOpenAlert, setDealRecord })}
            data={getCompanyDeals?.data}
          />
        </Grid>
      </Grid>
      {openDrawer && (
        <DealsEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          companyId={companyId}
        />
      )}
      <AlertModals
        message={"You're about to remove a record. Are you Sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmit={() => {}}
        handleSubmitBtn={handleDeleteDeals}
      />
    </Box>
  );
};

export default Deals;
