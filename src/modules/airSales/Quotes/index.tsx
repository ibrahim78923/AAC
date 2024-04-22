import { Box } from '@mui/material';
import { AlertModals } from '@/components/AlertModals';
import TanstackTable from '@/components/Table/TanstackTable';
import TableToolbar from './TableToolbar';
import PageHeader from './PageHeader';
import FilterQuotes from './FilterQuotes';
import useQuotes from './useQuotes';
import CustomizeColumns from './CustomizeColumns';
import { quotesColumns } from './Quotes.data';
import { styles } from './Quotes.style';
import { useEffect } from 'react';
import useCustomizeColumn from './CustomizeColumns/useCustomizeColumn';

const Quotes = () => {
  const {
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    isActionsDisabled,
    setIsActionsDisabled,
    rowId,
    setRowId,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    setSearchValue,
    openCustomizeColumns,
    handleOpenCustomizeColumns,
    handleCloseCustomizeColumns,
    setcheckedColumns,
    handleEditQuote,
    handleViewQuote,
    openDeleteQuote,
    handleOpenDeleteQuote,
    handleCloseDeleteQuote,
    dataGetQuotes,
    loagingGetQuotes,
    handleFiltersSubmit,
    methodsFilter,
    handleRefresh,
    handleDeleteQoute,
  } = useQuotes();

  const { activeColumns } = useCustomizeColumn({});

  const getQuotesColumns = quotesColumns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
    activeColumns,
  );

  useEffect(() => {
    setcheckedColumns(getQuotesColumns?.map((column: any) => column?.id));
  }, []);
  return (
    <>
      <Box sx={styles?.TableWrapper}>
        <PageHeader />

        <TableToolbar
          setSearchValue={setSearchValue}
          handleFilters={handleOpenFilters}
          handleCustomizeColumns={handleOpenCustomizeColumns}
          handleResetFilters={handleRefresh}
          handleEditQuote={() => handleEditQuote(rowId)}
          handleViewQuote={handleViewQuote}
          handleOpenDeleteQuote={handleOpenDeleteQuote}
          isActionsDisabled={isActionsDisabled}
          rowId={rowId}
        />

        <TanstackTable
          columns={getQuotesColumns}
          data={dataGetQuotes?.data?.quotes}
          isLoading={loagingGetQuotes}
          currentPage={dataGetQuotes?.data?.meta?.page}
          count={dataGetQuotes?.data?.meta?.pages}
          pageLimit={dataGetQuotes?.data?.meta?.limit}
          totalRecords={dataGetQuotes?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </Box>

      {openFilters && (
        <FilterQuotes
          open={openFilters}
          onClose={handleCloseFilters}
          methods={methodsFilter}
          onFilterSubmit={handleFiltersSubmit}
        />
      )}

      {openCustomizeColumns && (
        <CustomizeColumns
          open={openCustomizeColumns}
          onClose={handleCloseCustomizeColumns}
        />
      )}
      {openDeleteQuote && (
        <AlertModals
          message="You're about to delete a record. Are you sure?"
          type="delete"
          open={openDeleteQuote}
          handleClose={handleCloseDeleteQuote}
          handleSubmitBtn={handleDeleteQoute}
        />
      )}
    </>
  );
};
export default Quotes;
