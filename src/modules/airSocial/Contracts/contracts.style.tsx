export const styles = {
  circleIconStyle: { ml: 'auto', mt: 0.5, cursor: 'pointer' },
  tabRoot: (theme: any) => ({
    '.MuiTabScrollButton-root.Mui-disabled': { opacity: 1, color: 'grey.0' },
    '.MuiTab-root': { marginRight: `1rem !important` },
    borderBottom: 1,
    borderColor: theme?.palette?.primary?.lighter,
  }),

  tabIndicator: (theme: any) => ({
    sx: { background: theme?.palette?.primary?.main },
  }),
  tabsStyle: (theme: any) => ({
    paddingX: 2,
    borderRadius: '.5rem',
    color: theme?.palette?.grey?.[900],
    fontSize: '0.875rem',
    fontWeight: 500,
    '&.Mui-selected ': {
      fontWeight: 700,
      color: theme?.palette?.primary?.main,
      backgroundColor: theme?.palette?.primary?.lighter,
    },
  }),
  exposeMenuOnHover: (activeFolder: any, item: any, theme: any) => ({
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'space-between',
    ...(activeFolder?._id === item?._id && {
      background: theme?.palette?.custom?.light_lavender_gray,
    }),
    height: '40px',
    '&:hover': {
      '& .menu-toggle': { opacity: '1 !important', transition: '0.3s' },
    },
    '&:focus': {
      '& .menu-toggle': { opacity: '1 !important', transition: '0.3s' },
    },
  }),
  exposeFolderMenuOnHover: () => ({
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'space-between',
    // ...(activeFolder?._id === item?._id && {
    //   background: theme?.palette?.custom?.light_lavender_gray,
    // }),
    height: '40px',
    '&:hover': {
      '& .menu-toggle': { opacity: '1 !important', transition: '0.3s' },
    },
    '&:focus': {
      '& .menu-toggle': { opacity: '1 !important', transition: '0.3s' },
    },
  }),
};
