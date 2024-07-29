export interface LeftPanePropsI {
  isOpenSendEmailDrawer: boolean;
  setIsOpenSendEmailDrawer: (isOpen: boolean) => void;
  mailType: string;
  setMailType: (type: string) => void;
}
