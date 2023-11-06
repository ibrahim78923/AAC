export const styles = {
  headingContainer: { mb: '20px' },
  buttonsBox: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '20px',
    flexDirection: { sm: 'row', xs: 'column' },
    mt: { sm: '0px', xs: '20px' },
  },

  addMeetingButton: {
    fontWeight: '500',
  },
  widgetsBox: {
    bgcolor: 'common.white',
    borderRadius: '6px',
    boxShadow: 4,
    display: 'flex',
  },
  coloredWidgetsDiv: (color: string) => ({
    width: '6px',
    height: '52px',
    mr: '22px',
    borderRadius: '6px 0px 0px 6px',
    bgcolor: color,
  }),
  widgetsInnerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: '11px 11px',
    width: '100%',
    pl: 0,
  },
  popOverStyles: {
    mt: '10px',
    '& .MuiPaper-root': {
      borderRadius: '8px',
      background: 'common.white',
    },
  },
};
