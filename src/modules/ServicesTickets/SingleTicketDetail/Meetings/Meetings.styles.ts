export const meetingsStyles = {
  headingContainer: { mb: '20px' },
  buttonsBox: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '20px',
    flexDirection: { sm: 'row', xs: 'column' },
    mt: { sm: '0px', xs: '20px' },
  },
  actionButton: {
    bgcolor: '#fff !important',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    color: '#6B7280',
    fontWeight: '500',
    '&.Mui-disabled': {
      border: '1px solid #E5E7EB',
      color: '#D1D5DB',
      '& path': {
        fill: '#D1D5DB',
      },
    },
    '& path': {
      fill: '#6B7280',
    },
  },
  addMeetingButton: {
    fontWeight: '500',
  },
  widgetsBox: {
    bgcolor: 'common.white',
    borderRadius: '6px',
    boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
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
};
