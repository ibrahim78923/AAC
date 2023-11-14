export const styles = (theme: any, disableActionBtn: any) => ({
  '&.outlined_btn': {
    color: disableActionBtn ? theme?.palette?.custom?.dark : '',
    borderColor: disableActionBtn ? theme?.palette?.custom?.dark : '',
  },
});
