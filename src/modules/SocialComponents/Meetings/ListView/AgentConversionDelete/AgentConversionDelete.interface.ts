export interface DeleteMeetingsStatus {
  isLoading: boolean;
}

export interface DeleteListViewI {
  open: boolean;
  handleClose: () => void;
  message: string;
  submitDeleteModal: () => void;
  deleteMeetingsStatus: DeleteMeetingsStatus;
}
