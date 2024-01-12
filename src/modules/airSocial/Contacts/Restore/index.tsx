import Link from 'next/link';
import { Box, Button, Paper, Typography } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import RestoreFilterDrawer from './RestoreFilterDrawer';
import RestoreDeleteModal from './RestoreDeleteModal';
import useRestore from './useRestore';
import ContactsActions from '../ContactsActions';
import { BackArrIcon, FilterIcon } from '@/assets/icons';
import { AIR_SOCIAL } from '@/routesConstants/paths';
import { restoreTableColumns } from './RestoreTable.data';
import RestoreModal from './RestoreModal';

const Restore = () => {
  const {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    setSearchValue,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    loadingGetContact,
    dataGetDeletedContacts,
    // searchValue,
    methodsFilter,
    handleFiltersSubmit,
    // handleRefresh,
    setPageLimit,
    setPage,
    handlePageChange,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    // rowId,
    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteContact,
    isRestoreModal,
    handleOpenModalRestore,
    handleSubmitRestoreContact,
    handleCloseModalRestore,
    theme,
  } = useRestore();

  const columns = restoreTableColumns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          mb: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <Link href={AIR_SOCIAL?.CONTACTS}>
            <BackArrIcon />
          </Link>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ colors: theme?.palette?.grey[600] }}
            >
              Restore Contacts
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme?.palette?.custom['main'] }}
            >
              Restore Deals deleted in the last 90 days
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mb: 2,
          gap: '15px',
        }}
      >
        <Box>
          <Search
            label="Search Here"
            setSearchBy={setSearchValue}
            fullWidth
            autoComplete="off"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <ContactsActions
            anchorEl={anchorEl}
            actionMenuOpen={actionMenuOpen}
            handleActionsMenuClick={handleActionsMenuClick}
            handleActionsMenuClose={handleActionsMenuClose}
            disableActionBtn={isActionsDisabled}
            openDelete={handleOpenModalDelete}
            openRestoreModal={handleOpenModalRestore}
          />
          <Button
            startIcon={<FilterIcon />}
            variant="outlined"
            sx={{ height: '30px', color: theme?.palette?.custom['main'] }}
            onClick={handleOpenFilters}
          >
            {' '}
            Filter
          </Button>
        </Box>
      </Box>
      <Paper sx={{ mb: 2 }}>
        <TanstackTable
          columns={columns}
          data={dataGetDeletedContacts?.data?.contacts}
          isLoading={loadingGetContact}
          isPagination
          count={dataGetDeletedContacts?.data?.meta?.pages}
          totalRecords={dataGetDeletedContacts?.data?.meta?.total}
          onPageChange={handlePageChange}
          setPage={setPage}
          setPageLimit={setPageLimit}
          pageLimit={dataGetDeletedContacts?.data?.meta?.limit}
        />
      </Paper>

      <RestoreFilterDrawer
        open={openFilters}
        onClose={handleCloseFilters}
        methods={methodsFilter}
        handleSubmit={handleFiltersSubmit}
      />
      <RestoreDeleteModal
        open={isDeleteModal}
        onClose={handleCloseModalDelete}
        handlePermanantDelete={handleDeleteContact}
      />

      <RestoreModal
        open={isRestoreModal}
        onClose={handleCloseModalRestore}
        handleSubmit={handleSubmitRestoreContact}
      />
    </>
  );
};

export default Restore;
