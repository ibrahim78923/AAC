import { useState, useMemo } from 'react';
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  MenuItem,
  TableSortLabel,
  Paper,
  Checkbox,
  Table,
  Button,
  Menu,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { ArrowDropDown } from '@mui/icons-material';

interface Data {
  invoiceAmount: string;
  linkedQuote: string;
  status: string;
  invoiceName: string;
  createdBy: string;
  createdDate: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'invoiceName',
    label: 'Invoice Name',
  },
  {
    id: 'invoiceAmount',
    label: 'Invoice Amount',
  },
  {
    id: 'status',
    label: 'Status',
  },
  {
    id: 'linkedQuote',
    label: 'Linked Quote',
  },
  {
    id: 'createdBy',
    label: 'Created By',
  },
  {
    id: 'createdDate',
    label: 'Created Date',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const ListViewTable = (props: EnhancedTableProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const InvoicesTable = (props: any) => {
  const { selected, setSelected } = props;
  const [order, setOrder] = useState<Order>('asc');
  const [selectedValue, setSelectedValue] = useState(null);
  const [orderBy, setOrderBy] = useState<keyof Data>('invoiceAmount');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const rows: any = [
    {
      invoiceName: 'Iphone accessories',
      invoiceAmount: '£20',
      status: 'paid',
      linkedQuote: 'Iphone import from Uk',
      createdBy: 'Azeem Aslam',
      createdDate: '23/09/2023',
    },
    {
      invoiceName: 'Tablet accessories',
      invoiceAmount: '£20',
      status: 'Published',
      linkedQuote: 'Iphone import from Uk',
      createdBy: 'Azeem Aslam',
      createdDate: '23/09/2023',
    },
    {
      invoiceName: 'Computer accessories',
      invoiceAmount: '£20',
      status: 'paid',
      linkedQuote: 'Iphone import from Uk',
      createdBy: 'Azeem Aslam',
      createdDate: '23/09/2023',
    },
    {
      invoiceName: 'Mobile accessories',
      invoiceAmount: '£20',
      status: 'Draft',
      linkedQuote: 'Iphone import from Uk',
      createdBy: 'Azeem Aslam',
      createdDate: '23/09/2023',
    },
    {
      invoiceName: 'Mac accessories',
      invoiceAmount: '£20',
      status: 'View',
      linkedQuote: 'Iphone import from Uk',
      createdBy: 'Azeem Aslam',
      createdDate: '23/09/2023',
    },
    {
      invoiceName: 'Electric accessories',
      invoiceAmount: '£20',
      status: 'paid',
      linkedQuote: 'Iphone import from Uk',
      createdBy: 'Azeem Aslam',
      createdDate: '23/09/2023',
    },
    {
      invoiceName: 'Electronic accessories',
      invoiceAmount: '£20',
      status: 'Published',
      linkedQuote: 'Iphone import from Uk',
      createdBy: 'Azeem Aslam',
      createdDate: '23/09/2023',
    },
  ];

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.invoiceName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  const handleStatusClick = (event: any) => {
    setSelectedValue(event.currentTarget);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <ListViewTable
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row: any, index) => {
                const isItemSelected = isSelected(row.invoiceName);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.invoiceName}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.invoiceName)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.invoiceName}
                    </TableCell>
                    <TableCell>{row.invoiceAmount}</TableCell>
                    <TableCell align="left">
                      <Box>
                        <Button
                          onClick={handleStatusClick}
                          sx={{
                            border: '1px solid #D1D5DB',
                            color: '#6B7280',
                            borderRadius: '30px',
                            padding: '3px 8px',
                          }}
                        >
                          {row.status}
                          <ArrowDropDown />
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={selectedValue}
                          open={Boolean(selectedValue)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>Paid</MenuItem>
                          <MenuItem onClick={handleClose}>Published</MenuItem>
                          <MenuItem onClick={handleClose}>Download</MenuItem>
                        </Menu>
                      </Box>
                    </TableCell>
                    <TableCell>{row.linkedQuote}</TableCell>
                    <TableCell>{row.createdBy}</TableCell>
                    <TableCell>{row.createdDate}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default InvoicesTable;
