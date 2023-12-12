import { useState } from 'react';
import { useRouter } from 'next/router';

const useQuotes = () => {
  const router = useRouter();

  // Actions Dopdown
  const [actionsEl, setActionsEl] = useState<null | HTMLElement>(null);
  const openActionsDropdown = Boolean(actionsEl);
  const handleActionsDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setActionsEl(event.currentTarget);
  };
  const handleActionsDropdownClose = () => {
    setActionsEl(null);
  };

  const handleEditQuote = () => {
    router.push('/air-sales/quotes/create-quote');
    handleActionsDropdownClose();
  };

  const handleViewQuote = () => {
    router.push('/air-sales/quotes/view-quote');
    handleActionsDropdownClose();
  };

  // Row Selection
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [isActionsDisabled, setIsActionsDisabled] = useState(true);
  const [rowId, setRowId] = useState(null);

  // Filter Drawer
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // Customize Columns Drawer
  const [checkedColumns, setcheckedColumns] = useState<any>(null);
  const [customizedColumns, setCustomizedColumns] = useState(checkedColumns);
  const [openCustomizeColumns, setOpenCustomizeColumns] = useState(false);
  const handleOpenCustomizeColumns = () => {
    setOpenCustomizeColumns(true);
  };
  const handleCloseCustomizeColumns = () => {
    setOpenCustomizeColumns(false);
  };
  const handleToggleColumns = (value: number) => () => {
    const currentIndex = checkedColumns?.indexOf(value);
    const newChecked = [...checkedColumns];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setcheckedColumns(newChecked);
  };
  const handleApplyColumns = () => {
    customizedColumns.filter((column: any) =>
      checkedColumns.includes(column.id),
    );
  };

  // Modal Delete Quote
  const [openDeleteQuote, setOpenDeleteQuote] = useState(false);
  const handleOpenDeleteQuote = () => {
    setOpenDeleteQuote(true);
    handleActionsDropdownClose();
  };
  const handleCloseDeleteQuote = () => {
    setOpenDeleteQuote(false);
  };

  return {
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    rowId,
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
    checkedColumns,
    setcheckedColumns,
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
