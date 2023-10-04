export const paddingStyle = {
  '& .Mui-selected': {
    backgroundColor: 'custom.dark',
    margin: '0',
  },
  '& .MuiPaginationItem-root': {
    height: '40px',
    width: '40px',
    border: '1px solid #D1D5DB',
    borderRadius: '1px',
    color: 'custom.main',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const iconStyle = {
  padding: '8px',
  borderRadius: '0 8px 8px 0',
  height: '40px',
  width: '40px',
  border: '1px solid #D1D5DB',
  margin: '0',
};

export const iconStyleTwo = {
  padding: '8px',
  borderRadius: '8px 0 0 8px',
  height: '40px',
  width: '40px',
  border: '1px solid #D1D5DB',
  margin: '0',
};

export const tablePaginationStyle = {
  '& .MuiTablePagination-select': {
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'custom.main',
    height: '20px',
    width: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
  },
  '.MuiTablePagination-select:focus': {
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
  },
  '.MuiTablePagination-selectLabel': {
    fontWeight: '500',
    color: 'custom.main',
  },
  '.MuiTablePagination-displayedRows': {
    fontWeight: '500',
    marginLeft: '-25px',
    color: 'custom.main',
  },
  '& .MuiTablePagination-actions': {
    display: 'none',
  },
  '& .MuiTablePagination-selectIcon': {
    margin: '2px 5px 0 0',
  },
};
