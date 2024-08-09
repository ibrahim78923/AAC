export interface IsPortalOpen {
  isDelete: boolean;
  portalId: string;
}

export interface DeleteLocationsProps {
  isPortalOpen: IsPortalOpen;
}

export interface UseDeleteLocationsReturnI {
  deleteMeetingsLocation: () => void;
  closeDeleteModal: () => void;
  deleteCommonMeetingsLocationsStatus: any;
}
