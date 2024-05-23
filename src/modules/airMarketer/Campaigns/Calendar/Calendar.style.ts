export const styles = {
  '.fc-col-header-cell': {
    backgroundColor: '#F9FAFB',
    height: '30px !important',
  },
  '.fc-scrollgrid-sync-inner': {
    position: 'relative',
  },
  '.fc-daygrid-day': {
    height: '157px !important',
    overflowY: 'scroll !important',
  },
  '.fc-h-event': {
    backgroundColor: 'transparent',
    border: 'none',
  },
  '.plus-button-container': {
    margin: 'auto',
    position: 'absolute',
    top: 145,
    right: 5,
    transform: 'translateX(-50%)',
  },
  '@media  (max-width: 768px)': {
    '.fc .fc-toolbar.fc-header-toolbar': {
      flexWrap: 'wrap',
    },
    ' .fc .fc-toolbar.fc-header-toolbar .fc-toolbar-chunk': {
      marginBottom: '10px',
    },

    ' .fc .fc-toolbar.fc-header-toolbar .fc-toolbar-chunk:first-child': {
      order: '2',
      width: '100%',
    },

    ' .fc .fc-toolbar.fc-header-toolbar .fc-toolbar-chunk:nth-child(2)': {
      order: '1',
      width: ' 100%',
    },

    '.fc.fc - toolbar.fc - header - toolbar.fc - toolbar - chunk: last- child':
      {
        order: '3',
        width: '100 %',
      },
  },

  '@media  (max-width: 1850px)': {
    '.plus-button-container': {
      top: 120,
    },
  },
};
