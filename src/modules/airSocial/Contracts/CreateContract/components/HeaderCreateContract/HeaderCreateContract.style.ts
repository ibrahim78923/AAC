// import { Theme } from '@mui/material';

export const styles = {
  toolbar: () => ({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  }),

  left: () => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }),

  headerTitle: () => ({
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '1.25',
    color: '#1D2939',
  }),

  backButton: () => ({
    cursor: 'pointer',
    display: 'flex',
  }),

  statusBadge: () => ({
    color: '#4A1FB8',
    fontSize: '11px',
    fontWeight: '500',
    lineHeight: '1.33',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: '#EBE9FE',
  }),

  right: () => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }),
};
