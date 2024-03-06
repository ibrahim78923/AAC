export const styles = {
  rowBuyerInfo: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  buyerInfoTitle: (theme: any) => ({
    color: theme?.palette?.slateBlue?.main,
  }),
  btnAddMore: (theme: any) => ({
    color: theme.palette.custom.main,
    borderColor: theme?.palette?.custom?.dark,
    fontWeight: '500',
    '&:hover': {
      color: theme?.palette?.custom?.main,
      borderColor: theme?.palette?.custom?.dark,
    },
  }),
  buyerInfoPara: (theme: any) => ({
    color: theme?.palette?.custom?.grayish_blue,
    mt: '10px',
  }),
  contactsCont: () => ({
    mt: '24px',
  }),
  contactsHeading: (theme: any) => ({
    color: theme?.palette?.slateBlue?.main,
    fontWeight: '600',
  }),
  contactsList: () => ({
    listStyle: 'none',
    p: '0',
    m: '0',
  }),
  listItem: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[700]}`,
    color: theme?.palette?.slateBlue?.main,
    borderRadius: '8px',
    p: '16px',
    maxWidth: '352px',
    display: 'flex',
    mt: '16px',
  }),
  itemIcon: () => ({
    height: '32px',
    width: '32px',
    mr: '8px',
  }),
  itemAvatar: () => ({
    height: '32px',
    width: '32px',
  }),

  itemDetail: () => ({
    flex: '1',
  }),
  itemTitle: (theme: any) => ({
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.555556',
    color: theme?.palette?.slateBlue?.main,
    display: 'flex',
    justifyContent: 'space-between',
  }),
  itemText: (theme: any) => ({
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '1.5',
    color: theme?.palette?.custom?.main,
    '&:not(:first-of-type)': {
      marginTop: '8px',
    },
  }),
  button: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[700]}`,
    color: theme?.palette?.slateBlue?.main,
    borderRadius: '8px',
    height: '80px',
    width: '306px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    p: '24px',
  }),

  companyInformation: () => ({
    mt: '12px',
  }),
};
