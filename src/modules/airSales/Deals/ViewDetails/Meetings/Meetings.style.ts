export const styles = {
  callStatusBox: (callsStatusColor: any, key: any) => {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      borderLeft: `6px solid ${callsStatusColor[key]}`,
      padding: '15px',
      boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
      borderRadius: '6px',
    };
  },

  callsGrid: (theme: any) => {
    return {
      boxShadow:
        '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
      borderRadius: '8px',
      border: ` 1px solid ${theme?.custom?.light_lavender_gray} `,
    };
  },
  callsSpacingBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: '12px',
    flexDirection: { xs: 'column', sm: 'row' },
  },
  noCallsBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1.5,
    height: '24vh',
    paddingTop: '15px',
  },
};
