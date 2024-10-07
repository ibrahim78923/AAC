import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import { RestoreReport } from '../RestoreReport';
import { DeleteReportPermanently } from '../DeleteReportPermanently';
import { RestoreReportsFilter } from '../RestoreReportsFilter';

export const RESTORE_REPORT_LISTS_ACTION_CONSTANTS = {
  FILTER_RESTORE_REPORT: 'filter-restore-report',
  RESTORE_RESTORE_REPORT: 'restore-restore-report',
  DELETE_RESTORE_REPORT: 'delete-restore-report',
};

const { RESTORE_RESTORE_REPORT, DELETE_RESTORE_REPORT, FILTER_RESTORE_REPORT } =
  RESTORE_REPORT_LISTS_ACTION_CONSTANTS;

export const restoreReportListsActionComponent = {
  [FILTER_RESTORE_REPORT]: <RestoreReportsFilter />,
  [RESTORE_RESTORE_REPORT]: <RestoreReport />,
  [DELETE_RESTORE_REPORT]: <DeleteReportPermanently />,
};

export const actionsDropdownForRestoreReportListsDynamic = (
  setRestoreReportsListAction: any,
) => [
  {
    id: 1,
    title: 'Restore',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setRestoreReportsListAction(RESTORE_RESTORE_REPORT);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Delete',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setRestoreReportsListAction(DELETE_RESTORE_REPORT);
      closeMenu();
    },
  },
];
