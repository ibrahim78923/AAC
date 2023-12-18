export const style = {
  listItem: (palette: any) => ({
    display: 'list-item',
    textTransform: 'capitalize',
    color: palette?.grey?.[900],
    '&::before': {
      content: '""',
      width: 6,
      height: 6,
      background: palette?.grey?.[900],
      position: 'absolute',
      bottom: 14,
      left: 0,
      borderRadius: 1,
    },
  }),
};
