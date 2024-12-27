export const styles = {
  accordionSummary: (theme: any) => ({
    flexDirection: 'row-reverse',
    height: '88px',
    border: `1px solid ${theme?.palette?.grey[700]}`,
    borderRadius: '8px',
  }),
  accordionSummaryInner: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 20px',
  }),
  glowIcons: (theme: any) => ({
    backgroundColor: theme?.palette?.primary?.light,
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: `0px 0px 0px 7px ${theme?.palette?.graph?.published}`,
  }),
};
