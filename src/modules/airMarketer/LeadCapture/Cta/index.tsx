import React from 'react';
import useCta from './useCta';
import { Box, Grid, Typography, Button } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { ScheduleModals } from '@/components/ScheduleModals';
import { DRAWER_TITLE, RecordModalData, columns } from './Cta.data';
import { DeleteIcon, ExportDownloadIcon, PlusIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS } from '@/constants/permission-keys';
import CreateCTADrawer from './CreateCTADrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';

const CTA = () => {
  const {
    theme,
    isDrawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    selectedRowData,
    drawerTitle,
    dataGetCTAs,
    loadingGetCTAs,
    fetchingGetCTAs,
    setSearchValue,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteCTA,
    loadingDelete,

    openModalExport,
    handleOpenModalExport,
    handleCloseModalExport,
    handleExportSubmit,
    methods,
    handleSubmit,
    isLoadingDownload,
  } = useCta();

  const tableColumns = columns(selectedRow, setSelectedRow, handleOpenDrawer);

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 15px 25px 15px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h3"> CTAs</Typography>
            <PermissionsGuard
              permissions={[AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS?.CREATE_CTA]}
            >
              <Button
                variant="contained"
                sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                onClick={() => handleOpenDrawer(DRAWER_TITLE?.create, null)}
              >
                <PlusIcon /> Create CTA
              </Button>
            </PermissionsGuard>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <PermissionsGuard
            permissions={[AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS?.SERACH]}
          >
            <Search
              setSearchBy={setSearchValue}
              label="Search By Name"
              fullWidth
              size="small"
            />
          </PermissionsGuard>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', justifyContent: { md: 'end' } }}>
            <Box
              sx={{
                gap: 1,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <PermissionsGuard
                permissions={[AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS?.DELETE]}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  disabled={selectedRow?.length === 0}
                  sx={{
                    minWidth: '0px',
                    height: '35px',
                    gap: 0.5,
                    color: 'red',
                  }}
                  onClick={handleOpenModalDelete}
                >
                  <DeleteIcon
                    color={
                      selectedRow?.length > 0
                        ? theme?.palette?.error?.main
                        : theme?.palette?.custom?.dark
                    }
                  />
                  Delete
                </Button>
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS?.EXPORT]}
              >
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                  onClick={handleOpenModalExport}
                >
                  <ExportDownloadIcon /> Export
                </Button>
              </PermissionsGuard>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={tableColumns}
            data={dataGetCTAs?.data?.leadcapturectas}
            isLoading={loadingGetCTAs || fetchingGetCTAs}
            currentPage={dataGetCTAs?.data?.meta?.page}
            count={dataGetCTAs?.data?.meta?.pages}
            pageLimit={dataGetCTAs?.data?.meta?.limit}
            totalRecords={dataGetCTAs?.data?.meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </Grid>
      </Grid>

      <AlertModals
        message="You’re about to delete CTA."
        type={'delete'}
        open={isDeleteModal}
        handleClose={handleCloseModalDelete}
        handleSubmitBtn={handleDeleteCTA}
        loading={loadingDelete}
      />

      <CreateCTADrawer
        title={drawerTitle}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        data={selectedRowData}
      />

      <ScheduleModals
        submitButonText="Export"
        type={'export'}
        open={openModalExport}
        handleClose={handleCloseModalExport}
        handleSubmit={handleSubmit(handleExportSubmit)}
        isFooter={true}
        loading={isLoadingDownload}
      >
        <Grid
          container
          spacing={2}
          sx={{ padding: '0px 10px 10px 22px', maxWidth: '480px' }}
        >
          <Grid item xs={12}>
            <Typography variant="body2">File Format</Typography>
          </Grid>
          <FormProvider methods={methods}>
            {RecordModalData?.map((item: any) => {
              return (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component
                    {...item?.componentProps}
                    size={'small'}
                  ></item.component>
                </Grid>
              );
            })}
          </FormProvider>
        </Grid>
      </ScheduleModals>
    </Box>
  );
};

export default CTA;
