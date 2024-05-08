import React from 'react';
import {
  Box,
  Button,
  Typography,
  MenuItem,
  Menu,
  Tooltip,
} from '@mui/material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import AddFaq from './AddFaq';
import { columns } from './Faqs.data';
import { DownIcon, FilterSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import PlusShared from '@/assets/icons/shared/plus-shared';
import { styles } from './Faqs.styles';
import useFaqs from './useFaqs';
import EditFaq from './EditFaq';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_SETTINGS_FAQS_PERMISSIONS } from '@/constants/permission-keys';
import FilterDrawer from './FilterDrawer';

const Faqs = () => {
  const {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    loagingGetFaqs,
    dataGetFaqs,
    setSearchValue,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    openModalAddFaq,
    handleOpenModalFaq,
    handleCloseModalFaq,
    methodsAddFaqs,
    handleAddFaqSubmit,
    loadingAddFaq,
    handleDeleteFaq,
    loadingDelete,
    isFaqsDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    openModalEditFaq,
    drawerTitle,
    onViewDisabled,
    handleOpenModalEditFaq,
    handleCloseModalEditFaq,
    handleSubmitUpdateFaq,
    loadingUpdateFaq,
    methodsEditFaq,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
  } = useFaqs();
  const getFaqsTableColumns = columns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
      }}
    >
      <PermissionsGuard
        permissions={[SUPER_ADMIN_SETTINGS_FAQS_PERMISSIONS?.FAQs_List]}
      >
        <Box sx={styles?.pageHeader}>
          <Box sx={styles?.heading}>
            <Typography variant="h3" sx={{ fontWeight: '600' }}>
              FAQs
            </Typography>
            <PermissionsGuard
              permissions={[SUPER_ADMIN_SETTINGS_FAQS_PERMISSIONS?.Add_FAQ]}
            >
              <Button
                variant="contained"
                sx={{ height: '36px', fontWeight: '500' }}
                onClick={() => handleOpenModalFaq('Add a New FAQ')}
              >
                <PlusShared /> &nbsp; Add
              </Button>
            </PermissionsGuard>
          </Box>
          <Box sx={styles?.filterBar}>
            <Box sx={styles?.search}>
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_FAQS_PERMISSIONS?.Search_and_Filter,
                ]}
              >
                <Search
                  setSearchBy={setSearchValue}
                  label="Search Here"
                  size="small"
                  width={'100%'}
                />
              </PermissionsGuard>
            </Box>
            <Box sx={styles?.filterButtons}>
              <Button
                id="basic-button"
                aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={actionMenuOpen ? 'true' : undefined}
                onClick={handleActionsMenuClick}
                sx={styles?.actionBtn}
                className="small"
                disabled={isActionsDisabled}
              >
                Actions &nbsp; <DownIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={actionMenuOpen}
                onClose={handleActionsMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                  style: {
                    width: '112px',
                  },
                }}
              >
                <PermissionsGuard
                  permissions={[
                    SUPER_ADMIN_SETTINGS_FAQS_PERMISSIONS?.Edit_FAQ,
                  ]}
                >
                  <MenuItem
                    disabled={!rowId}
                    onClick={() => handleOpenModalEditFaq('Edit')}
                    style={{ fontSize: '14px' }}
                  >
                    Edit
                  </MenuItem>
                </PermissionsGuard>

                <PermissionsGuard
                  permissions={[
                    SUPER_ADMIN_SETTINGS_FAQS_PERMISSIONS?.View_FAQ,
                  ]}
                >
                  <MenuItem
                    disabled={!rowId}
                    onClick={() => handleOpenModalEditFaq('View')}
                    style={{ fontSize: '14px' }}
                  >
                    View
                  </MenuItem>
                </PermissionsGuard>

                <PermissionsGuard
                  permissions={[
                    SUPER_ADMIN_SETTINGS_FAQS_PERMISSIONS?.Delete_FAQ,
                  ]}
                >
                  <MenuItem
                    onClick={handleOpenModalDelete}
                    style={{ fontSize: '14px' }}
                  >
                    Delete
                  </MenuItem>
                </PermissionsGuard>
              </Menu>
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_FAQS_PERMISSIONS?.Refresh_Record,
                ]}
              >
                <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
                  <Button
                    sx={styles?.refreshButton}
                    className="small"
                    onClick={handleRefresh}
                  >
                    <RefreshSharedIcon />
                  </Button>
                </Tooltip>
              </PermissionsGuard>

              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_FAQS_PERMISSIONS?.Search_and_Filter,
                ]}
              >
                <Button
                  sx={styles?.filterButton}
                  onClick={handleOpenFilters}
                  className="small"
                >
                  <FilterSharedIcon /> &nbsp; Filter
                </Button>
              </PermissionsGuard>
            </Box>
          </Box>
        </Box>
        <Box>
          <TanstackTable
            columns={getFaqsTableColumns}
            data={dataGetFaqs?.data?.faqs}
            isLoading={loagingGetFaqs}
            currentPage={dataGetFaqs?.data?.meta?.page}
            count={dataGetFaqs?.data?.meta?.pages}
            pageLimit={dataGetFaqs?.data?.meta?.limit}
            totalRecords={dataGetFaqs?.data?.meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </Box>
      </PermissionsGuard>

      <FilterDrawer
        open={openFilters}
        onClose={handleCloseFilters}
        onSubmit={handleFiltersSubmit}
        formMethods={methodsFilter}
        isLoading={loagingGetFaqs}
      />

      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isFaqsDeleteModal}
        handleClose={handleCloseModalDelete}
        handleSubmitBtn={handleDeleteFaq}
        loading={loadingDelete}
      />

      <AddFaq
        isAddModalOpen={openModalAddFaq}
        onClose={handleCloseModalFaq}
        formMethods={methodsAddFaqs}
        handleSubmit={handleAddFaqSubmit}
        isLoading={loadingAddFaq}
      />

      <EditFaq
        isModalOpen={openModalEditFaq}
        onClose={handleCloseModalEditFaq}
        formMethods={methodsEditFaq}
        handleSubmit={handleSubmitUpdateFaq}
        isLoading={loadingUpdateFaq}
        title={drawerTitle}
        onViewDisabled={onViewDisabled}
      />
    </Box>
  );
};

export default Faqs;
