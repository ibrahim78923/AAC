const TO_DO = 'To do';
const IN_PROGRESS = 'In-Progress';

export const styles: any = {
  tableStatusStyle: (statusValue: any, theme: any) => ({
    border: `1px solid ${
      statusValue === TO_DO
        ? theme.palette.primary.main
        : statusValue === IN_PROGRESS
        ? theme.palette.custom.bright
        : theme.palette.error.main
    }`,
    backgroundColor:
      statusValue === TO_DO
        ? theme.palette.primary.lighter
        : statusValue === IN_PROGRESS
        ? '#E6F7F9'
        : '#FFEDED',
    color:
      statusValue === TO_DO
        ? theme.palette.primary.main
        : statusValue === IN_PROGRESS
        ? theme.palette.custom.bright
        : theme.palette.error.main,
    padding: '8px 18px',
    borderRadius: '4px',
    fontWeight: 500,
    width: 'fit-content',
  }),
};
