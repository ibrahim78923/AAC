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

const Quotes = () => {
  const {
    setPageLimit,
    setPage,
    handlePageChange,
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
    checkedColumns,
    setcheckedColumns,
    handleToggleColumns,
    handleApplyColumns,
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
  } = useQuotes();

  const getQuotesColumns = quotesColumns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

  useEffect(() => {
    setcheckedColumns(getQuotesColumns?.map((column: any) => column.id));
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
          isPagination
          count={dataGetQuotes?.data?.meta?.pages}
          totalRecords={dataGetQuotes?.data?.meta?.total}
          onPageChange={handlePageChange}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </Box>

      <FilterQuotes
        open={openFilters}
        onClose={handleCloseFilters}
        methods={methodsFilter}
        onFilterSubmit={handleFiltersSubmit}
      />

      <CustomizeColumns
        open={openCustomizeColumns}
        onClose={handleCloseCustomizeColumns}
        columns={getQuotesColumns}
        onSubmit={handleApplyColumns}
        checkedColumns={checkedColumns}
        handleToggleColumns={handleToggleColumns}
      />

      <AlertModals
        message="You're about to delete a record. Are you sure?"
        type="delete"
        open={openDeleteQuote}
        handleClose={handleCloseDeleteQuote}
        handleSubmit={handleCloseDeleteQuote}
      />
    </>
  );
};
export default Quotes;
