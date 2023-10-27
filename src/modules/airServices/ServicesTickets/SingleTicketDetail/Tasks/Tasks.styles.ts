const TO_DO = 'To do';
const IN_PROGRESS = 'In-Progress';

export const styles: any = {
  tableStatusStyle: (statusValue: any, theme: any) => ({
    border: `1px solid ${
      statusValue === TO_DO
        ? theme?.palette?.primary?.main
        : statusValue === IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : theme?.palette?.error?.dark
    }`,
    backgroundColor:
      statusValue === TO_DO
        ? theme?.palette?.primary?.lighter
        : statusValue === IN_PROGRESS
        ? theme?.palette?.custom?.aqua_breeze
        : theme?.palette?.error?.lighter,
    color:
      statusValue === TO_DO
        ? theme?.palette?.primary?.main
        : statusValue === IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : theme?.palette?.error?.dark,
    padding: '8px 18px',
    borderRadius: '4px',
    fontWeight: 500,
    width: 'fit-content',
  }),
};
