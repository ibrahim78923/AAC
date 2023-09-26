export interface CommonDrawerPropsI {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  okText: string;
  isOk: boolean;
  submitHandler: () => void;
}
