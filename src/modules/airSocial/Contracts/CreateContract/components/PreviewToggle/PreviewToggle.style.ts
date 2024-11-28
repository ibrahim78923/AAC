import { Theme } from '@mui/material';

export const styles = {
  previewToggle: () => ({
    width: '198px',
    border: '1px solid #EAECF0',
    backgroundColor: '#F2F4F7',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px',
    gap: '3px',
  }),

  viewButton: (theme: Theme, active: boolean) => ({
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px',
    cursor: 'pointer',
    backgroundColor: active ? theme?.palette?.common?.white : 'transparent',
    color: active ? '#1D2939' : '#6B7C93',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '1.25',
    borderRadius: '5px',
    gap: '7px',
  }),
};
