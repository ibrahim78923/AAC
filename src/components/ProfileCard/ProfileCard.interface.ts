export default interface CardPropsI {
  src?: string;
  userName?: string;
  isBadge?: boolean;
  role?: string;
  email?: string;
  phone?: string;
  handleEditProfile?: () => void;
  handleEditImage?: () => void;
  editBtn?: boolean;
  isLoading?: boolean;
  handleChangeImg?: any;
  handleRequestAgent?: () => void;
}
