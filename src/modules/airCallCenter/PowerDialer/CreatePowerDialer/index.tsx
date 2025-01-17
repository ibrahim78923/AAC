import { CloseModalIcon } from '@/assets/icons';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import {
  createPowerDialerColumns,
  createPowerDialerData,
  createPowerDialerDropDown,
} from './CreatePowerDialer.data';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { useCreatePowerDialer } from './useCreatePowerDialer';

const CreatePowerDialerModal = (props: any) => {
  const {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    buttonName,
    setButtonName,
    search,
    setSearch,
    selectedData,
    setSelectedData,
    method,
    onSubmit,
    powerDialerModal,
    setPowerDialerModal,
  } = useCreatePowerDialer(props);
  return (
    <>
      {powerDialerModal && (
        <Dialog
          open={powerDialerModal}
          onClose={() => setPowerDialerModal(false)}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              maxWidth: 736,
              borderRadius: 12,
            },
          }}
        >
          <DialogTitle
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingBottom={2.4}
          >
            <Typography variant="h4" color="primary?.main">
              Create Power Dialer
            </Typography>
            <Box
              onClick={() => setPowerDialerModal(false)}
              sx={{
                cursor: 'pointer',
              }}
            >
              <CloseModalIcon />
            </Box>
          </DialogTitle>
          <FormProvider
            methods={method}
            onSubmit={method?.handleSubmit(onSubmit)}
          >
            <DialogContent>
              <Grid container>
                <Grid item xs={12}>
                  <RHFTextField
                    fullWidth={true}
                    size="small"
                    name="title"
                    label="Title"
                    placeholder="Enter Title"
                  />
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <Search
                        label="search"
                        searchBy={search}
                        setSearchBy={setSearch}
                        width="100%"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <SingleDropdownButton
                        dropdownOptions={createPowerDialerDropDown(
                          setButtonName,
                        )}
                        dropdownName={`${buttonName}`}
                        variant="contained"
                        color="primary"
                        component={LoadingButton}
                        loading={false}
                        sx={{
                          bgcolor: 'common.white',
                          color: 'grey.900',
                          border: '1px solid',
                          borderColor: 'grey.700',
                          '&: hover': { bgcolor: 'primary.light' },
                          width: '100%',
                        }}
                        disableElevation
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TanstackTable
                    columns={createPowerDialerColumns(
                      selectedData,
                      setSelectedData,
                      createPowerDialerData,
                    )}
                    data={createPowerDialerData}
                    isLoading={false}
                    isError={false}
                    isSuccess={true}
                    currentPage={page}
                    count={0}
                    pageLimit={pageLimit}
                    totalRecords={0}
                    onPageChange={(page: any) => setPage(page)}
                    setPage={setPage}
                    setPageLimit={setPageLimit}
                    isPagination
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <LoadingButton
                  onClick={() => setPowerDialerModal(false)}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  type="submit"
                  loading={false}
                  variant="contained"
                  color="primary"
                >
                  Create
                </LoadingButton>
              </Box>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
};

export default CreatePowerDialerModal;
