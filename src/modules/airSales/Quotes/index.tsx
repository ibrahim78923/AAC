import { Box } from '@mui/material';
import { AlertModals } from '@/components/AlertModals';
import { quotesListData } from '@/mock/modules/Quotes';
import TanstackTable from '@/components/Table/TanstackTable';
import TableToolbar from './TableToolbar';
import PageHeader from './PageHeader';
import CustomPagination from '@/components/CustomPagination';
import FilterQuotes from './FilterQuotes';
import useQuotes from './useQuotes';
import CustomizeColumns from './CustomizeColumns';
import { quotesColumns } from './Quotes.data';
import { styles } from './Quotes.style';
import { useEffect } from 'react';

const Quotes = () => {
  const {
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
    openFilter,
    handleCloseFilter,
    handleOpenFilter,
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
          handleFilters={handleOpenFilter}
          handleCustomizeColumns={handleOpenCustomizeColumns}
          handleResetFilters={() => alert('Refresh')}
          handleEditQuote={handleEditQuote}
          handleViewQuote={handleViewQuote}
          handleOpenDeleteQuote={handleOpenDeleteQuote}
        />

        <TanstackTable columns={getQuotesColumns} data={quotesListData} />

        <CustomPagination
          count={3}
          rowsPerPageOptions={[6, 10, 25, 50, 100]}
          entriePages={quotesListData.length}
        />
      </Box>

      <FilterQuotes open={openFilter} onClose={handleCloseFilter} />

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
