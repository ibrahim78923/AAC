export const style = {
  cardDetails: (isSuccess: any) => ({
    padding: '10px 20px',
    bgcolor: '#1F305D',
    color: '#fff',
    borderRadius: '6px',
    opacity: isSuccess ? 1 : 0,
    transition: 'opacity  0.35s linear',
  }),
  skeleton: (theme: any) => ({
    bgcolor: theme?.palette?.grey?.[300],
    borderRadius: '6px',
  }),
};
