import { TableCell, TableRow, styled, tableCellClasses } from '@mui/material';

// ----------------------------------------------------------------------
// STYLED COMPONENTS
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#1D2939',
    fontSize: '14px',
    lineHeight: '18px',
    borderBottom: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    background: '#F9FAFB',
    fontWeight: theme?.typography?.fontWeightMedium,
    backgroundImage: 'unset',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    zIndex: '1',
    '&:first-child': {
      borderLeft: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    },
    '&:last-child': {
      borderRight: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    },
  },
  [`&.${tableCellClasses?.root}`]: {
    boxShadow: 'unset !important',
  },

  [`&.${tableCellClasses?.body}`]: {
    fontSize: '14px',
    fontStyle: 'initial',
    color: '#6B7280',
    textTransform: 'capitalize',
    lineHeight: '18px',
    fontFamily: theme?.typography?.fontFamily,
    fontWeight: theme?.typography?.fontWeightRegular,
    borderBottom: 'none',
    whiteSpace: 'pre-wrap',
    '&:first-child': {
      borderLeft: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    },
    '&:last-child': {
      borderRight: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    },
  },
}));

export const StyledTableRow = styled(TableRow)((theme: any) => ({
  borderBottom: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
}));

export const styles = {
  cell: {
    display: 'flex',
    alignItems: 'center',
  },
};
