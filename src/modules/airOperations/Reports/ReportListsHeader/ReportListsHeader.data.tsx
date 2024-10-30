import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { RenameReport } from '../RenameReport';
import { CloneReport } from '../CloneReport';
import { EmailReport } from '../EmailReport';
import { ChangeReportOwner } from '../ChangeReportOwner';
import { AddToDashboardReport } from '../AddToDashboardReport';
import { DeleteReport } from '../DeleteReport';
import { ManageReportAccess } from '../ManageReportAccess';
import { FilterReport } from '../FilterReport';
import { ExportReport } from '../ExportReport';

export const REPORT_LISTS_ACTION_CONSTANTS = {
  FILTER_REPORT: 'filter-report',
  RENAME_REPORT: 'rename-report',
  CLONE_REPORT: 'clone-report',
  EXPORT_REPORT: 'export-report',
  EMAIL_REPORT: 'email-report',
  CHANGE_REPORT_OWNER: 'change-report-owner',
  ADD_REPORT_TO_DASHBOARD: 'add-report-to-dashboard',
  DELETE_REPORT: 'delete-report',
  MANAGE_REPORT_ACCESS: 'manage-report-access',
};

const {
  FILTER_REPORT,
  RENAME_REPORT,
  CLONE_REPORT,
  EXPORT_REPORT,
  EMAIL_REPORT,
  CHANGE_REPORT_OWNER,
  ADD_REPORT_TO_DASHBOARD,
  DELETE_REPORT,
  MANAGE_REPORT_ACCESS,
} = REPORT_LISTS_ACTION_CONSTANTS;

export const reportListsActionComponent = {
  [FILTER_REPORT]: <FilterReport />,
  [RENAME_REPORT]: <RenameReport />,
  [CLONE_REPORT]: <CloneReport />,
  [EXPORT_REPORT]: <ExportReport />,
  [EMAIL_REPORT]: <EmailReport />,
  [CHANGE_REPORT_OWNER]: <ChangeReportOwner />,
  [ADD_REPORT_TO_DASHBOARD]: <AddToDashboardReport />,
  [DELETE_REPORT]: <DeleteReport />,
  [MANAGE_REPORT_ACCESS]: <ManageReportAccess />,
};

export const reportListsActionDropdownDynamic = (
  setReportsListAction: any,
  selectedReportList: any,
  editReportPath?: (reportId: string) => void,
  permission?: any,
) => [
  {
    id: 1,
    title: 'Customize',
    permissionKey: [permission?.CUSTOMIZE],
    disabled: selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      editReportPath?.(selectedReportList[ARRAY_INDEX?.ZERO]?._id);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Rename',
    permissionKey: [permission?.RENAME],
    disabled: selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setReportsListAction?.(RENAME_REPORT);
      closeMenu();
    },
  },
  {
    id: 3,
    title: 'Clone',
    permissionKey: [permission?.CLONE],
    disabled: selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setReportsListAction?.(CLONE_REPORT);
      closeMenu();
    },
  },
  {
    id: 4,
    title: 'Export',
    permissionKey: [permission?.EXPORT_RECORD],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setReportsListAction?.(EXPORT_REPORT);
      closeMenu();
    },
  },
  {
    id: 5,
    title: 'Email This Report',
    permissionKey: [permission?.EMAIL_THIS_REPORT],
    disabled: selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setReportsListAction?.(EMAIL_REPORT);
      closeMenu();
    },
  },
  {
    id: 6,
    title: 'Change Owner',
    permissionKey: [permission?.CHANGE_OWNER],
    disabled: selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setReportsListAction?.(CHANGE_REPORT_OWNER);
      closeMenu();
    },
  },
  {
    id: 7,
    title: 'Add to Dashboard',
    permissionKey: [permission?.ADD_TO_DASHBOARD],
    disabled: selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setReportsListAction?.(ADD_REPORT_TO_DASHBOARD);
      closeMenu();
    },
  },
  {
    id: 8,
    title: 'Delete',
    permissionKey: [permission?.DELETE],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setReportsListAction?.(DELETE_REPORT);
      closeMenu();
    },
  },
  {
    id: 9,
    title: 'Manage Access',
    permissionKey: [permission?.MANAGE_ACCESS],
    disabled: selectedReportList?.length > SELECTED_ARRAY_LENGTH?.ONE,
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setReportsListAction?.(MANAGE_REPORT_ACCESS);
      closeMenu();
    },
  },
];
