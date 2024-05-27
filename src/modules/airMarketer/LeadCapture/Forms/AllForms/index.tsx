import TanstackTable from '@/components/Table/TanstackTable';
import { Box, useTheme } from '@mui/material';
import useAllForms from './useAllForms';
import { columns } from '../Forms.data';
import { useRouter } from 'next/router';
import TableToolbar from '../TableToolbar';
import { AIR_MARKETER } from '@/routesConstants/paths';
import DeleteModal from '../DeleteModal';

const AllForms = ({ setShowSignUpForm, setFindStatus }: any) => {
  const router = useRouter();
  const theme = useTheme();
  const {
    selectedRow,
    setSelectedRow,
    setSearchValue,
    loadingGetForms,
    dataGetForms,
    setPageLimit,
    setPage,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteForm,
    loadingDelete,
  } = useAllForms();
  const getColums = columns(
    selectedRow,
    setSelectedRow,
    setShowSignUpForm,
    setFindStatus,
    theme,
  );

  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
        borderRadius: '8px',
        padding: '12px  16px',
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
        onClickExport={() => {
          alert('Export');
        }}
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
        isLoading={loadingGetForms}
        currentPage={dataGetForms?.data?.meta?.page}
        count={dataGetForms?.data?.meta?.pages}
        pageLimit={dataGetForms?.data?.meta?.limit}
        totalRecords={dataGetForms?.data?.meta?.total}
        setPage={setPage}
        setPageLimit={setPageLimit}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />

      <DeleteModal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        handleSubmit={handleDeleteForm}
        loading={loadingDelete}
      />
    </Box>
  );
};

export default AllForms;
