const TO_DO = 'To do';
const IN_PROGRESS = 'In-Progress';

export const styles: any = {
  detailDrawerTitel: (theme: any) => ({
    color: theme?.palette?.grey[600],
    fontWeight: 600,
  }),
  detailDrawerWorspace: (theme: any) => ({
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
  taskDetailStyle: (taskDetailStatus: any, theme: any) => ({
    position: 'absolute',
    top: 16,
    right: '4.5rem',
    border: `1px solid ${
      taskDetailStatus === TO_DO
        ? theme?.palette?.primary?.main
        : taskDetailStatus === IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : theme?.palette?.error?.dark
    }`,
    bgcolor:
      taskDetailStatus === TO_DO
        ? theme?.palette?.primary?.lighter
        : taskDetailStatus === IN_PROGRESS
        ? theme?.palette?.custom?.aqua_breeze
        : theme?.palette?.error?.lighter,
    color:
      taskDetailStatus === TO_DO
        ? theme?.palette?.primary?.main
        : taskDetailStatus === IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : theme?.palette?.error?.dark,
    padding: '0px 12px',
    height: 'fit-content',
    fontSize: '14px !important',
    fontWeight: 500,
  }),
  valStyle: (drawerStatusVal: any, theme: any) => ({
    position: 'absolute',
    top: 16,
    right: '4.5rem',
    border: `1px solid ${
      drawerStatusVal === TO_DO
        ? theme?.palette?.primary?.main
        : drawerStatusVal === IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : theme?.palette?.error?.dark
    }`,
    bgcolor:
      drawerStatusVal === TO_DO
        ? theme?.palette?.primary?.lighter
        : drawerStatusVal === IN_PROGRESS
        ? theme?.palette?.custom?.aqua_breeze
        : theme?.palette?.error?.lighter,
    color:
      drawerStatusVal === TO_DO
        ? theme?.palette?.primary?.main
        : drawerStatusVal === IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : theme?.palette?.error?.dark,
    padding: '0px 12px',
    height: 'fit-content',
    fontSize: '14px !important',
    fontWeight: 500,
  }),
  statusOptionStyle: (statusOption: any, theme: any) => ({
    border: `1px solid ${
      statusOption === TO_DO
        ? theme?.palette?.primary?.main
        : statusOption === IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : theme?.palette?.error?.dark
    }`,
    bgcolor:
      statusOption === TO_DO
        ? theme?.palette?.primary?.lighter
        : statusOption === IN_PROGRESS
        ? theme?.palette?.custom?.aqua_breeze
        : theme?.palette?.error?.lighter,
    color:
      statusOption === TO_DO
        ? theme?.palette?.primary?.main
        : statusOption === IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : theme?.palette?.error?.dark,
    width: 'fit-content',
    borderRadius: '4px',
    m: '10px',
    p: '2px 14px',
  }),
  tableStatusStyle: (statusValue: any, theme: any) => ({
    border: `1px solid ${
      statusValue === 'To do'
        ? theme?.palette?.primary?.main
        : statusValue === IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : theme?.palette?.error?.dark
    }`,
    backgroundColor:
      statusValue === 'To do'
        ? theme?.palette?.primary?.lighter
        : statusValue === 'In-Progress'
        ? theme?.palette?.custom?.aqua_breeze
        : theme?.palette?.error?.lighter,
    color:
      statusValue === 'To do'
        ? theme?.palette?.primary?.main
        : statusValue === IN_PROGRESS
        ? theme?.palette?.custom?.bright
        : theme?.palette?.error?.dark,
    padding: '8px 18px',
    borderRadius: '4px',
    fontWeight: 500,
  }),
};
