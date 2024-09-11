import { Theme } from '@mui/material';

const PUBLISHED = 'Published';
const TRAINING = 'Training';

export const styles = {
  desStyle: (des: string | undefined, theme: Theme) => ({
    bgcolor: des === PUBLISHED ? theme?.palette?.blue?.main : null,
    color:
      des === PUBLISHED
        ? theme?.palette?.common?.white
        : des === TRAINING
          ? theme?.palette?.primary?.main
          : theme?.palette?.grey?.[600],
    p: '4px 12px',
    borderRadius: des === PUBLISHED ? 6 : null,
  }),
  keywordStyle: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    color: theme?.palette?.custom?.main,
    bgcolor: 'grey.0',
    p: '4px 12px',
    borderRadius: 4,
    width: 'fit-content',
  }),
  sideStyle: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderLeft: { lg: `1px solid ${theme?.palette?.grey?.[700]}`, xs: null },
    borderTop: { lg: null, xs: `1px solid ${theme?.palette?.grey?.[700]}` },
    height: '100%',
    pl: { lg: 2, xs: 0 },
  }),
};
