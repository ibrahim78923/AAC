import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { FaqI, ColumnPropsI } from './FaqInterface';

export const columns = (
  selectedRow: string[],
  setSelectedRow: React.Dispatch<React.SetStateAction<string[]>>,
  setRowId: React.Dispatch<React.SetStateAction<string | null>>,
): ColumnPropsI[] => {
  const handleRowClick = (id: string) => {
    const selectedIndex = selectedRow?.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRow, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRow.slice(1));
    } else if (selectedIndex === selectedRow.length - 1) {
      newSelected = newSelected.concat(selectedRow.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRow.slice(0, selectedIndex),
        selectedRow.slice(selectedIndex + 1),
      );
    }
    setSelectedRow(newSelected);
    if (newSelected.length === 1) {
      setRowId(newSelected[0]);
    } else {
      setRowId(null);
    }
  };

  // Select All Row
  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    rows: FaqI[],
  ) => {
    if (event?.target?.checked) {
      const newSelected = rows?.map((n) => n?._id);
      setSelectedRow(newSelected);
      return;
    } else {
      setSelectedRow([]);
    }
  };

  const isSelected = (id: string) => selectedRow?.indexOf(id) !== -1;

  return [
    {
      accessorFn: (row: FaqI) => row._id,
      id: '_id',
      cell: (info) => {
        return (
          <Checkbox
            color="primary"
            checked={isSelected(info?.cell?.row?.original?._id)}
            name={info?.cell?.row?.original?._id}
            onClick={() => {
              handleRowClick(info?.cell?.row?.original?._id);
            }}
          />
        );
      },
      header: (info) => {
        const rows = info?.table?.options?.data;
        return (
          <Checkbox
            color="primary"
            indeterminate={
              selectedRow?.length > 0 && selectedRow?.length < rows?.length
            }
            checked={rows?.length > 0 && selectedRow?.length === rows?.length}
            onChange={(event) => handleSelectAllClick(event, rows)}
          />
        );
      },
      isSortable: false,
    },
    {
      accessorFn: (row: FaqI) => row?.faqQuestion,
      id: 'faqQuestion',
      cell: (info) => info?.getValue(),
      header: 'Question',
      isSortable: false,
    },
    {
      accessorFn: (row: FaqI) => row?.faqCategory,
      id: 'faqCategory',
      isSortable: true,
      header: 'FAQ Category',
      cell: (info) => info?.getValue()?.name,
    },
    {
      accessorFn: (row: FaqI) => row?.faqAnswer,
      id: 'faqAnswer',
      isSortable: true,
      header: 'Answer',
      cell: (info) => {
        const response = info?.getValue()?.replace(/<[^>]*>/g, '');
        return <>{response}</>;
      },
    },
    {
      accessorFn: (row: FaqI) => row?.createdBy,
      id: 'createdBy',
      isSortable: true,
      header: 'Created By',
      cell: (info) => info?.getValue()?.name,
    },
    {
      accessorFn: (row: FaqI) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },
  ];
};
