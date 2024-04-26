export const styles = {
  mainDiv: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[700]}`,
    boxShadow: `0px 1px 2px 0px ${theme?.palette?.custom?.lighter_navy_blue}`,
    padding: '15px',
    borderRadius: '8px',
    marginTop: '25px',
  }),
  innerBox: (item: any, theme: any) => ({
    borderLeft: `5px solid ${item?.color}`,
    padding: '10px',
    margin: '10px',
    boxShadow: `inset 0px 1px 8px 0px ${theme?.palette?.custom?.greenish_blue}`,
    borderRadius: '4px',
    width: '160px',
  }),
};
