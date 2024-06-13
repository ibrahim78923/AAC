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
    handleSetTabAllContacts,
    handleFiltersSubmit,
    setSearchValue,
    methodsFilter,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    selectedRow,
    setSelectedRow,
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
    isCreateViewOpen,
    handleOpenCreateView,
    handleCloseCreateView,

    isCustomize,
    setIsCustomize,
    columnsData,
    selecttedColumns,
    handleCheckboxChange,
    handleUpdateColumns,
    loadingPostColumns,
    handleOnDragEnd,
  } = useContactsSaleSite();

  const contactsColumns = ContactsColumns(
    columnsData,
    selectedRow,
    setSelectedRow,
  );

  return (
    <>
      <Box>
        <ContactsGroup />

        <ContactsHeader handleRefresh={handleSetTabAllContacts} />

        <ContactTabs
          tabsArray={tabsArray}
          tabValue={tabValue}
          handleTabChange={handleChangeTabs}
          handleCreateView={handleOpenCreateView}
        />

        <ActionsBar
          setSearchValue={setSearchValue}
          isActionsDisabled={selectedRow?.length === 0}
          disabledMenuItem={selectedRow?.length !== 1}
          anchorEl={anchorEl}
          handleActionsMenuClick={handleActionsMenuClick}
          actionMenuOpen={actionMenuOpen}
          handleActionsMenuClose={handleActionsMenuClose}
          rowId={selectedRow[0]}
          handleOpenModalReAssign={handleOpenModalReAssign}
          handleOpenModalDelete={handleOpenModalDelete}
          handleOpenCustomize={() => setIsCustomize(true)}
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

      <ContactsCustomize
        columns={selecttedColumns}
        isCustomize={isCustomize}
        setIsCustomize={setIsCustomize}
        handleOnChange={handleCheckboxChange}
        handleUpdateColumns={handleUpdateColumns}
        handleOnDragEnd={handleOnDragEnd}
        isLoading={loadingPostColumns}
      />

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
