export const styles = {
  columnsList: (theme: any) => ({
    '& .MuiListItem-root': {
      mt: '16px',
    },
    '& .MuiListItemButton-root': {
      borderRadius: '8px',
      p: '10px 16px',
      height: '44px',
      border: `1.5px solid ${theme?.palette?.grey[700]}`,
      '&.selected': {
        bgcolor: theme?.palette?.grey[100],
        borderColor: theme?.palette?.grey[100],
      },
    },
    '& .MuiListItemIcon-root': {
      mr: '8px',
    },
  }),
};
