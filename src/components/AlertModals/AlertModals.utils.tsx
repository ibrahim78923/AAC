import DeleteIcon from '@/assets/icons/shared/AlertModels/delete-icon';
import InfoIcon from '@/assets/icons/shared/AlertModels/info-icon';
import WarnIcon from '@/assets/icons/shared/AlertModels/warn-icon';

export const checkModelType = (type: string) =>
  type.toLowerCase() === 'delete'
    ? 'delete'
    : type.toLowerCase() === 'info'
    ? 'Informatation'
    : type.toLowerCase() === 'success'
    ? 'Success'
    : type.toLowerCase() === 'warn'
    ? 'Warning'
    : null;

export const checkModelTypeForImage = (type: string) =>
  type.toLowerCase() === 'delete' ? (
    <DeleteIcon />
  ) : type.toLowerCase() === 'info' ? (
    <InfoIcon />
  ) : type.toLowerCase() === 'success' ? (
    'Success'
  ) : type.toLowerCase() === 'warn' ? (
    <WarnIcon />
  ) : null;

export const checkModelTypeMessage = (type: string) => {
  return type.toLowerCase() === 'delete'
    ? 'Are you sure you want to delete this item ?'
    : type.toLowerCase() === 'info'
    ? 'Information'
    : type.toLowerCase() === 'success'
    ? 'Success'
    : type.toLowerCase() === 'warn'
    ? 'Are you sure you want to revert all changes?'
    : '';
};
