import DeleteIcon from '@/assets/icons/shared/AlertModels/delete-icon';
import InfoIcon from '@/assets/icons/shared/AlertModels/info-icon';
import WarnIcon from '@/assets/icons/shared/AlertModels/warn-icon';

const DELETE_STRING: string = 'delete';
const INFO_STRING: string = 'information';
const SUCCESS_STRING: string = 'success';
const WARN_STRING: string = 'warning';

export const checkModalTypeForImage = (type: string) =>
  type.toLowerCase() === DELETE_STRING ? (
    <DeleteIcon />
  ) : type.toLowerCase() === INFO_STRING ? (
    <InfoIcon />
  ) : type.toLowerCase() === SUCCESS_STRING ? (
    'Success'
  ) : type.toLowerCase() === WARN_STRING ? (
    <WarnIcon />
  ) : null;
