import { Box } from '@mui/material';
import CreateView from './CreateView';
import ContactsCustomize from './ContactsCustomize';
import ContactsFilterDrawer from './ContactsFilterDrawer';
import ContactsTable from './ContactsTable';
import useContactsSaleSite from './useContactsSaleSite';
import ContactsHeader from './ContactsHeader';
import DeleteModal from './ContactsModalBox/DeleteModal';
import AssignModalBox from './ContactsModalBox/AssignModalBox';
import ExportModal from './ContactsModalBox/ExportModal';
import { ContactsColumns } from './ContactsTable/ContactsTable.data';
import ContactsGroup from './ContactsGroup';
import ActionsBar from './ActionsBar';
import ContactTabs from './ContactTabs';

const Contacts = () => {
  const {
    tabValue,
    handleChangeTabs,
    tabsArray,
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    dataGetContacts,
    loadingGetContacts,
    fetchingGetContacts,
    setPage,
    setPageLimit,
    handleRefresh,
    handleFiltersSubmit,
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
    isDealCustomize,
    handleDealCustomize,
    isCreateViewOpen,
    handleOpenCreateView,
    handleCloseCreateView,
  } = useContactsSaleSite();

  const contactsColumns = ContactsColumns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

  return (
    <>
      <Box>
        <ContactsGroup />

        <ContactsHeader />

        <ContactTabs
          tabsArray={tabsArray}
          tabValue={tabValue}
          handleTabChange={handleChangeTabs}
          handleCreateView={handleOpenCreateView}
        />

        <ActionsBar
          setSearchValue={setSearchValue}
          isActionsDisabled={isActionsDisabled}
          anchorEl={anchorEl}
          handleActionsMenuClick={handleActionsMenuClick}
          actionMenuOpen={actionMenuOpen}
          handleActionsMenuClose={handleActionsMenuClose}
          rowId={rowId}
          handleOpenModalReAssign={handleOpenModalReAssign}
          handleOpenModalDelete={handleOpenModalDelete}
          handleDealCustomize={handleDealCustomize}
          handleOpenFilters={handleOpenFilters}
          handleRefresh={handleRefresh}
          handleOpenModalExport={handleOpenModalExport}
        />

        <ContactsTable
          columns={contactsColumns}
          isLoading={loadingGetContacts || fetchingGetContacts}
          data={dataGetContacts}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </Box>

      <CreateView open={isCreateViewOpen} onClose={handleCloseCreateView} />

      <ContactsCustomize open={isDealCustomize} onClose={handleDealCustomize} />

      <ContactsFilterDrawer
        open={openFilters}
        onClose={handleCloseFilters}
        methods={methodsFilter}
        onSubmit={handleFiltersSubmit}
        isLoading={loadingGetContacts}
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
        methods={methodsReAssign}
        handleSubmit={handleSubmitReAssign}
        loading={loadingReassign}
      />

      <ExportModal open={openModalExport} onClose={setOpenModalExport} />
    </>
  );
};

export default Contacts;
