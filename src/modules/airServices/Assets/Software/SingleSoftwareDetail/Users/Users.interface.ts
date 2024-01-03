export interface UserActionI {
  title: string;
  handleClick: (closeMenu?: () => void) => any;
}
