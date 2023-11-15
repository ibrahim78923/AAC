export const styles = (theme: any) => {
  return {
    userDetails: {
      borderBottom: '1px solid #EAECF0',
      padding: '9px 9px 9px 20px',
      '& .user_img': {
        objectFit: 'cover',
        borderRadius: '50px',
      },
      '& .user_name': {
        color: theme?.palette?.blue['dull_blue'],
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'capitalize',
      },
      '& .user_email, & .user_desc': {
        color: '#79839E',
        fontSize: '12px',
        fontWeight: 400,
      },
      '& .user_date': {
        fontSize: '12px',
        fontWeight: 600,
        color: theme?.palette?.blue['main'],
      },
    },
  };
};
