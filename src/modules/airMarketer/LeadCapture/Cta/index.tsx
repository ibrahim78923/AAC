import React from 'react';
import useCta from './useCta';
import {
  Box,
  Grid,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CtaEditorDrawer from './CtaEditorDrawer';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { ScheduleModals } from '@/components/ScheduleModals';
import { DRAWER_TITLE, columns, exportData } from './Cta.data';
import { DeleteIcon, ExportDownloadIcon, PlusIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_LEAD_CAPTURE_PERMISSIONS } from '@/constants/permission-keys';

const CTA = () => {
  const {
    theme,
    toggleButtonType,
    handleSwitchButtonType,
    activeStep,
    drawerTitle,
    openDrawer,
    handleDrawerOpen,
    handleDrawerClose,
    handleBack,
    okText,
    loadingCreateCTA,
    methodsEditCTA,
    handleDrawerSubmit,
    dataGetCTAs,
    loadingGetCTAs,
    setSearchValue,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    ctaButtonData,
    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteCTA,
    loadingDelete,

    openModalExport,
    handleOpenModalExport,
    handleCloseModalExport,
    handleExportSubmit,
    handleChangeCheckbox,
    checkedValue,
  } = useCta();

  const tableColumns = columns(selectedRow, setSelectedRow, handleDrawerOpen);

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
                onClick={() => handleDrawerOpen(DRAWER_TITLE?.create)}
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
            isLoading={loadingGetCTAs}
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
        loadingDelete={loadingDelete}
      />

      <CtaEditorDrawer
        toggleButtonType={toggleButtonType}
        handleSwitchButtonType={handleSwitchButtonType}
        title={drawerTitle}
        okText={okText}
        isOpen={openDrawer}
        onClose={handleDrawerClose}
        handleBack={handleBack}
        methods={methodsEditCTA}
        onSubmit={handleDrawerSubmit}
        isLoading={loadingCreateCTA}
        activeStep={activeStep}
        ctaButtonData={ctaButtonData}
      />

      <ScheduleModals
        submitButonText="Export"
        type={'export'}
        open={openModalExport}
        handleClose={handleCloseModalExport}
        handleSubmit={handleExportSubmit}
        isFooter={true}
        disabledSubmitButton={!checkedValue}
      >
        <Grid
          container
          spacing={2}
          sx={{ padding: '0px 10px 10px 22px', maxWidth: '480px' }}
        >
          <Grid item xs={12}>
            <Typography variant="body2">File Format</Typography>
          </Grid>
          {exportData?.map((item) => (
            <Grid item md={4} xs={12} key={item?.value}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name={item?.value}
                    onChange={() => handleChangeCheckbox(item?.value)}
                    checked={checkedValue === item?.value}
                  />
                }
                label={item?.label}
              />
            </Grid>
          ))}
        </Grid>
      </ScheduleModals>
    </Box>
  );
};

export default CTA;
