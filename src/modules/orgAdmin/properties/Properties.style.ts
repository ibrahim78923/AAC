export const styles = {
  productIconColor: (theme: any) => ({
    padding: 3,
    cursor: 'pointer',
    '&.active': {
      boxShadow: `0px 0px 7px 5px ${theme?.palette?.grey[700]}`,
    },
  }),
};
