export const style = {
  dropdownItems: {
    width: '300px',
  },

  dropdownBox: {
    width: '450px',
    height: 'auto',
    '@media screen and (max-width: 530px)': {
      width: '290px',
    },
  },

  searchField: {
    width: '450px',
    '@media screen and (max-width: 530px)': {
      width: '290px',
    },
  },

  buttonBox: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '16px',
  },

  divider: {
    height: '1px',
    backgroundColor: '#E5E7EB',
    marginTop: '24px',
  },
};
