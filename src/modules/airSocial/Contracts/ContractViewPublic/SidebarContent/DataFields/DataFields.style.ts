import { Theme } from '@mui/material';

export const styles = {
  allFields: {
    padding: '18px 0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    mb: '24px',
  },
  title: {
    fontSize: '12px',
    fontWeight: '700',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    gap: '10px',
  },
  fieldInfo: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  fieldName: {
    fontSize: '12px',
    lineHeight: '1.25',
  },
  fieldValue: (theme: Theme) => ({
    fontSize: 11,
    color: theme?.palette?.custom?.light,
  }),
};
