export default interface cardProps {
  src?: string;
  userName?: string;
  isBadge?: boolean;
  role?: string;
  email?: string;
  phone?: string;
  handleEditProfile?: () => void;
  handleEditImage?: () => void;
  editBtn?: boolean;
}
