import { Box, Grid, Typography } from '@mui/material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';

import CompaniesEditorDrawer from './CompaniesEditorDrawer';

import useCompanies from './useCompanies';

import { columns } from './Companies.data';
import { companiesData } from '@/mock/modules/airSales/Deals/ViewDetails';

import { styles } from '../Associations.style';

const Companies = ({ contactId }: any) => {
  const {
    theme,
    searchValue,
    setSearchValue,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    methodsView,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
  } = useCompanies(contactId);

  const tableColumns = columns(handleOpenDrawer, handleOpenAlert);

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

          <Typography variant="subtitle2">Companies</Typography>
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
            , ,
            <Search
              searchBy={searchValue}
              setSearchBy={setSearchValue}
              label="Search By Name"
              size="small"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={tableColumns}
            // data={dataGetCompanies?.data?.companies}
            data={companiesData}
          />
        </Grid>
      </Grid>
      <CompaniesEditorDrawer
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
        methods={methodsView}
      />
      <AlertModals
        message={"You're about to remove a record. Are you Sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmit={() => {}}
      />
    </Box>
  );
};

export default Companies;
