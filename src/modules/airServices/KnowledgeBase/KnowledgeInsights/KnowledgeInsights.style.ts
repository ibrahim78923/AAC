export const styles = {
  insightsStyles: (theme: any) => ({
    background: theme?.palette?.grey[100],
    borderBottom: `0.0625rem solid ${theme?.palette?.light_lavender_gray}`,
    padding: '0.75rem 1rem',
  }),
  insightsItemsStyles: (theme: any) => ({
    borderBottom: `0.0625rem solid ${theme?.palette?.light_lavender_gray}`,
    padding: '1rem 1.25rem',
  }),
  mentionsStyles: (theme: any) => ({
    background: theme?.palette?.grey[100],
    borderBottom: `0.0625rem solid ${theme?.palette?.light_lavender_gray}`,
    borderLeft: `0.0625rem solid ${theme?.palette?.light_lavender_gray}`,
    padding: '0.75rem 1rem',
  }),
  mentionsItemsStyles: (theme: any) => ({
    borderBottom: `0.0625rem solid ${theme?.palette?.light_lavender_gray}`,
    borderLeft: `0.0625rem solid ${theme?.palette?.light_lavender_gray}`,
    padding: '1rem 1.25rem',
  }),
};
