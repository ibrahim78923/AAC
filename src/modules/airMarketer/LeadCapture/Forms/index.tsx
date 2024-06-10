import { Box, Button, Typography, useTheme } from '@mui/material';
import { PlusIcon } from '@/assets/icons';
import useForms from './useForms';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS } from '@/constants/permission-keys';
import AddDrawer from './AddDrawer';
import TableToolbar from './TableToolbar';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns, tabsArray } from './Forms.data';
import FormTabs from './FormTabs';
import DeleteModal from './DeleteModal';
import ExportModal from './ExportModal';

const Forms = () => {
  const router = useRouter();
  const theme = useTheme();
  const {
    selectedRow,
    setSelectedRow,
    setSearchValue,
    loadingGetForms,
    fetchingGetForms,
    dataGetForms,
    setPageLimit,
    setPage,
    tabValue,
    handleChangeTabs,

    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteForm,
    loadingDelete,

    openModalExport,
    handleOpenModalExport,
    handleCloseModalExport,

    setShowSignUpForm,
    setFindStatus,
    isAddDraweropen,
    handleOpenAddDrawer,
    handleCloseAddDrawer,
    handleAddFormSubmit,
    methodsAddForm,
  } = useForms();

  const getColums = columns(
    selectedRow,
    setSelectedRow,
    setShowSignUpForm,
    setFindStatus,
    theme,
  );

  return (
    <>
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: { xs: '0px 10px' }, display: { md: 'flex' } }}
      >
        <Typography variant="h4">Forms</Typography>
        <PermissionsGuard
          permissions={[AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS?.ADD_FORM]}
        >
          <Button
            variant="contained"
            className="small"
            startIcon={<PlusIcon />}
            onClick={handleOpenAddDrawer}
          >
            Add Form
          </Button>
        </PermissionsGuard>
      </Box>

      <FormTabs
        tabsArray={tabsArray}
        tabValue={tabValue}
        handleTabChange={handleChangeTabs}
      />

      <Box
        sx={{
          border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
          borderRadius: '8px',
          padding: '12px  16px',
          mt: '32px',
        }}
      >
        <TableToolbar
          setSearchBy={setSearchValue}
          disabledActions={selectedRow?.length === 0}
          disabledMenuItem={selectedRow?.length > 1}
          onClickViewDetails={() => {
            router.push(`${AIR_MARKETER.ALL_TABLE}/${selectedRow[0]}`);
          }}
          onClickEdit={() => {
            alert('Edit');
          }}
          onClickDelete={() => {
            handleOpenModalDelete();
          }}
          onClickExport={handleOpenModalExport}
          onClickSendEmail={() => {
            alert('Send Email');
          }}
          onClickRestore={() => {
            router?.push(AIR_MARKETER?.FORM_RESTORE);
          }}
        />

        <TanstackTable
          columns={getColums}
          data={dataGetForms?.data?.leadcaptureforms}
          isLoading={loadingGetForms || fetchingGetForms}
          currentPage={dataGetForms?.data?.meta?.page}
          count={dataGetForms?.data?.meta?.pages}
          pageLimit={dataGetForms?.data?.meta?.limit}
          totalRecords={dataGetForms?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </Box>

      <AddDrawer
        isOpen={isAddDraweropen}
        onClose={handleCloseAddDrawer}
        methods={methodsAddForm}
        onSubmit={handleAddFormSubmit}
      />

      <DeleteModal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        handleSubmit={handleDeleteForm}
        loading={loadingDelete}
      />

      <ExportModal open={openModalExport} onClose={handleCloseModalExport} />
    </>
  );
};

export default Forms;
