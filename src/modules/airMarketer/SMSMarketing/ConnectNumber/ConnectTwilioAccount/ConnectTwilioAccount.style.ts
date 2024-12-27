export const styles = {
  centered: () => ({
    margin: '0 auto',
    width: '50vw',
    '@media (max-width: 1000px)': {
      width: '100%',
    },
  }),
  connectivityBox: () => ({
    background:
      'linear-gradient(90deg, rgba(237,244,254,1) 0%, rgb(249 249 249) 100%)',
    width: '18vw',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    paddingLeft: '20px',
    '@media (max-width: 1000px)': {
      width: '100%',
    },
  }),
  configurationBox: (theme: any) => ({
    border: `1px solid ${theme?.palette?.custom?.hex_grey}`,
    borderRadius: '10px',
    padding: '20px',
    width: '100%',
  }),
  flexRow: (theme: any) => ({
    width: '100%',
    border: `1px solid transparent`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '12px',
    padding: '10px 30px',
    transition: '0.3s',
    mb: 1,
    '&:hover': {
      border: `1px solid ${theme?.palette?.primary?.main}`,
      boxShadow: `0px 0px 4px 0px ${theme?.palette?.primary?.main}`,
      cursor: 'pointer',
    },
  }),
};
