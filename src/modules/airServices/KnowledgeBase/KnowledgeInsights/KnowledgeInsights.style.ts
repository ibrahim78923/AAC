export const styles = {
  insightsStyles: (theme: any) => ({
    background: theme?.palette?.grey[100],
    borderBottom: `0.0625rem solid ${theme?.palette?.divider}`,
    padding: '0.75rem 1rem',
  }),
  insightsItemsStyles: (theme: any) => ({
    borderBottom: `0.0625rem solid ${theme?.palette?.divider}`,
    padding: '1rem 1.25rem',
    cursor: 'pointer',
  }),
  mentionsStyles: (theme: any) => ({
    background: theme?.palette?.grey[100],
    borderBottom: `0.0625rem solid ${theme?.palette?.divider}`,
    borderLeft: `0.0625rem solid ${theme.palette.divider}`,
    padding: '0.75rem 1rem',
  }),
  mentionsItemsStyles: (theme: any) => ({
    borderBottom: `0.0625rem solid ${theme?.palette?.divider}`,
    borderLeft: `0.0625rem solid ${theme.palette.divider}`,
    padding: '1rem 1.25rem',
  }),
};
