import { TASK_STATUS } from '@/constants/strings';
const { DONE, IN_PROGRESS, TO_DO } = TASK_STATUS;
export const styles: any = {
  tableStatusStyle: (statusValue: any, theme: any) => ({
    border: `1px solid ${
      statusValue === TO_DO
        ? theme?.palette?.primary?.main
        : statusValue === IN_PROGRESS
          ? theme?.palette?.custom?.bright
          : statusValue === DONE
            ? theme?.palette?.error?.dark
            : null
    }`,
    backgroundColor:
      statusValue === TO_DO
        ? theme?.palette?.primary?.lighter
        : statusValue === IN_PROGRESS
          ? theme?.palette?.custom?.aqua_breeze
          : statusValue === DONE
            ? theme?.palette?.error?.lighter + 40
            : null,
    color:
      statusValue === TO_DO
        ? theme?.palette?.primary?.main
        : statusValue === IN_PROGRESS
          ? theme?.palette?.custom?.bright
          : statusValue === DONE
            ? theme?.palette?.error?.dark
            : null,
    padding: '4px 18px',
    borderRadius: '4px',
    fontWeight: 500,
    width: 'fit-content',
  }),
};
