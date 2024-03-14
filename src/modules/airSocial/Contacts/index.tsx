import Link from 'next/link';

import { Box, Button, Menu, MenuItem, Tooltip } from '@mui/material';

import CommonTabs from '@/components/Tabs';

import CreateView from './CreateView';

import { ContactsSaleSite } from './ContactsSaleSite.data';
import ContactsCustomize from './ContactsCustomize';
import ContactsFilterDrawer from './ContactsFilterDrawer';
import ContactsTable from './ContactsTable';
import useContactsSaleSite from './useContactsSaleSite';
import ContactsHeader from './ContactsHeader';
import DeleteModal from './ContactsModalBox/DeleteModal';
import AssignModalBox from './ContactsModalBox/AssignModalBox';
import ExportModal from './ContactsModalBox/ExportModal';
import { ContactsColumns } from './ContactsTable/ContactsTable.data';

import {
  FilterIcon,
  RestoreIcon,
  CutomizeIcon,
  RefreshTasksIcon,
  DownIcon,
  ExportCloudIcon,
} from '@/assets/icons';
import { AIR_SOCIAL } from '@/routesConstants/paths';
import { useRouter } from 'next/router';
// import ContactsGroup from '@/modules/airMarketer/WhatsAppMarketing/WhatsAppMarketingComponent/Contacts/contactsGroup';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS } from '@/constants/permission-keys';
import ContactsGroup from './ContactsGroup';

const Contacts = () => {
  const router = useRouter();
  const {
    contactOwnerData,
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    dataGetContacts,
    loadingGetContacts,
    setPage,
    setPageLimit,
    handlePageChange,
    handleRefresh,
    handleFiltersSubmit,
    searchValue,
    setSearchValue,
    methodsFilter,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteContact,
    loadingDelete,
    methodsReAssign,
    isReAssign,
    handleOpenModalReAssign,
    handleCloseModalReAssign,
    handleSubmitReAssign,
    loadingReassign,
    openModalExport,
    handleOpenModalExport,
    setOpenModalExport,

    theme,
    isOpen,
    isDealCustomize,
    handleChange,
    handleDealCustomize,
  } = useContactsSaleSite();

  const contactsColumns = ContactsColumns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

  return (
    <>
      <ContactsGroup />
      <ContactsHeader />
      <CommonTabs
        tabsArray={ContactsSaleSite}
        addIcon
        onAddClick={handleChange}
        isHeader={true}
        searchBarProps={{
          label: 'Search Here',
          setSearchBy: setSearchValue,
          searchBy: searchValue,
          width: '260px',
        }}
        headerChildren={
          <>
            <Box>
              <Button
                variant="outlined"
                className="small"
                color="inherit"
                onClick={handleActionsMenuClick}
                disabled={isActionsDisabled}
                classes={{ outlined: 'outlined_btn' }}
              >
                Actions &nbsp; <DownIcon />
              </Button>
              <Menu
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
                <MenuItem
                  disabled={!rowId}
                  onClick={() =>
                    router.push(`${AIR_SOCIAL?.CONTACTS}/${rowId}`)
                  }
                >
                  View Details
                </MenuItem>
                <MenuItem disabled={!rowId} onClick={handleOpenModalReAssign}>
                  Re-assign
                </MenuItem>
                <MenuItem onClick={handleOpenModalDelete}>Delete</MenuItem>
              </Menu>
            </Box>
            <Link href={AIR_SOCIAL?.CONTACTS_RESTORE}>
              <PermissionsGuard
                permissions={[SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.RESTORE]}
              >
                <Button
                  variant="outlined"
                  className="small"
                  color="inherit"
                  sx={{ color: theme?.palette?.custom['main'] }}
                  startIcon={<RestoreIcon />}
                >
                  Restore
                </Button>
              </PermissionsGuard>
            </Link>
            <>
              <PermissionsGuard
                permissions={[
                  SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.CUSTOMIZE_COLUMNS,
                ]}
              >
                <Button
                  onClick={handleDealCustomize}
                  variant="outlined"
                  className="small"
                  color="inherit"
                  sx={{ color: theme?.palette?.custom['main'] }}
                >
                  <CutomizeIcon /> &nbsp; Customize
                </Button>
              </PermissionsGuard>
            </>
            <PermissionsGuard
              permissions={[SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.FILTER]}
            >
              <Button
                variant="outlined"
                className="small"
                color="inherit"
                sx={{ color: theme?.palette?.custom['main'] }}
                onClick={handleOpenFilters}
              >
                <FilterIcon />
                &nbsp; Filter
              </Button>
            </PermissionsGuard>

            <PermissionsGuard
              permissions={[SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.FILTER]}
            >
              <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
                <Button
                  variant="outlined"
                  color="inherit"
                  className="small"
                  onClick={handleRefresh}
                >
                  <RefreshTasksIcon />
                </Button>
              </Tooltip>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.EXPORT_CONTACTS,
              ]}
            >
              <Button
                variant="outlined"
                className="small"
                color="inherit"
                sx={{ color: theme?.palette?.custom['main'] }}
                onClick={handleOpenModalExport}
              >
                <ExportCloudIcon />
                &nbsp; Export
              </Button>
            </PermissionsGuard>
          </>
        }
      >
        <ContactsTable
          columns={contactsColumns}
          isLoading={loadingGetContacts}
          data={dataGetContacts}
          onPageChange={handlePageChange}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </CommonTabs>
      <CreateView open={isOpen} onClose={handleChange} />
      <ContactsCustomize open={isDealCustomize} onClose={handleDealCustomize} />
      <ContactsFilterDrawer
        open={openFilters}
        onClose={handleCloseFilters}
        methods={methodsFilter}
        onSubmit={handleFiltersSubmit}
      />
      <DeleteModal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        handleSubmit={handleDeleteContact}
        loading={loadingDelete}
      />
      <AssignModalBox
        open={isReAssign}
        onClose={handleCloseModalReAssign}
        contactOwnerData={contactOwnerData}
        methods={methodsReAssign}
        handleSubmit={handleSubmitReAssign}
        loading={loadingReassign}
      />
      <ExportModal open={openModalExport} onClose={setOpenModalExport} />
    </>
  );
};

export default Contacts;
