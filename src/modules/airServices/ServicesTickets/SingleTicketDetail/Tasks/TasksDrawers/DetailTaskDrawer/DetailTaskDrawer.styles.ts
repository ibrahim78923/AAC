import { TASK_STATUS } from '@/constants/strings';
export const styles: any = {
  detailDrawerTitle: (theme: any) => ({
    color: theme?.palette?.grey[600],
    fontWeight: 600,
  }),
  detailDrawerWorkspace: (theme: any) => ({
    bgcolor: theme?.palette?.blue?.main,
    color: theme?.palette?.common?.white,
    borderRadius: '5px',
    padding: '2px 8px',
    marginRight: '8px',
  }),
  detailDrawerImg: {
    height: '16px',
    width: '16px',
    marginRight: '8px',
  },
  detailDrawerGridCenter: { display: 'flex', alignItems: 'center' },
  statusFieldStyle: {
    position: 'absolute',
    top: 26,
    right: '4.5rem',
    width: '35%',
    '& .MuiInputBase-input': {
      p: '0 0 0 8px !important',
    },
  },
  tableStatusStyle: (statusValue: any, theme: any) => ({
    border: `1px solid ${
      statusValue === TASK_STATUS?.TO_DO
        ? theme?.palette?.primary?.main
        : statusValue === TASK_STATUS?.IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : statusValue === TASK_STATUS?.DONE
        ? theme?.palette?.error?.dark
        : null
    }`,
    backgroundColor:
      statusValue === TASK_STATUS?.TO_DO
        ? theme?.palette?.primary?.lighter
        : statusValue === TASK_STATUS?.IN_PROGRESS
        ? theme?.palette?.custom?.aqua_breeze
        : statusValue === TASK_STATUS?.DONE
        ? theme?.palette?.error?.lighter + 40
        : null,
    color:
      statusValue === TASK_STATUS?.TO_DO
        ? theme?.palette?.primary?.main
        : statusValue === TASK_STATUS?.IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : statusValue === TASK_STATUS?.DONE
        ? theme?.palette?.error?.dark
        : null,
    padding: '2px 14px',
    borderRadius: '4px',
    fontWeight: 500,
  }),
};
