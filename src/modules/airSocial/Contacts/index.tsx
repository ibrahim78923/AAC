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
} from '@/assets/icons';
import { AIR_SOCIAL } from '@/routesConstants/paths';

const Contacts = () => {
  const {
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
    isReAssign,
    handleOpenModalReAssign,
    handleCloseModalReAssign,
    openModalExport,
    handleOpenModalExport,
    handleCloseModalExport,

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
                <MenuItem disabled={!rowId} onClick={handleOpenModalReAssign}>
                  Re-assign
                </MenuItem>
                <MenuItem onClick={handleOpenModalDelete}>Delete</MenuItem>
              </Menu>
            </Box>
            <Link href={AIR_SOCIAL?.CONTACTS_RESTORE}>
              <Button
                variant="outlined"
                className="small"
                color="inherit"
                sx={{ color: theme?.palette?.custom['main'] }}
                startIcon={<RestoreIcon />}
              >
                Restore
              </Button>
            </Link>
            <>
              <Button
                onClick={handleDealCustomize}
                variant="outlined"
                className="small"
                color="inherit"
                sx={{ color: theme?.palette?.custom['main'] }}
              >
                <CutomizeIcon /> &nbsp; Customize
              </Button>
            </>
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
            <Button
              variant="outlined"
              className="small"
              color="inherit"
              sx={{ color: theme?.palette?.custom['main'] }}
              onClick={handleOpenModalExport}
            >
              <FilterIcon />
              &nbsp; Export
            </Button>
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
      <DeleteModal open={openModalDelete} onClose={handleCloseModalDelete} />
      <AssignModalBox open={isReAssign} onClose={handleCloseModalReAssign} />
      <ExportModal open={openModalExport} onClose={handleCloseModalExport} />
    </>
  );
};

export default Contacts;
