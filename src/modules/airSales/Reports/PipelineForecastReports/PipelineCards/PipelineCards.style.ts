export const styles = {
  pipelineCards: (theme: any) => {
    return {
      '.cards': {
        padding: '32px 24px',
        borderRadius: '12px',
        cursor: 'pointer',
        border: `1px solid ${theme?.palette?.grey[700]}`,
        '&.active , &:hover': {
          boxShadow: `0px 0px 5px 3px ${theme?.palette?.grey[700]}`,
        },
      },
    };
  },
};
