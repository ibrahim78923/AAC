import { Switch, styled } from '@mui/material';

export const styles = (matches: boolean) => ({
  createDashboardButton: {
    fontWeight: 500,
    fontSize: '1rem',
    p: '1.125rem',
    width: matches ? '100%' : 202,
    display: 'flex',
  },
  tableBox: {
    border: '1px solid',
    borderColor: 'custom.off_white_three',
    borderRadius: 2,
    mt: 3,
  },
  tableHeaderBox: {
    p: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 1.5,
  },
  filterButton: {
    fontWeight: 500,
    p: '0.75rem',
    height: 36,
    width: matches ? '100%' : 95,
    color: 'custom.main',
  },
});
export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  marginRight: '10px',
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 18,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(15px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: '50%',
    transition: theme?.transitions?.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 12,
    opacity: 1,
    backgroundColor:
      theme?.palette?.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));
