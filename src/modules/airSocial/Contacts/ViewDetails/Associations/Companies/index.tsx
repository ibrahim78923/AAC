import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import CompaniesEditorDrawer from './CompaniesEditorDrawer';
import useCompanies from './useCompanies';
import { columns } from './Companies.data';
import { styles } from '../Associations.style';
import { PlusIcon } from '@/assets/icons';
import { FORM_TYPE } from './CompaniesEditorDrawer/CompaniesEditorDrawer.data';

const Companies = ({ contactId }: any) => {
  const {
    disabledField,
    drawerTitle,
    theme,
    setSearchValue,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    methodsView,
    methodsExistingCompany,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    dataGetCompanies,
    loadingCompanies,
    fetchingCompanies,
    companyOwners,
    handleAddCompanySubmit,
    handleExsistingCompanySubmit,
    handleChangeFormType,
    formType,
    isLoadingAddCompany,
    loadingCreateAssociation,
    handleRemoveAssociation,
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
        {loadingCompanies && (
          <Grid item xs={12} sx={styles?.countBox}>
            <Skeleton animation="wave" width="100%" height={60} />
          </Grid>
        )}
        {!loadingCompanies && (
          <>
            <Grid item md={4} sx={styles?.countBox}>
              <Typography sx={styles?.associationCount(theme)} variant="body3">
                {dataGetCompanies?.length < 10
                  ? `0${dataGetCompanies?.length}`
                  : dataGetCompanies?.length}
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
                <Search
                  setSearchBy={setSearchValue}
                  label="Search By Name"
                  size="small"
                />
                <Button
                  variant="contained"
                  className="small"
                  sx={{ minWidth: '0px', gap: 0.5 }}
                  onClick={() => handleOpenDrawer({}, 'Add')}
                >
                  <PlusIcon /> Add Companies
                </Button>
              </Box>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <TanstackTable
            columns={tableColumns}
            data={dataGetCompanies}
            isLoading={loadingCompanies || fetchingCompanies}
          />
        </Grid>
      </Grid>

      <CompaniesEditorDrawer
        title={drawerTitle}
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
        companyOwners={companyOwners || []}
        disabledField={disabledField}
        methodsNewCompany={methodsView}
        methodsExistingCompany={methodsExistingCompany}
        formType={formType}
        handleChangeFormType={handleChangeFormType}
        isLoading={isLoadingAddCompany || loadingCreateAssociation}
        handleOnSubmit={
          formType === FORM_TYPE?.NEW_COMPANY
            ? handleAddCompanySubmit
            : handleExsistingCompanySubmit
        }
      />

      <AlertModals
        message={"You're about to remove a record. Are you Sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmitBtn={handleRemoveAssociation}
        loading={loadingCreateAssociation}
      />
    </Box>
  );
};

export default Companies;
