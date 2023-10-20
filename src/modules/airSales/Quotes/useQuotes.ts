import { useState } from 'react';
import { useRouter } from 'next/router';
import { initColumns } from './Quotes.data';

const useQuotes = () => {
  const router = useRouter();
  const [actionsEl, setActionsEl] = useState<null | HTMLElement>(null);
  const openActionsDropdown = Boolean(actionsEl);
  const [openFilter, setOpenFilter] = useState(false);
  const [openCustomizeColumns, setOpenCustomizeColumns] = useState(false);
  const [colsChecked, setColsChecked] = useState(
    initColumns.map((col: any) => col.id),
  );
  const [customizedColumns, setCustomizedColumns] = useState(initColumns);
  const [openDeleteQuote, setOpenDeleteQuote] = useState(false);
  const handleActionsDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setActionsEl(event.currentTarget);
  };
  const handleActionsDropdownClose = () => {
    setActionsEl(null);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleOpenCustomizeColumns = () => {
    setOpenCustomizeColumns(true);
  };
  const handleCloseCustomizeColumns = () => {
    setOpenCustomizeColumns(false);
  };

  const handleToggleColumns = (value: number) => () => {
    const currentIndex = colsChecked.indexOf(value);
    const newChecked = [...colsChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setColsChecked(newChecked);
  };

  const handleApplyColumns = () => {
    const col = customizedColumns.filter((column: any) =>
      colsChecked.includes(column.id),
    );
    setCustomizedColumns(col);
  };

  const handleEditQuote = () => {
    router.push('/air-sales/quotes/create-quote');
    handleActionsDropdownClose();
  };

  const handleViewQuote = () => {
    router.push('/air-sales/quotes/view-quote');
    handleActionsDropdownClose();
  };

  const handleOpenDeleteQuote = () => {
    setOpenDeleteQuote(true);
    handleActionsDropdownClose();
  };
  const handleCloseDeleteQuote = () => {
    setOpenDeleteQuote(false);
  };

  return {
    actionsEl,
    openActionsDropdown,
    handleActionsDropdown,
    handleActionsDropdownClose,
    openFilter,
    handleOpenFilter,
    handleCloseFilter,
    openCustomizeColumns,
    handleOpenCustomizeColumns,
    handleCloseCustomizeColumns,
    handleToggleColumns,
    colsChecked,
    customizedColumns,
    setCustomizedColumns,
    handleApplyColumns,
    handleEditQuote,
    handleViewQuote,
    openDeleteQuote,
    handleOpenDeleteQuote,
    handleCloseDeleteQuote,
  };
};

export default useQuotes;
