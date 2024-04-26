export const styles = {
  dpWrapper: () => ({
    '& .react-datepicker-wrapper': {
      display: 'block',
    },
  }),
  dpContainer: () => ({
    bgcolor: '#fff',
    border: `1px solid #E6E6E6`,
    borderRadius: '4px',
    maxWidth: '410px',
    position: 'absolute',
    top: '100%',
    zIndex: '1201',
  }),
  dpContent: () => ({
    display: 'flex',
  }),
  dpSidebar: () => ({
    p: '16px',
    borderRight: `1px solid #E6E6E6`,
  }),
  dpSidebarList: (theme: any) => ({
    p: 0,
    '& .MuiButtonBase-root.MuiListItemButton-root': {
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '1.5',
      color: '#4E4B66',
      height: '30px',
      p: '6px 12px 6px 19px',
      borderRadisu: '4px',
      mt: '6px',
      '&:hover': {
        bgcolor: theme.palette.primary.lighter,
      },
      '&:first-of-type': {
        mt: '0',
      },

      '&::before': {
        content: "''",
        width: '3px',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        bgcolor: 'transparent',
      },

      '&.Mui-selected': {
        bgcolor: theme.palette.primary.lighter,
        '&::before': {
          bgcolor: theme.palette.primary.main,
        },
      },
    },
  }),
  dpFooter: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid #E6E6E6`,
    p: '16px',
  }),
  dpFooterText: (theme: any) => ({
    fontSize: '12px',
    color: theme.palette.grey[900],
    pr: '16px',
  }),
  dpBody: (theme: any) => ({
    minWidth: '298px',
    flex: '1',
    p: '16px 16px 16px 10px',
    '& .react-datepicker__navigation': {
      height: '24px',
      width: '24px',
      top: '34px',
    },
    '& .react-datepicker__navigation--previous': {
      left: 'auto',
      right: '48px',
    },
    '& .react-datepicker__navigation--next': {
      right: '16px',
    },
    '& .react-datepicker__month-container': {
      float: 'none',
      position: 'relative',
    },

    '& .react-datepicker__header, .react-datepicker-year-header': {
      bgcolor: 'transparent',
      textAlign: 'left',
      p: '0',
      border: 'none',
      borderRadius: '0',
      mb: '12px',
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '1.5',
      color: theme.palette.grey[600],

      '& .react-datepicker__current-month': {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '1.5',
        color: theme.palette.grey[600],
        pl: '16px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
      },
      '& .react-datepicker__day-names': {
        display: 'flex',
        p: '0 10px',
        position: 'absolute',
        left: '0',
        top: '66px',

        '& .react-datepicker__day-name': {
          fontSize: '12px',
          fontWeight: '500',
          color: theme.palette.grey[600],
          lineHeight: '1.5',
          width: '36px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0',
        },
      },
    },

    '& .react-datepicker__month': {
      boxShadow: '0px 0px 12px 1px #00000012',
      p: '46px 10px 18px',
      m: '0',
      '& .react-datepicker__week': {
        display: 'flex',
        '& .react-datepicker__day': {
          width: '36px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: '400',
          color: theme.palette.grey[600],
          lineHeight: '1.5',
          m: '0',
          '&:hover': {
            bgcolor: 'primary.lighter',
          },
          '&.react-datepicker__day--in-selecting-range': {
            bgcolor: 'primary.lighter',
          },
          '&.react-datepicker__day--selected, &.react-datepicker__day--keyboard-selected, &.react-datepicker__day--in-range':
            {
              bgcolor: 'primary.main',
              color: '#fff',
            },
        },
      },
      '&.react-datepicker__monthPicker': {
        pt: '18px',

        '& .react-datepicker__month-wrapper': {
          display: 'flex',
          maxWidth: '273px',
          width: '100%',
          '&:not(:first-child):not(:last-child)': {
            py: '14px',
          },
          '& .react-datepicker__month-text': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '0 0 auto',
            width: '33.33333333%',
            height: '28px',
            fontSize: '12px',
            fontWeight: '400',
            margin: '0',
            '&:hover': {
              bgcolor: 'primary.lighter',
            },
            '&.react-datepicker__month-text--keyboard-selected': {
              bgcolor: 'primary.main',
              color: '#fff',
            },
          },
        },
      },
    },
    '& .react-datepicker__year': {
      boxShadow: '0px 0px 12px 1px #00000012',
      p: '18px 10px',
      m: '0',

      '& .react-datepicker__year-wrapper': {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '273px',

        '& .react-datepicker__year-text': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: '0 0 auto',
          width: '25%',
          height: '28px',
          fontSize: '12px',
          fontWeight: '400',
          margin: '0',
          '&:nth-child(n+5):not(:nth-last-of-type(-n+4))': {
            my: '42px',
          },
          '&:hover': {
            bgcolor: 'primary.lighter',
          },
          '&.react-datepicker__year-text--keyboard-selected, &.react-datepicker__year-text--selected':
            {
              bgcolor: 'primary.main',
              color: '#fff',
            },
        },
      },
    },
  }),
};
