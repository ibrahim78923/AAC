import { Box, Button, Menu, MenuItem, Paper, Typography } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import RestoreFilterDrawer from './RestoreFilterDrawer';
import RestoreDeleteModal from './RestoreDeleteModal';
import useRestore from './useRestore';
// import ContactsActions from '../ContactsActions';
import {
  BackArrIcon,
  DownIcon,
  FilterIcon,
  // FilterSharedIcon,
} from '@/assets/icons';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { restoreTableColumns } from './RestoreTable.data';
import RestoreModal from './RestoreModal';
import { styles } from './Restore.style';
import { useRouter } from 'next/router';

const Restore = () => {
  const router = useRouter();
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
    fetchingGetContacts,
    dataGetDeletedContacts,
    methodsFilter,
    handleFiltersSubmit,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteContact,
    loadingDelete,
    isRestoreModal,
    handleOpenModalRestore,
    handleSubmitRestoreContact,
    handleCloseModalRestore,
    loadingRestore,
    theme,
  } = useRestore();

  const columns = restoreTableColumns(selectedRow, setSelectedRow);

  return (
    <>
      <Box sx={styles?.header}>
        <Box sx={styles?.headerLeft}>
          <Box>
            <Box
              sx={styles?.backArrow}
              onClick={() => router?.push(AIR_MARKETER?.ALL_TABLE)}
            >
              <BackArrIcon />
            </Box>
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ colors: theme?.palette?.grey[600] }}
            >
              Restore Forms
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme?.palette?.custom['main'] }}
            >
              Restore forms deleted in the last 90 days
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={styles?.searchBar}>
        <Box>
          <Search
            label="Search Here"
            setSearchBy={setSearchValue}
            fullWidth
            size="small"
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
          <Box>
            <Button
              variant="outlined"
              className="small"
              color="inherit"
              onClick={handleActionsMenuClick}
              classes={{ outlined: 'outlined_btn' }}
              disabled={selectedRow?.length === 0}
            >
              Actions &nbsp; <DownIcon />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={actionMenuOpen}
              onClose={handleActionsMenuClose}
            >
              <MenuItem
                onClick={() => {
                  handleOpenModalRestore();
                  handleActionsMenuClose();
                }}
              >
                Restore
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleOpenModalDelete();
                  handleActionsMenuClose();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </Box>

          <Button
            startIcon={<FilterIcon />}
            sx={styles?.filterButton}
            onClick={handleOpenFilters}
            className="small"
          >
            Filter
          </Button>
        </Box>
      </Box>
      <Paper sx={{ mb: 2 }}>
        <TanstackTable
          columns={columns}
          data={dataGetDeletedContacts?.data?.contacts}
          isLoading={loadingGetContact || fetchingGetContacts}
          currentPage={dataGetDeletedContacts?.data?.meta?.page}
          count={dataGetDeletedContacts?.data?.meta?.pages}
          pageLimit={dataGetDeletedContacts?.data?.meta?.limit}
          totalRecords={dataGetDeletedContacts?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          onPageChange={(page: any) => setPage(page)}
          isPagination
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
        loading={loadingDelete}
      />

      <RestoreModal
        open={isRestoreModal}
        onClose={handleCloseModalRestore}
        handleSubmit={handleSubmitRestoreContact}
        loading={loadingRestore}
      />
    </>
  );
};

export default Restore;
