export const styles = {
  calendarHeader: () => ({
    border: `1px solid red`,
    borderRadius: '8px',
    boxShadow: `0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A`,
  }),
  parentBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    bgcolor: '#fff',
    p: 2,
    borderRadius: '20px',
    '@media (max-width:1200px)': {
      width: '60vw',
    },
    '@media (max-width:581px)': {
      width: '90vw',
    },
  },
  '.fc .fc-toolbar.fc-header-toolbar': {
    marginTop: '-42px',
    /* Add other styles as needed */
  },
  '.fc-direction-ltr .fc-toolbar > * > :not(:first-child), .fc .fc-button:not(:disabled)':
    {
      backgroundColor: 'white',
      borderColor: 'transparent',
      color: 'black',
    },
  '.fc .fc-button-primary:focus': {
    boxShadow: 'none',
  },
  '.fc-Prev-button': {
    backgroundColor: '#6b7280 !important',
    color: '#ffffff !important',
    borderRadius: '8px !important',
  },
  '.fc-Next-button': {
    backgroundColor: '#6b7280 !important',
    color: '#ffffff !important',
    borderRadius: '8px !important',
  },
  '.fc-today-button': {
    fontSize: '14px !important',
    fontWeight: '500 !important',
    color: '#6b7280 !important',
  },
};
