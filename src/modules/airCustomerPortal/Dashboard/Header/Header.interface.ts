export interface HeaderI {
  openReportAnIssueModal?: boolean;
  setOpenReportAnIssueModal: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  anchorEl: HTMLElement | null;
  handleButtonClick: any;
  handleClose: () => void;
  push: any;
}
