import { Theme } from '@mui/material';

export const styles = {
  card: (theme: Theme) => ({
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '12px',
    padding: '12px',
    cursor: 'pointer',
  }),
  cardMedia: {
    pt: '25.69%',
    position: 'relative',
  },
  mediaInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '12px',
    overflow: 'hidden',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
  cardBody: () => ({
    display: 'flex',
    gap: '12px',
    pt: '16px',
  }),
  cardLabel: (theme: Theme) => ({
    fontSize: '16px',
    lineHeight: '1.25',
    fontWeight: 400,
    color: theme?.palette?.slateBlue?.main,
  }),
  cardText: (theme: Theme) => ({
    fontSize: '11px',
    lineHeight: '1.25',
    color: theme?.palette?.text?.primary,
    mt: '4px',
  }),
};
