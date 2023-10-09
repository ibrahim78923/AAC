import DeleteIcon from '@/assets/icons/shared/AlertModels/delete-icon';
import InfoIcon from '@/assets/icons/shared/AlertModels/info-icon';
import WarnIcon from '@/assets/icons/shared/AlertModels/warn-icon';

const DELETE_STRING: string = 'delete';
const INFO_STRING: string = 'info';
const SUCCESS_STRING: string = 'success';
const WARN_STRING: string = 'warn';

export const checkModelType = (type: string) =>
  type.toLowerCase() === DELETE_STRING
    ? DELETE_STRING
    : type.toLowerCase() === INFO_STRING
    ? 'Informatation'
    : type.toLowerCase() === SUCCESS_STRING
    ? 'Success'
    : type.toLowerCase() === WARN_STRING
    ? 'Warning'
    : null;

export const checkModelTypeForImage = (type: string) =>
  type.toLowerCase() === DELETE_STRING ? (
    <DeleteIcon />
  ) : type.toLowerCase() === INFO_STRING ? (
    <InfoIcon />
  ) : type.toLowerCase() === SUCCESS_STRING ? (
    'Success'
  ) : type.toLowerCase() === WARN_STRING ? (
    <WarnIcon />
  ) : null;

export const checkModelTypeMessage = (type: string) => {
  return type.toLowerCase() === DELETE_STRING
    ? 'Are you sure you want to delete this item ?'
    : type.toLowerCase() === INFO_STRING
    ? 'Information'
    : type.toLowerCase() === SUCCESS_STRING
    ? 'Success'
    : type.toLowerCase() === WARN_STRING
    ? 'Are you sure you want to revert all changes?'
    : '';
};
