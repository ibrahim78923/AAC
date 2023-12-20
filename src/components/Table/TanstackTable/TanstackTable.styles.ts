import { TableCell, TableRow, styled, tableCellClasses } from '@mui/material';

// ----------------------------------------------------------------------
// STYLED COMPONENTS
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses?.head}`]: {
    color: theme?.palette?.blue?.main,
    fontSize: '14px',
    lineHeight: '18px',
    borderBottom: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    borderTop: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    backgroundColor: theme?.palette?.grey?.[100],
    fontWeight: 600,
    backgroundImage: 'unset',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    zIndex: '1',
    '&:first-of-type': {
      borderLeft: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    },
    '&:last-of-type': {
      borderRight: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    },
  },
  [`&.${tableCellClasses?.root}`]: {
    boxShadow: 'unset !important',
  },

  [`&.${tableCellClasses?.body}`]: {
    fontSize: '13px',
    color: theme?.palette?.custom?.main,
    lineHeight: '18px',
    fontFamily: theme?.typography?.fontFamily,
    fontWeight: 500,
    whiteSpace: 'pre-wrap',
    borderBottom: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    '&:first-of-type': {
      borderLeft: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    },
    '&:last-of-type': {
      borderRight: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
    },
  },
}));

export const StyledTableRow = styled(TableRow)((theme: any) => ({
  border: `1px solid  ${theme?.palette?.custom?.off_white_three}`,
}));

export const styles = {
  cell: {
    display: 'flex',
    alignItems: 'center',
  },
};
